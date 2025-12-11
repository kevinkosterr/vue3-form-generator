import { BaseFieldBuilder } from '@/builders/base'
import type { CheckboxField } from '@/resources/types/field/fields'

export default class CheckboxFieldBuilder extends BaseFieldBuilder<CheckboxField> {

  constructor(name: string, model: string) {
    super('checkbox', name, model)
  }

}
