import { BaseFieldBuilder, IBaseFieldBuilder } from '@/builders/base/index'
import type { FieldOption } from '@/resources/types/fieldAttributes'
import { Field } from '@/resources/types/field/fields'
import type { OptionField } from '@/resources/types/field/base'

interface IBaseOptionFieldBuilder extends IBaseFieldBuilder<Field & OptionField> {
  option (name: FieldOption['name'], value: FieldOption['value']): this
  options(options: FieldOption[]): this
}

/**
 * Base class for all option field builders e.g., SelectFieldBuilder or RadioFieldBuilder.
 */
export default class BaseOptionFieldBuilder<T extends Field & OptionField = Field & OptionField>
  extends BaseFieldBuilder<T> implements IBaseOptionFieldBuilder
{

  constructor(type:string, name: string) {
    super(type, name)
    this.data.options = []
  }

  protected addOption (option: FieldOption): void {
    this.data.options!.push(option)
  }

  /**
   * Adds an option to the field.
   * @param name - Name/label of the option.
   * @param value - Value/key of the option.
   */
  option (name: FieldOption['name'], value: FieldOption['value']): this {
    this.addOption({ name, value })
    return this
  }

  /**
   * Add multiple options to the field, replaces all previously defined options.
   * @param options - An array of options.
   */
  options(options: FieldOption[]): this {
    this.data.options = options
    return this
  }

}