import { BaseFieldBuilder } from '@/builders/base'
import type { SwitchField } from '@/resources/types/field/fields'

/**
 * Field builder for the switch field.
 */
export default class SwitchFieldBuilder extends BaseFieldBuilder<SwitchField, boolean> {
  __default__: boolean = false

  constructor(name: string) {
    super('switch', name)
  }

}
