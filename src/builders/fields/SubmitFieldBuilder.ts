import BaseButtonBuilder from '@/builders/base/BaseButton'
import type { SubmitField } from '@/resources/types/field/fields'

/**
 * Field builder for the submit field.
 */
export default class SubmitFieldBuilder extends BaseButtonBuilder<SubmitField> {

  constructor(name: string) {
    super('submit', name)
    this.data.buttonText = 'Submit'
  }

}
