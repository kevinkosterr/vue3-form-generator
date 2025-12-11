import BaseOptionFieldBuilder from '@/builders/base/BaseOption'
import { ChecklistField } from '@/resources/types/field/fields'

export default class ChecklistFieldBuilder extends BaseOptionFieldBuilder<ChecklistField> {

  constructor(name: string, model: string) {
    super('checklist', name, model)
  }


}