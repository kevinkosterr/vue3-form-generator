import { AbstractBaseBuilder } from '@/builders/base'
import { FormGeneratorSchema } from '@/resources/types/generic'
import { type Ref, ref } from 'vue'
import { NoValueError } from '@/exceptions'
import GroupBuilder from '@/builders/group'

/**
 * Object of field builders, keyed by the model key of each field.
 */
export type SchemaEntries = Record<string, AbstractBaseBuilder<any, any>>

/**
 * Type representing the model of a schema.
 * Fields that don't emit values (e.g. buttons) are left out.
 */
export type SchemaModel<
  S extends SchemaEntries
> = {
  [K in keyof S as [ S[K]['__default__'] ] extends [ never ] ? never : K]: S[K]['__default__']
}

/**
 * Type representing the `field` type of a built schema.
 */
export type BuiltSchemaField<
  S extends SchemaEntries
> =
  S[keyof S] extends AbstractBaseBuilder<infer F, any>
    ? F
    : never

/**
 * Form schema builder
 * @param schema - An object containing field builders. The key of the object is the model key of the field,
 *  the value is the field builder instance.
 * @param defaults - Default values for the fields, overrides the defaults set on the field builders.
 */
export class SchemaBuilder <
  S extends SchemaEntries
> {
  protected model: SchemaModel<S> = {} as SchemaModel<S>
  protected fields: AbstractBaseBuilder<any, any>[] = []
  protected groups: GroupBuilder[] = []
  private keys: Set<string> = new Set()

  constructor(schema: S, defaults?: Partial<SchemaModel<S>>) {
    this.fields = this.initialize(schema, defaults)
  }

  /**
   * Initialize the model and associated fields.
   * @param schema - Schema object of field builders.
   * @param defaults - Default values for the fields.
   * @returns The initialized field builders.
   * @private
   */
  private initialize (schema: SchemaEntries, defaults?: Record<string, any>): AbstractBaseBuilder<any, any>[] {
    const fields: AbstractBaseBuilder<any, any>[] = []
    for (const [ modelKey, field ] of Object.entries(schema) ) {
      if (typeof field?.getDefaultValue !== 'function') {
        throw new Error(`Error initializing field ${modelKey}: Field might not be a field builder instance.`)
      }
      try {
        fields.push(this.initializeField(modelKey, field, defaults))
      } catch (e) {
        throw new Error(`Error initializing field ${modelKey}: ${e instanceof Error ? e.message : e}`)
      }
    }
    return fields
  }

  /**
   * Initialize a single field.
   * @param modelKey - Key for the model.
   * @param field - Field builder instance associated with the key.
   * @param defaults - Default values for fields.
   * @returns The initialized field builder.
   * @private
   */
  private initializeField (
    modelKey: string,
    field: AbstractBaseBuilder<any, any>,
    defaults?: Record<string, any>
  ): AbstractBaseBuilder<any, any> {
    if (this.keys.has(modelKey)) {
      throw new Error(`Duplicate key "${modelKey}".`)
    }
    this.keys.add(modelKey)

    if (defaults?.[modelKey] !== undefined) {
      field.default(defaults[modelKey])
    }

    try {
      (this.model as Record<string, any>)[modelKey] = field.getDefaultValue()
    } catch (e) {
      // Thrown whenever a field builder does not emit values, such as with FieldButton.
      if (e instanceof NoValueError) return field
      throw e
    }
    return field.model(modelKey)
  }

  /**
   * Get an array of all fields, excluding fields inside groups.
   * @returns An array of fields.
   */
  getFields (): AbstractBaseBuilder<any, any>[] {
    return this.fields
  }

  /**
   * Get an array of all groups.
   * @returns An array of groups.
   */
  getGroups (): GroupBuilder[] {
    return this.groups
  }

  /**
   * Get the model containing the initial values of all fields, including fields inside groups.
   */
  getModel (): SchemaModel<S> {
    return this.model
  }

  /**
   * Add a group of fields to the schema. Fields inside the group share the model with the rest of the schema,
   * so their keys must be unique across the entire schema.
   *
   * @example
   *  f.schema({
   *    name: f.text('Name')
   *  }).group('Address', {
   *    street: f.text('Street'),
   *    city: f.text('City')
   *  })
   * @param legend - Legend of the group.
   * @param schema - An object containing field builders, like the schema itself.
   * @param defaults - Default values for the fields in this group.
   */
  group <G extends SchemaEntries> (
    legend: string | undefined,
    schema: G,
    defaults?: Partial<SchemaModel<G>>
  ): SchemaBuilder<S & G> {
    this.groups.push(new GroupBuilder(this.initialize(schema, defaults), legend))
    return this as unknown as SchemaBuilder<S & G>
  }

  /**
   * Build the schema and return as a Ref.
   * @returns Built JSON schema wrapped in a Ref.
   */
  toRef (): Ref<
    FormGeneratorSchema<SchemaModel<S>, BuiltSchemaField<S>>
  > {
    return ref(this.build()) as Ref<FormGeneratorSchema<SchemaModel<S>, BuiltSchemaField<S>>>
  }

  /**
   * Build the schema. Converts all builders to JSON.
   * @returns A JSON object representing the schema.
   */
  build (): FormGeneratorSchema<
    SchemaModel<S>,
    BuiltSchemaField<S>
  > {
    const schema: FormGeneratorSchema<SchemaModel<S>, BuiltSchemaField<S>>['schema'] = {
      fields: this.fields.map(field => field.build())
    }
    if (this.groups.length) {
      schema.groups = this.groups.map(group => group.build())
    }
    return { model: this.model, schema }
  }

}
