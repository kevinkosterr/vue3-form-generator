import BaseOptionFieldBuilder from '@/builders/base/BaseOption'
import type { ChecklistField } from '@/resources/types/field/fields'

/**
 * Field builder for the checklist field.
 */
export default class ChecklistFieldBuilder extends BaseOptionFieldBuilder<ChecklistField, string[]> {
  __default__: string[] = []

  constructor(name: string) {
    super('checklist', name)
  }

}
