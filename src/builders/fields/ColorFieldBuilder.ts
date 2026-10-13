import type { ColorField } from '@/resources/types/field/fields'
import type { FormModel } from '@/resources/types/fieldAttributes'
import BaseInputBuilder from '@/builders/base/BaseInput'

/**
 * Field builder for the color field.
 */
export default class ColorFieldBuilder<M extends object = FormModel> extends BaseInputBuilder<ColorField, string, M> {
  protected defaultValue: string = '#000000'

  constructor (name?: string) {
    super('color', name)
  }

  /**
   * Sets the `withInput` property, which renders an additional text input.
   * @param value - Defaults to `true`.
   */
  withInput (value: boolean = true): this {
    return this.set('withInput', value)
  }

}
