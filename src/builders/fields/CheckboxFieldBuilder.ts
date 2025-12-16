import type { CheckboxField } from '@/resources/types/field/fields'
import BaseInputBuilder from '@/builders/base/BaseInput'

export default class CheckboxFieldBuilder extends BaseInputBuilder<CheckboxField> {
  protected __default__: boolean = false

  constructor(name: string) {
    super(name)
    this.data.inputType = 'checkbox'
  }

}
