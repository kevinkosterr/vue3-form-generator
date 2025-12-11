import type { CheckboxField } from '@/resources/types/field/fields'
import BaseInputBuilder from '@/builders/base/BaseInput'

export default class CheckboxFieldBuilder extends BaseInputBuilder<CheckboxField> {

  constructor(name: string, model: string) {
    super(name, model)
    this.data.inputType = 'checkbox'
  }

}
