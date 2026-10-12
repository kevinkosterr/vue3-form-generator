import type { Field } from '@/resources/types/field/fields'
import type { InputField } from '@/resources/types/field/base'
import type { FormModel } from '@/resources/types/fieldAttributes'
import { BaseFieldBuilder } from '@/builders/base'

/**
 * Base class for all input field builders e.g., TextFieldBuilder or CheckboxFieldBuilder.
 */
export default abstract class BaseInputBuilder<F extends Field & InputField = Field & InputField, V = unknown, M extends object = FormModel>
  extends BaseFieldBuilder<F, V, M>
{

  protected constructor (inputType: string, name?: string) {
    super('input', name)
    this.data.inputType = inputType as F['inputType']
  }

}
