import BaseOptionFieldBuilder from '@/builders/base/BaseOption'
import { ChecklistField } from '@/resources/types/field/fields'

export default class ChecklistFieldBuilder extends BaseOptionFieldBuilder<ChecklistField, string[]> {
  __default__: string[] = []

  constructor(name: string) {
    super('checklist', name)
  }


}