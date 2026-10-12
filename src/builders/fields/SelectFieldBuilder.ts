import BaseSelectBuilder from '@/builders/base/BaseSelect'
import type { SelectField } from '@/resources/types/field/fields'

/**
 * Field builder for the select field.
 */
export default class SelectFieldBuilder<M extends boolean = false> extends BaseSelectBuilder<SelectField, M> {

  constructor(name: string) {
    super('select', name)
  }

  /**
   * Allow selecting multiple values. The model value becomes an array of values.
   * @param value
   */
  multiple<T extends boolean = true> (value?: T): SelectFieldBuilder<T> {
    this.setMultiple(value ?? true)
    return this as unknown as SelectFieldBuilder<T>
  }

}
