import { BaseFieldBuilder, IBaseFieldBuilder } from '@/builders/base'
import type { TextField } from '@/resources/types/field/fields'

export interface ITextFieldBuilder extends IBaseFieldBuilder<TextField> {
  placeholder (value: string): this
  autoComplete (value?: boolean): this
}

/**
 * Field builder for the text field.
 */
export default class TextFieldBuilder extends BaseFieldBuilder<TextField> implements ITextFieldBuilder {

  constructor(name: string, model: string) {
    super('input', name, model)
    this.data.inputType = 'text'
  }

  /**
   * Sets the `placeholder` property.
   * @param value
   */
  placeholder (value: string): this {
    this.data.placeholder = value
    return this
  }

  /**
   * Sets the `autocomplete` property.
   * @param value
   */
  autoComplete (value?: boolean): this {
    if (value === undefined) value = true
    this.data.autocomplete = value
    return this
  }

  protected getRequiredKeys(): (keyof TextField)[] {
    return [ ...super.getRequiredKeys(), 'inputType' ]
  }


}
