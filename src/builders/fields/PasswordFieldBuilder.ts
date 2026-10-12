import type { IBaseFieldBuilder } from '@/builders/base'
import type { PasswordField } from '@/resources/types/field/fields'
import BaseInputBuilder from '@/builders/base/BaseInput'

export interface IPasswordFieldBuilder extends IBaseFieldBuilder<PasswordField, string> {
  placeholder (value: string): this
  min (value: number): this
  max (value: number): this
  indicator (value?: boolean): this
}

/**
 * Field builder for the password field.
 */
export default class PasswordFieldBuilder extends BaseInputBuilder<PasswordField, string> implements IPasswordFieldBuilder {
  __default__: string = ''

  constructor(name: string) {
    super(name)
    this.data.inputType = 'password'
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
   * Sets the `min` property.
   * @param value - Minimum length.
   */
  min (value: number): this {
    this.data.min = value
    return this
  }

  /**
   * Sets the `max` property.
   * @param value - Maximum length.
   */
  max (value: number): this {
    this.data.max = value
    return this
  }

  /**
   * Sets the `indicator` property, which shows a password strength indicator.
   * @param value
   */
  indicator (value?: boolean): this {
    if (value === undefined) value = true
    this.data.indicator = value
    return this
  }

}
