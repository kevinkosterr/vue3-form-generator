import { BaseFieldBuilder } from '@/builders/base'
import { FormGeneratorSchema } from '@/resources/types/generic'
import { type Ref, ref } from 'vue'

/**
 * Form schema builder
 * @param schema - An object containing field builders. The key of the object is the model key of the field, the value is the field builder instance.
 */
export class SchemaBuilder <S extends Record<string, BaseFieldBuilder<any>>> {
  protected model: Record<string, any> = {}
  protected fields: BaseFieldBuilder<any>[] = []

  constructor(schema: S, defaults?: Partial<Record<keyof S, unknown>>) {
    for (const [ modelKey, field ] of Object.entries(schema) ) {
      try {
        this.model[modelKey] = field.getInitialValue()
        const addField = field.model(modelKey)
        if (defaults && defaults[modelKey]) {
          addField.default(defaults[modelKey])
        }
        this.field(addField)
      } catch (e) {
        if (typeof field.getInitialValue !== 'function') {
          throw new Error(`Error initializing field ${modelKey}: Field might not be a field builder instance.`)
        }
        throw new Error(`Error initializing field ${modelKey}: ${e}`)
      }
    }
  }

  /**
   * Get an array of all fields.
   * @returns An array of fields.
   */
  getFields (): BaseFieldBuilder<any>[] {
    return this.fields
  }

  /**
   * Add a field to the schema.
   * @param field - Field builder instance of the field that needs to be added.
   */
  field (field: BaseFieldBuilder<any>): SchemaBuilder<S> {
    this.fields.push(field)
    return this
  }

  /**
   * Build the schema and return as a Ref.
   * @returns Built JSON schema wrapped in a Ref.
   */
  toRef (): Ref<FormGeneratorSchema> {
    return ref(this.build())
  }

  /**
   * Build the schema. Converts all builders to JSON.
   * @returns A JSON object representing the schema.
   */
  build (): FormGeneratorSchema {
    return {
      model: this.model,
      schema: {
        fields: this.fields?.map((field: BaseFieldBuilder<any>) => field.build()) ?? undefined
      }
    }
  }

}