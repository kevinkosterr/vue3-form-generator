import BaseButtonBuilder from '@/builders/base/BaseButton'
import type { SubmitField } from '@/resources/types/field/fields'
import type { FormModel } from '@/resources/types/fieldAttributes'

/**
 * Field builder for the submit field.
 */
export default class SubmitFieldBuilder<M extends object = FormModel> extends BaseButtonBuilder<SubmitField, M> {

  constructor (name?: string) {
    super('submit', name)
    this.data.buttonText = 'Submit'
  }

}
