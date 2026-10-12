import BaseButtonBuilder from '@/builders/base/BaseButton'
import type { ButtonField } from '@/resources/types/field/fields'
import type { FormModel } from '@/resources/types/fieldAttributes'

/**
 * Field builder for the button field.
 */
export default class ButtonFieldBuilder<M extends object = FormModel> extends BaseButtonBuilder<ButtonField, M> {

  constructor (name?: string) {
    super('button', name)
  }

  /**
   * Set the onClick handler for the button.
   * @param callback - Callback function, receiving the model and the field.
   */
  onClick (callback: (model: M, field: ButtonField) => void): this {
    return this.set('onClick', callback as ButtonField['onClick'])
  }

}
