import BaseOptionFieldBuilder, { type OptionsInput, type OptionValue, type OptionValues } from '@/builders/base/BaseOption'
import type { RadioField } from '@/resources/types/field/fields'
import type { FormModel } from '@/resources/types/fieldAttributes'

/**
 * Field builder for the radio field.
 * @typeParam O - Union of the option values, inferred from `option()` and `options()`.
 */
export default class RadioFieldBuilder<O extends string = never, M extends object = FormModel>
  extends BaseOptionFieldBuilder<RadioField, OptionValue<O> | '', M>
{
  protected defaultValue: OptionValue<O> | '' = ''

  constructor (name?: string) {
    super('input', name)
    this.data.inputType = 'radio'
  }

  /**
   * Adds an option to the field.
   * @param name - Name/label of the option.
   * @param value - Value/key of the option.
   */
  option<const V extends string> (name: string, value: V): RadioFieldBuilder<O | V, M> {
    this.addOption(name, value)
    return this as RadioFieldBuilder<O | V, M>
  }

  /**
   * Replaces all options of the field.
   * @param options - An array of options, an array of values or an object mapping values to names.
   */
  options<const T extends OptionsInput> (options: T): RadioFieldBuilder<OptionValues<T>, M> {
    this.setOptions(options)
    return this as unknown as RadioFieldBuilder<OptionValues<T>, M>
  }

}
