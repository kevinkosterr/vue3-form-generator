import { BaseFieldBuilder } from '@/builders/base'
import { FormGeneratorSchema } from '@/resources/types/generic'
import { GroupBuilder } from '@/builders/group'
import { type Ref, ref } from 'vue'

/**
 * Form schema builder
 * @param model - Initial model object.
 * @param fields - Array of field builders.
 * @param groups - Array of group builders.
 */
export class SchemaBuilder {
  protected model: Record<string, any> = {}
  protected fields?: BaseFieldBuilder<any>[] = []
  protected groups?: GroupBuilder[] = []

  constructor(model: Record<string, any>, fields?: BaseFieldBuilder<any>[], groups?: GroupBuilder[]) {
    this.model = model
    this.fields = fields
    this.groups = groups
  }

  toRef (): Ref<FormGeneratorSchema> {
    return ref(this.build())
  }

  build (): FormGeneratorSchema {
    return {
      model: this.model,
      schema: {
        fields: this.fields?.map(field => field.build()) ?? undefined,
        groups: this.groups?.map(group => group.build()) ?? undefined
      }
    }
  }

}