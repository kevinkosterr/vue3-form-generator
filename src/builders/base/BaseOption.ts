import { BaseFieldBuilder } from '@/builders/base'
import type { Field } from '@/resources/types/field/fields'
import type { OptionField } from '@/resources/types/field/base'
import type { FieldOption, FormModel } from '@/resources/types/fieldAttributes'

/**
 * Options accepted by `options()`: an array of options, an array of values (used as names too),
 * or an object mapping values to names.
 */
export type OptionsInput = readonly FieldOption[] | readonly string[] | Readonly<Record<string, string>>

/**
 * Extracts the option values from an `OptionsInput`.
 */
export type OptionValues<T extends OptionsInput> =
  T extends readonly (infer E)[]
    ? E extends string ? E : E extends { value: infer V extends string } ? V : never
    : keyof T & string

/**
 * Value of a single option. Falls back to `string` when the option values are unknown.
 */
export type OptionValue<O extends string> = [ O ] extends [ never ] ? string : O

/**
 * Base class for all option field builders e.g., SelectFieldBuilder or RadioFieldBuilder.
 *
 * Subclasses expose `option()` and `options()` themselves, so they can narrow the option values (`O`)
 * of their own type.
 */
export default abstract class BaseOptionFieldBuilder<
  F extends Field & OptionField = Field & OptionField,
  V = unknown,
  M extends object = FormModel
> extends BaseFieldBuilder<F, V, M> {

  protected constructor (type: string, name?: string) {
    super(type, name)
    this.data.options = []
  }

  /**
   * Adds an option to the field.
   * @param name - Name/label of the option.
   * @param value - Value/key of the option.
   */
  protected addOption (name: string, value: string): void {
    this.data.options = [ ...(this.data.options ?? []), { name, value } ]
  }

  /**
   * Replaces all options of the field.
   * @param options - Options in any of the supported formats.
   */
  protected setOptions (options: OptionsInput): void {
    if (Array.isArray(options)) {
      this.data.options = options.map((option: string | FieldOption) =>
        typeof option === 'string' ? { name: option, value: option } : { ...option }
      )
    } else {
      this.data.options = Object.entries(options).map(([ value, name ]) => ({ name, value }))
    }
  }

}
