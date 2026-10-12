import BaseOptionFieldBuilder from '@/builders/base/BaseOption'
import type { SelectField, SelectNativeField } from '@/resources/types/field/fields'

/**
 * Model value of a select field, depending on whether it allows multiple values.
 */
export type SelectValue<M extends boolean> = M extends true ? string[] : string

/**
 * Base class for select field builders e.g., SelectFieldBuilder or SelectNativeFieldBuilder.
 */
export default abstract class BaseSelectBuilder<F extends SelectField | SelectNativeField, M extends boolean = false>
  extends BaseOptionFieldBuilder<F, SelectValue<M>>
{
  __default__: SelectValue<M> = '' as SelectValue<M>

  /**
   * Sets the `placeholder` property.
   * @param value
   */
  placeholder (value: string): this {
    this.data.placeholder = value
    return this
  }

  /**
   * Sets the `multiple` property and converts the default value to match.
   * @param value
   */
  protected setMultiple (value: boolean): void {
    this.data.multiple = value
    const current: string | string[] = this.__default__
    if (value && !Array.isArray(current)) {
      this.__default__ = (current === '' ? [] : [ current ]) as SelectValue<M>
    } else if (!value && Array.isArray(current)) {
      this.__default__ = (current[0] ?? '') as SelectValue<M>
    }
  }

}
