import { AbstractBaseBuilder } from '@/builders/base'
import type { ButtonField, ResetField, SubmitField } from '@/resources/types/field/fields'
import type { FormModel } from '@/resources/types/fieldAttributes'

/**
 * Base class for all button-like field builders e.g., ButtonFieldBuilder or SubmitFieldBuilder.
 * Buttons don't emit values, so they never end up in the model.
 */
export default abstract class BaseButtonBuilder<
  F extends ButtonField | SubmitField | ResetField = ButtonField | SubmitField | ResetField,
  M extends object = FormModel
> extends AbstractBaseBuilder<F, never, M> {
  /** @internal */
  readonly emitsValue: boolean = false

  protected getRequiredKeys (): (keyof F)[] {
    return [ ...super.getRequiredKeys(), 'buttonText' ]
  }

  /**
   * Set the text for the button.
   * @param text - Text to set.
   */
  buttonText (text: string): this {
    return this.set('buttonText', text)
  }

  /**
   * Set the classes for the button.
   * @param classes - Space separated string of classes.
   */
  buttonClasses (classes: string): this {
    return this.set('buttonClasses', classes)
  }

}
