import { BaseFieldBuilder } from '@/builders/base'
import { FormGeneratorGroup } from '@/resources/types/generic'


export class GroupBuilder {
  protected legend?: string = undefined
  protected fields: BaseFieldBuilder[] = []

  constructor(fields: BaseFieldBuilder[], legend?: string) {
    this.fields = fields
    this.legend = legend
  }

  build (): FormGeneratorGroup {
    return {
      legend: this.legend,
      fields: this.fields.map(field => field.build())
    }
  }

}
