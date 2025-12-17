import { BaseFieldBuilder } from '@/builders/base'
import { FormGeneratorSchema } from '@/resources/types/generic'
import { type Ref, ref } from 'vue'
import { NoValueError } from '@/exceptions'

/**
 * Type representing the model of a schema.
 */
export type SchemaModel<
  S extends Record<string, BaseFieldBuilder<any, any>>
> = {
  [K in keyof S]: ReturnType<S[K]['getDefaultValue']>
}

/**
 * Type representing the `field` type of a built schema.
 */
export type BuiltSchemaField<
  S extends Record<string, BaseFieldBuilder<any, any>>
> =
  S[keyof S] extends BaseFieldBuilder<infer F, any>
    ? F
    : never


/**
 * Form schema builder
 * @param schema - An object containing field builders. The key of the object is the model key of the field,
 *  the value is the field builder instance.
 */
export class SchemaBuilder <
  S extends Record<string, BaseFieldBuilder<any, any>>
> {
  protected model: SchemaModel<S> = {} as SchemaModel<S>
  protected fields: BaseFieldBuilder<any, any>[] = []

  constructor(schema: S, defaults?: Partial<SchemaModel<S>>) {
    this.initialize(schema, defaults)
  }

  /**
   * Initialize the model and associated fields.
   * @param schema - Schema object of field builders.
   * @param defaults - Default values for the fields.
   * @private
   */
  private initialize (schema: S, defaults?: Partial<SchemaModel<S>>): void {
    for (const [ modelKey, field ] of Object.entries(schema) ) {
      try {
        this.initializeField(modelKey as keyof S, field, defaults)
      } catch (e) {
        if (typeof field.getDefaultValue !== 'function') {
          throw new Error(`Error initializing field ${modelKey}: Field might not be a field builder instance.`)
        }
        throw new Error(`Error initializing field ${modelKey}: ${e}`)
      }
    }
  }

  /**
   * Initialize a single field.
   * @param modelKey - Key for the model.
   * @param field - Field builder instance associated with the key.
   * @param defaults - Default values for fields.
   * @private
   */
  private initializeField (
    modelKey: keyof S,
    field: BaseFieldBuilder<any, any>,
    defaults?: Partial<SchemaModel<S>>
  ): void {
    try {
      this.model[modelKey] = field.getDefaultValue()
      const addField = field.model(modelKey as string)
      if (defaults?.[modelKey]) {
        addField.default(defaults[modelKey])
      }
      this.addField(addField)
    } catch (e) {
      // Thrown whenever a field builder does not emit values, such as with FieldButton.
      if (e instanceof NoValueError) {
        this.addField(field)
      } else {
        throw e
      }
    }
  }

  /**
   * Get an array of all fields.
   * @returns An array of fields.
   */
  getFields (): BaseFieldBuilder<any, any>[] {
    return this.fields
  }

  /**
   * Add a field to the schema.
   * @param field - Field builder instance of the field that needs to be added.
   */
  private addField <F extends BaseFieldBuilder<any, any>> (field: F): SchemaBuilder<S> {
    this.fields.push(field)
    return this
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
    return {
      model: this.model,
      schema: {
        fields: this.fields?.map(field => field.build()) ?? undefined
      }
    }
  }

}