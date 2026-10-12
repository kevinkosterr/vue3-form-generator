import { AbstractBaseBuilder, type IAbstractBaseBuilder } from '@/builders/base'
import type { ButtonField, ResetField, SubmitField } from '@/resources/types/field/fields'
import { NoValueError } from '@/exceptions'

export interface IBaseButtonBuilder<F extends ButtonField | SubmitField | ResetField = ButtonField | SubmitField | ResetField> extends IAbstractBaseBuilder<F, never> {
  buttonText (text: string): this
  buttonClasses (classes: string): this
}

/**
 * Base class for all button-like field builders e.g., ButtonFieldBuilder or SubmitFieldBuilder.
 * Buttons don't emit values, so they never end up in the model.
 */
export default abstract class BaseButtonBuilder<F extends ButtonField | SubmitField | ResetField = ButtonField | SubmitField | ResetField>
  extends AbstractBaseBuilder<F, never> implements IBaseButtonBuilder<F>
{

  getDefaultValue (): this['__default__'] {
    throw new NoValueError()
  }

  protected getRequiredKeys (): (keyof F)[] {
    return [ 'type', 'buttonText' ] as (keyof F)[]
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
   * Set the classes for the button.
   * @param classes - Space separated string of classes.
   */
  buttonClasses (classes: string): this {
    this.data.buttonClasses = classes
    return this
  }

}
