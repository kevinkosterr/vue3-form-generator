import type { AbstractBaseBuilder } from '@/builders/base'
import type { FormGeneratorGroup } from '@/resources/types/generic'

export interface IGroupBuilder {
  build (): FormGeneratorGroup
}

/**
 * Builder for a group of fields. Usually created through `SchemaBuilder.group()`.
 */
export default class GroupBuilder implements IGroupBuilder {
  protected legend?: string = undefined
  protected fields: AbstractBaseBuilder<any, any>[] = []

  constructor(fields: AbstractBaseBuilder<any, any>[], legend?: string) {
    this.fields = fields
    if (legend) this.legend = legend
  }

  /**
   * Get an array of all fields in this group.
   */
  getFields (): AbstractBaseBuilder<any, any>[] {
    return this.fields
  }

  build (): FormGeneratorGroup {
    const group: FormGeneratorGroup = {
      fields: this.fields.map(field => field.build())
    }
    if (this.legend) group.legend = this.legend
    return group
  }

}
