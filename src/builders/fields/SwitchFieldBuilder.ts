import { BaseFieldBuilder } from '@/builders/base'
import type { SwitchField } from '@/resources/types/field/fields'
import type { FormModel } from '@/resources/types/fieldAttributes'

/**
 * Field builder for the switch field.
 */
export default class SwitchFieldBuilder<M extends object = FormModel> extends BaseFieldBuilder<SwitchField, boolean, M> {
  protected defaultValue: boolean = false

  constructor (name?: string) {
    super('switch', name)
  }

}
