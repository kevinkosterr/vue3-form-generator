import BaseButtonBuilder from '@/builders/base/BaseButton'
import type { ResetField } from '@/resources/types/field/fields'
import type { FormModel } from '@/resources/types/fieldAttributes'

/**
 * Field builder for the reset field.
 */
export default class ResetFieldBuilder<M extends object = FormModel> extends BaseButtonBuilder<ResetField, M> {

  constructor (name?: string) {
    super('reset', name)
    this.data.buttonText = 'Reset'
  }

}
