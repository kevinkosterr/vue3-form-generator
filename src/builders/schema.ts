import { type Ref, ref } from 'vue'
import { AbstractBaseBuilder } from '@/builders/base'
import GroupBuilder from '@/builders/group'
import { BuilderError } from '@/exceptions'
import type { FormGeneratorSchema } from '@/resources/types/generic'
import type { FormModel } from '@/resources/types/fieldAttributes'

type AnyBuilder = AbstractBaseBuilder<any, any, any>

/**
 * Object of field builders, keyed by the model key of each field.
 */
export type SchemaEntries = Record<string, AnyBuilder>

/**
 * Type representing the model of a schema.
 * Fields that don't emit values (e.g. buttons) are left out.
 */
export type SchemaModel<S extends SchemaEntries> = {
  [K in keyof S as [ S[K]['~value'] ] extends [ never ] ? never : K]: S[K]['~value']
}

/**
 * Type representing the `field` type of a built schema.
 */
export type BuiltSchemaField<S extends SchemaEntries> = FieldOf<S[keyof S]>

/** Distributes over a union of builders, so every builder contributes its own field type. */
type FieldOf<B> = B extends AbstractBaseBuilder<infer F, any, any> ? F : never

/**
 * The model type of a schema builder.
 * @example
 *  const schema = f.schema({ name: f.text(), age: f.number() })
 *  type Model = InferModel<typeof schema> // { name: string, age: number }
 */
export type InferModel<T> = T extends SchemaBuilder<infer S, any> ? SchemaModel<S> : never

/**
 * The field type of a schema builder, a union of all fields inside the schema.
 */
export type InferField<T> = T extends SchemaBuilder<infer S, any> ? BuiltSchemaField<S> : never

type Compatible<A, B> = [ A ] extends [ B ] ? true : [ B ] extends [ A ] ? true : false

/**
 * Checks every entry of a schema against the model type `M`. Entries that don't fit are replaced with an
 * error message type, so TypeScript reports a readable error on the offending key.
 * Fields that don't emit values (e.g. buttons) are always allowed.
 */
export type ValidateEntries<S extends SchemaEntries, M> = {
  [K in keyof S]: [ S[K]['~value'] ] extends [ never ]
    ? S[K]
    : K extends keyof M
      ? Compatible<S[K]['~value'], M[K]> extends true
        ? S[K]
        : `Error: the value of field "${K & string}" does not match the model type.`
      : `Error: "${K & string}" is not a key of the model.`
}

/**
 * Form schema builder.
 * @param schema - An object containing field builders. The key of the object is the model key of the field,
 *  the value is the field builder instance.
 * @param defaults - Default values for the fields, overrides the defaults set on the field builders.
 */
export class SchemaBuilder<S extends SchemaEntries, M extends object = FormModel> {
  protected model: Record<string, unknown> = {}
  protected fields: Map<string, AnyBuilder>
  protected groups: GroupBuilder[] = []
  private keys: Set<string> = new Set()

  constructor (schema: S & ValidateEntries<S, M>, defaults?: Partial<SchemaModel<S>>) {
    this.fields = this.initialize(schema, defaults)
  }

  /**
   * Initialize the model and bind the fields to their keys.
   * @param schema - Schema object of field builders.
   * @param defaults - Default values for the fields.
   * @returns Copies of the field builders, bound to their keys.
   */
  private initialize (schema: SchemaEntries, defaults?: Record<string, unknown>): Map<string, AnyBuilder> {
    const fields = new Map<string, AnyBuilder>()
    for (const [ key, field ] of Object.entries(schema)) {
      if (!(field instanceof AbstractBaseBuilder)) {
        throw new BuilderError('Value is not a field builder instance.', key)
      }
      if (this.keys.has(key)) {
        throw new BuilderError('Duplicate key, keys must be unique across the schema and its groups.', key)
      }
      try {
        const bound = field.bindTo(key, defaults?.[key])
        if (bound.emitsValue) this.model[key] = bound.getDefaultValue()
        fields.set(key, bound)
        this.keys.add(key)
      } catch (e) {
        throw BuilderError.wrap(e, key)
      }
    }
    return fields
  }

  /**
   * Get an array of all fields, excluding fields inside groups.
   * @returns An array of fields.
   */
  getFields (): AnyBuilder[] {
    return [ ...this.fields.values() ]
  }

  /**
   * Get an array of all groups.
   * @returns An array of groups.
   */
  getGroups (): GroupBuilder[] {
    return this.groups
  }

  /**
   * Get a copy of the model containing the initial values of all fields, including fields inside groups.
   */
  getModel (): SchemaModel<S> {
    return structuredClone(this.model) as SchemaModel<S>
  }

  /**
   * Add a group of fields to the schema. Fields inside the group share the model with the rest of the schema,
   * so their keys must be unique across the entire schema.
   *
   * @example
   *  f.schema({
   *    name: f.text()
   *  }).group('Address', {
   *    street: f.text(),
   *    city: f.text()
   *  })
   */
  group<G extends SchemaEntries> (
    schema: G & ValidateEntries<G, M>,
    defaults?: Partial<SchemaModel<G>>
  ): SchemaBuilder<S & G, M>
  group<G extends SchemaEntries> (
    legend: string,
    schema: G & ValidateEntries<G, M>,
    defaults?: Partial<SchemaModel<G>>
  ): SchemaBuilder<S & G, M>
  group (
    legendOrSchema: string | SchemaEntries,
    schemaOrDefaults?: SchemaEntries | Record<string, unknown>,
    defaults?: Record<string, unknown>
  ): SchemaBuilder<SchemaEntries, M> {
    if (typeof legendOrSchema === 'string') {
      this.groups.push(new GroupBuilder(this.initialize(schemaOrDefaults as SchemaEntries, defaults), legendOrSchema))
    } else {
      this.groups.push(new GroupBuilder(this.initialize(legendOrSchema, schemaOrDefaults)))
    }
    return this as unknown as SchemaBuilder<SchemaEntries, M>
  }

  /**
   * Build the schema and return as a Ref.
   * @returns Built JSON schema wrapped in a Ref.
   */
  toRef (): Ref<FormGeneratorSchema<SchemaModel<S>, BuiltSchemaField<S>>> {
    return ref(this.build()) as Ref<FormGeneratorSchema<SchemaModel<S>, BuiltSchemaField<S>>>
  }

  /**
   * Build the schema. Converts all builders to JSON.
   * Every call returns a new object, including a fresh copy of the model.
   * @returns A JSON object representing the schema.
   */
  build (): FormGeneratorSchema<SchemaModel<S>, BuiltSchemaField<S>> {
    const schema: FormGeneratorSchema<SchemaModel<S>, BuiltSchemaField<S>>['schema'] = {
      fields: [ ...this.fields ].map(([ key, field ]) => {
        try {
          return field.build()
        } catch (e) {
          throw BuilderError.wrap(e, key)
        }
      })
    }
    if (this.groups.length) {
      schema.groups = this.groups.map(group => group.build())
    }
    return { model: this.getModel(), schema }
  }

}
