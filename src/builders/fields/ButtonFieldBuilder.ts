import { AbstractBaseBuilder, type IAbstractBaseBuilder } from '@/builders/base'
import type { ButtonField, Field } from '@/resources/types/field/fields'
import { NoValueError } from '@/exceptions'

export interface IButtonFieldBuilder<F extends Field = ButtonField> extends IAbstractBaseBuilder<F, null> {
  buttonText (text: string): this
  onClick (callback: ButtonField['onClick']): this
}

export default class ButtonFieldBuilder extends AbstractBaseBuilder<ButtonField, null> implements IButtonFieldBuilder {

  constructor(name: string) {
    super('button', name)
  }

  getDefaultValue (): this['__default__'] {
    throw new NoValueError()
  }

  protected getRequiredKeys(): (keyof ButtonField)[] {
    return [ 'type', 'buttonText', 'onClick' ]
  }

  /**
  * Set the text for the button.
  * @param text - Text to set.
  */
  buttonText (text: string): this {
    this.data.buttonText = text
    return this
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

