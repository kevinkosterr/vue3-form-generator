import BaseSelectBuilder from '@/builders/base/BaseSelect'
import type { SelectNativeField } from '@/resources/types/field/fields'

/**
 * Field builder for the native select field.
 */
export default class SelectNativeFieldBuilder<M extends boolean = false> extends BaseSelectBuilder<SelectNativeField, M> {

  constructor(name: string) {
    super('select-native', name)
  }

  /**
   * Allow selecting multiple values. The model value becomes an array of values.
   * @param value
   */
  multiple<T extends boolean = true> (value?: T): SelectNativeFieldBuilder<T> {
    this.setMultiple(value ?? true)
    return this as unknown as SelectNativeFieldBuilder<T>
  }

}
