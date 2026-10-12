import BaseSelectBuilder from '@/builders/base/BaseSelect'
import type { OptionsInput, OptionValues } from '@/builders/base/BaseOption'
import type { SelectNativeField } from '@/resources/types/field/fields'
import type { FormModel } from '@/resources/types/fieldAttributes'

/**
 * Field builder for the native select field.
 * @typeParam O - Union of the option values, inferred from `option()` and `options()`.
 * @typeParam Multi - Whether multiple values can be selected, set by `multiple()`.
 */
export default class SelectNativeFieldBuilder<O extends string = never, Multi extends boolean = false, M extends object = FormModel>
  extends BaseSelectBuilder<SelectNativeField, O, Multi, M>
{

  constructor (name?: string) {
    super('select-native', name)
  }

  /**
   * Adds an option to the field.
   * @param name - Name/label of the option.
   * @param value - Value/key of the option.
   */
  option<const V extends string> (name: string, value: V): SelectNativeFieldBuilder<O | V, Multi, M> {
    this.addOption(name, value)
    return this as unknown as SelectNativeFieldBuilder<O | V, Multi, M>
  }

  /**
   * Replaces all options of the field.
   * @param options - An array of options, an array of values or an object mapping values to names.
   */
  options<const T extends OptionsInput> (options: T): SelectNativeFieldBuilder<OptionValues<T>, Multi, M> {
    this.setOptions(options)
    return this as unknown as SelectNativeFieldBuilder<OptionValues<T>, Multi, M>
  }

  /**
   * Allow selecting multiple values. The model value becomes an array of values.
   * @param value - Defaults to `true`.
   */
  multiple<T extends boolean = true> (value?: T): SelectNativeFieldBuilder<O, T, M> {
    this.setMultiple(value ?? true)
    return this as unknown as SelectNativeFieldBuilder<O, T, M>
  }

}
