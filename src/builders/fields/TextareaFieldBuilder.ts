import { BaseFieldBuilder } from '@/builders/base'
import type { TextAreaField } from '@/resources/types/field/fields'
import type { FormModel } from '@/resources/types/fieldAttributes'

/**
 * Field builder for the textarea field.
 */
export default class TextareaFieldBuilder<M extends object = FormModel> extends BaseFieldBuilder<TextAreaField, string, M> {
  protected defaultValue: string = ''

  constructor (name?: string) {
    super('textarea', name)
  }

  /**
   * Sets the `placeholder` property.
   * @param value
   */
  placeholder (value: string): this {
    return this.set('placeholder', value)
  }

  /**
   * Sets the `maxLength` property.
   * @param value - Maximum amount of characters.
   */
  maxLength (value: number): this {
    return this.set('maxLength', value)
  }

  /**
   * Sets the `resizable` property.
   * @param value - Defaults to `true`.
   */
  resizable (value: boolean = true): this {
    return this.set('resizable', value)
  }

}
