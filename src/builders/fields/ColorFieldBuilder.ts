import type { IBaseFieldBuilder } from '@/builders/base'
import type { ColorField } from '@/resources/types/field/fields'
import BaseInputBuilder from '@/builders/base/BaseInput'

export interface IColorFieldBuilder extends IBaseFieldBuilder<ColorField, string> {
  withInput (value?: boolean): this
}

/**
 * Field builder for the color field.
 */
export default class ColorFieldBuilder extends BaseInputBuilder<ColorField, string> implements IColorFieldBuilder {
  __default__: string = '#000000'

  constructor(name: string) {
    super(name)
    this.data.inputType = 'color'
  }

  /**
   * Sets the `withInput` property, which renders an additional text input.
   * @param value
   */
  withInput (value?: boolean): this {
    if (value === undefined) value = true
    this.data.withInput = value
    return this
  }

}
