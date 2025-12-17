import { BaseFieldBuilder } from '@/builders/base'
import { FormGeneratorGroup } from '@/resources/types/generic'

export interface IGroupBuilder {
  build (): FormGeneratorGroup
}

export default class GroupBuilder implements IGroupBuilder {
  protected legend?: string = undefined
  protected fields: BaseFieldBuilder<any>[] = []

  constructor(fields: BaseFieldBuilder<any>[], legend?: string) {
    this.fields = fields
    if (this.legend) this.legend = legend
  }

  build (): FormGeneratorGroup {
    return {
      legend: this.legend,
      fields: this.fields.map(field => field.build())
    }
  }

}
