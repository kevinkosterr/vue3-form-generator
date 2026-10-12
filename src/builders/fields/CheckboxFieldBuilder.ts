import type { CheckboxField } from '@/resources/types/field/fields'
import type { FormModel } from '@/resources/types/fieldAttributes'
import BaseInputBuilder from '@/builders/base/BaseInput'

/**
 * Field builder for the checkbox field.
 */
export default class CheckboxFieldBuilder<M extends object = FormModel> extends BaseInputBuilder<CheckboxField, boolean, M> {
  protected defaultValue: boolean = false

  constructor (name?: string) {
    super('checkbox', name)
  }

}
