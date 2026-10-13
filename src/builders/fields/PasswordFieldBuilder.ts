import type { PasswordField } from '@/resources/types/field/fields'
import type { FormModel } from '@/resources/types/fieldAttributes'
import BaseInputBuilder from '@/builders/base/BaseInput'

/**
 * Field builder for the password field.
 */
export default class PasswordFieldBuilder<M extends object = FormModel> extends BaseInputBuilder<PasswordField, string, M> {
  protected defaultValue: string = ''

  constructor (name?: string) {
    super('password', name)
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
   * Sets the `indicator` property, which shows a password strength indicator.
   * @param value - Defaults to `true`.
   */
  indicator (value: boolean = true): this {
    return this.set('indicator', value)
  }

}
