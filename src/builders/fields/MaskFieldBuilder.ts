import { BaseFieldBuilder } from '@/builders/base'
import type { MaskField } from '@/resources/types/field/fields'
import type { FormModel } from '@/resources/types/fieldAttributes'

/**
 * Field builder for the mask field.
 */
export default class MaskFieldBuilder<M extends object = FormModel> extends BaseFieldBuilder<MaskField, string, M> {
  protected defaultValue: string = ''

  constructor (name?: string) {
    super('mask', name)
  }

  protected getRequiredKeys (): (keyof MaskField)[] {
    return [ ...super.getRequiredKeys(), 'mask' ]
  }

  /**
   * Sets the `mask` and optionally the `maskOptions` property.
   * @param mask - Mask pattern, e.g. `##-##-####`.
   * @param options - Additional mask options.
   */
  mask (mask: MaskField['mask'], options?: MaskField['maskOptions']): this {
    this.set('mask', mask)
    return options === undefined ? this : this.set('maskOptions', options)
  }

  /**
   * Sets the `placeholder` property.
   * @param value
   */
  placeholder (value: string): this {
    return this.set('placeholder', value)
  }

}
