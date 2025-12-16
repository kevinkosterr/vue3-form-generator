import type { Field } from '@/resources/types/field/fields'
import { BaseFieldBuilder } from '@/builders/base'


/**
 * Base class for all input field builders e.g., TextFieldBuilder or CheckboxFieldBuilder.
 */
export default class BaseInputBuilder<T extends Field = Field> extends BaseFieldBuilder<T> {

  constructor(name: string) {
    super('input', name)
  }

  getRequiredKeys(): (keyof T)[] {
    return [ ...super.getRequiredKeys(), 'inputType' ] as (keyof T)[]
  }

}