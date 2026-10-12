import { BaseFieldBuilder, type IBaseFieldBuilder } from '@/builders/base'
import type { TextAreaField } from '@/resources/types/field/fields'

export interface ITextareaFieldBuilder extends IBaseFieldBuilder<TextAreaField, string> {
  placeholder (value: string): this
  maxLength (value: number): this
  resizable (value?: boolean): this
}

/**
 * Field builder for the textarea field.
 */
export default class TextareaFieldBuilder extends BaseFieldBuilder<TextAreaField, string> implements ITextareaFieldBuilder {
  __default__: string = ''

  constructor(name: string) {
    super('textarea', name)
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
   * Sets the `maxLength` property.
   * @param value - Maximum amount of characters.
   */
  maxLength (value: number): this {
    this.data.maxLength = String(value)
    return this
  }

  /**
   * Sets the `resizable` property.
   * @param value
   */
  resizable (value?: boolean): this {
    if (value === undefined) value = true
    this.data.resizable = value
    return this
  }

}
