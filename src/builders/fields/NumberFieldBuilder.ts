import type { NumberField } from '@/resources/types/field/fields'
import type { FormModel } from '@/resources/types/fieldAttributes'
import BaseInputBuilder from '@/builders/base/BaseInput'

/**
 * Field builder for the number field.
 */
export default class NumberFieldBuilder<M extends object = FormModel> extends BaseInputBuilder<NumberField, number, M> {
  protected defaultValue: number = 0

  constructor (name?: string) {
    super('number', name)
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
   * @param value - Minimum value.
   */
  min (value: number): this {
    return this.set('min', value)
  }

  /**
   * Sets the `max` property.
   * @param value - Maximum value.
   */
  max (value: number): this {
    return this.set('max', value)
  }

  /**
   * Sets the `step` property.
   * @param value - Amount to increase or decrease the number by.
   */
  step (value: number): this {
    return this.set('step', value)
  }

}
