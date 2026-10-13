import BaseOptionFieldBuilder, { type OptionsInput, type OptionValue, type OptionValues } from '@/builders/base/BaseOption'
import type { ChecklistField } from '@/resources/types/field/fields'
import type { FormModel } from '@/resources/types/fieldAttributes'

/**
 * Field builder for the checklist field.
 * @typeParam O - Union of the option values, inferred from `option()` and `options()`.
 */
export default class ChecklistFieldBuilder<O extends string = never, M extends object = FormModel>
  extends BaseOptionFieldBuilder<ChecklistField, OptionValue<O>[], M>
{
  protected defaultValue: OptionValue<O>[] = []

  constructor (name?: string) {
    super('checklist', name)
  }

  /**
   * Adds an option to the field.
   * @param name - Name/label of the option.
   * @param value - Value/key of the option.
   */
  option<const V extends string> (name: string, value: V): ChecklistFieldBuilder<O | V, M> {
    this.addOption(name, value)
    return this as ChecklistFieldBuilder<O | V, M>
  }

  /**
   * Replaces all options of the field.
   * @param options - An array of options, an array of values or an object mapping values to names.
   */
  options<const T extends OptionsInput> (options: T): ChecklistFieldBuilder<OptionValues<T>, M> {
    this.setOptions(options)
    return this as unknown as ChecklistFieldBuilder<OptionValues<T>, M>
  }

}
