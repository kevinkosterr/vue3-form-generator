import BaseOptionFieldBuilder, { type OptionValue } from '@/builders/base/BaseOption'
import type { SelectField, SelectNativeField } from '@/resources/types/field/fields'
import type { FormModel } from '@/resources/types/fieldAttributes'

/**
 * Model value of a select field, depending on its option values and whether it allows multiple values.
 */
export type SelectValue<O extends string, Multi extends boolean> =
  Multi extends true ? OptionValue<O>[] : OptionValue<O> | ''

/**
 * Base class for select field builders e.g., SelectFieldBuilder or SelectNativeFieldBuilder.
 */
export default abstract class BaseSelectBuilder<
  F extends SelectField | SelectNativeField,
  O extends string = never,
  Multi extends boolean = false,
  M extends object = FormModel
> extends BaseOptionFieldBuilder<F, SelectValue<O, Multi>, M> {
  protected defaultValue = '' as SelectValue<O, Multi>

  /**
   * Sets the `placeholder` property.
   * @param value
   */
  placeholder (value: string): this {
    return this.set('placeholder', value)
  }

  /**
   * Sets the `multiple` property and converts the default value to match.
   * @param value
   */
  protected setMultiple (value: boolean): void {
    this.data.multiple = value
    const current: string | string[] = this.defaultValue
    if (value && !Array.isArray(current)) {
      this.defaultValue = (current === '' ? [] : [ current ]) as SelectValue<O, Multi>
    } else if (!value && Array.isArray(current)) {
      this.defaultValue = (current[0] ?? '') as SelectValue<O, Multi>
    }
  }

}
