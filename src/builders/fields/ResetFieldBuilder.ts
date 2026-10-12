import BaseButtonBuilder from '@/builders/base/BaseButton'
import type { ResetField } from '@/resources/types/field/fields'

/**
 * Field builder for the reset field.
 */
export default class ResetFieldBuilder extends BaseButtonBuilder<ResetField> {

  constructor(name: string) {
    super('reset', name)
    this.data.buttonText = 'Reset'
  }

}
