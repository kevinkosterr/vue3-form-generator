import BaseButtonBuilder, { type IBaseButtonBuilder } from '@/builders/base/BaseButton'
import type { ButtonField } from '@/resources/types/field/fields'

export interface IButtonFieldBuilder extends IBaseButtonBuilder<ButtonField> {
  onClick (callback: ButtonField['onClick']): this
}

/**
 * Field builder for the button field.
 */
export default class ButtonFieldBuilder extends BaseButtonBuilder<ButtonField> implements IButtonFieldBuilder {

  constructor(name: string) {
    super('button', name)
  }

  protected getRequiredKeys (): (keyof ButtonField)[] {
    return [ ...super.getRequiredKeys(), 'onClick' ]
  }

  /**
   * Set the onClick handler for the button.
   * @param callback - Callback function.
   */
  onClick (callback: ButtonField['onClick']): this {
    this.data.onClick = callback
    return this
  }

}
