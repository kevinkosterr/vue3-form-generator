import type { TextField } from '@/resources/types/field/fields'
import type { FormModel } from '@/resources/types/fieldAttributes'
import BaseInputBuilder from '@/builders/base/BaseInput'

/**
 * Field builder for the text field.
 */
export default class TextFieldBuilder<M extends object = FormModel> extends BaseInputBuilder<TextField, string, M> {
  protected defaultValue: string = ''

  constructor (name?: string) {
    super('text', name)
  }

  /**
   * Sets the `placeholder` property.
   * @param value
   */
  placeholder (value: string): this {
    return this.set('placeholder', value)
  }

  /**
   * Sets the `min` property.
   * @param value - Minimum length.
   */
  min (value: number): this {
    return this.set('min', value)
  }

  /**
   * Sets the `max` property.
   * @param value - Maximum length.
   */
  max (value: number): this {
    return this.set('max', value)
  }

  /**
   * Sets the `autocomplete` property.
   * @param value - Defaults to `true`.
   */
  autoComplete (value: boolean = true): this {
    return this.set('autocomplete', value)
  }

}
