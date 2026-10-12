import BaseOptionFieldBuilder from '@/builders/base/BaseOption'
import type { RadioField } from '@/resources/types/field/fields'

/**
 * Field builder for the radio field.
 */
export default class RadioFieldBuilder extends BaseOptionFieldBuilder<RadioField, string> {
  __default__: string = ''

  constructor(name: string) {
    super('input', name)
    this.data.inputType = 'radio'
  }

  protected getRequiredKeys (): (keyof RadioField)[] {
    return [ ...super.getRequiredKeys(), 'inputType' ]
  }

}
