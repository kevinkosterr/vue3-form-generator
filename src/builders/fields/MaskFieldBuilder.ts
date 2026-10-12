import { BaseFieldBuilder, type IBaseFieldBuilder } from '@/builders/base'
import type { MaskField } from '@/resources/types/field/fields'

export interface IMaskFieldBuilder extends IBaseFieldBuilder<MaskField, string> {
  mask (mask: MaskField['mask'], options?: MaskField['maskOptions']): this
  placeholder (value: string): this
}

/**
 * Field builder for the mask field.
 */
export default class MaskFieldBuilder extends BaseFieldBuilder<MaskField, string> implements IMaskFieldBuilder {
  __default__: string = ''

  constructor(name: string) {
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
    this.data.mask = mask
    if (options !== undefined) this.data.maskOptions = options
    return this
  }

  /**
   * Sets the `placeholder` property.
   * @param value
   */
  placeholder (value: string): this {
    this.data.placeholder = value
    return this
  }

}
