import { BaseFieldBuilder } from '@/builders/base'
import { FormGeneratorSchema } from '@/resources/types/generic'
import GroupBuilder from '@/builders/group'
import { type Ref, ref } from 'vue'

/**
 * Form schema builder
 * @param model - Initial model object.
 * @param fields - Array of field builders.
 * @param groups - Array of group builders.
 */
export class SchemaBuilder {
  protected model: Record<string, any> = {}
  protected fields: BaseFieldBuilder<any>[] = []
  protected groups: GroupBuilder[] = []

  constructor(model: Record<string, any>, fields?: BaseFieldBuilder<any>[], groups?: GroupBuilder[]) {
    this.model = model
    if (fields) this.fields = fields
    if (groups) this.groups = groups
  }

  /**
   * Get an array of all fields.
   * @returns An array of fields.
   */
  getFields (): BaseFieldBuilder<any>[] {
    return this.fields
  }

  /**
   * Get an array of all groups
   * @returns A array of groups.
   */
  getGroups (): GroupBuilder[] {
    return this.groups
  }

  /**
   * Add a field to the schema.
   * @param field - Field builder instance of the field that needs to be added.
   */
  field (field: BaseFieldBuilder<any>): SchemaBuilder {
    this.fields.push(field)
    return this
  }

  /**
   * Add a group to the schema.
   * @param legend - Optional legend for the group.
   * @param fields - Array of field builders that need to be added to the group.
   */
  group (legend?: string, ...fields: BaseFieldBuilder<any>[]): SchemaBuilder {
    this.groups.push(new GroupBuilder(fields, legend))
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
        fields: this.fields?.map((field: BaseFieldBuilder<any>) => field.build()) ?? undefined,
        groups: this.groups?.map((group: GroupBuilder) => group.build()) ?? undefined
      }
    }
  }

}