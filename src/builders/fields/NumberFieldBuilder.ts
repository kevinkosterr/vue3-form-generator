import type { IBaseFieldBuilder } from '@/builders/base'
import type { NumberField } from '@/resources/types/field/fields'
import BaseInputBuilder from '@/builders/base/BaseInput'

export interface INumberFieldBuilder extends IBaseFieldBuilder<NumberField, number> {
  placeholder (value: string): this
  min (value: number): this
  max (value: number): this
  step (value: number): this
}

/**
 * Field builder for the number field.
 */
export default class NumberFieldBuilder extends BaseInputBuilder<NumberField, number> implements INumberFieldBuilder {
  __default__: number = 0

  constructor(name: string) {
    super(name)
    this.data.inputType = 'number'
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
   * @param value - Minimum value.
   */
  min (value: number): this {
    this.data.min = value
    return this
  }

  /**
   * Sets the `max` property.
   * @param value - Maximum value.
   */
  max (value: number): this {
    this.data.max = value
    return this
  }

  /**
   * Sets the `step` property.
   * @param value - Amount to increase or decrease the number by.
   */
  step (value: number): this {
    this.data.step = value
    return this
  }

}
