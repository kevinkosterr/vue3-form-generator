import type { Field } from '@/resources/types/field/fields'
import type { FieldBase } from '@/resources/types/field/base'

export interface IAbstractBaseBuilder<F extends Field = Field, V = unknown> {
  __default__: V
  __data__ (): Partial<F>
  extend (properties: Record<string, any>): this
  build (): F
  model (key: string): this
  default (value: any): this
  getDefaultValue (): this['__default__']
}

/**
 * The base class for every builder. Contains the absolute basics for every field builder.
 */
export abstract class AbstractBaseBuilder<F extends Field = Field, V = unknown> implements IAbstractBaseBuilder<F, V> {
  __default__!: V

  protected data: Partial<F> = {}

  protected constructor (type: string, name: string) {
    this.data = {
      type, name
    } as Partial<F>
  }

  __data__ (): Partial<F> { return this.data }

  /**
   * Gets the keys required for this field.
   * Should be overridden by child classes if they have additional required keys.
   *
   * @protected
   */
  protected getRequiredKeys (): (keyof F)[] {
    return [ 'type', 'model' ] as (keyof F)[]
  }

  /**
   * Explicitly set the model key of the field.
   * @param key
   */
  model (key: string): this {
    this.data.model = key
    return this
  }

  /**
   * Get the default value of the field.
   */
  getDefaultValue (): this['__default__'] {
    return this.__default__
  }

  /**
   * Set the initial value of the field.
   */
  default (value: any): this {
    this.__default__ = value
    return this
  }

  /**
   * Extend the current field with additional properties.
   * @param properties
   */
  extend (properties: Record<string, any>): this {
    Object.assign(this.data, properties)
    return this
  }

  /**
   * Build and validate the field object.
   * Ensures all required properties are present.
   */
  build (): F {
    const requiredKeys: (keyof F)[] = this.getRequiredKeys()
    const missingKeys: (keyof F)[] = requiredKeys.filter((key: keyof F) => {
      return !(key in this.data) && (this.data[key] === undefined || this.data[key] === null || this.data[key] === '')
    })

    if (missingKeys.length) {
      throw new Error(`Failed to build field. Missing required keys: ${missingKeys.join(', ')}`)
    }

    return this.data as F
  }

}

export interface IBaseFieldBuilder<F extends Field = Field, V = unknown> extends IAbstractBaseBuilder<F, V> {
  id (value: NonNullable<FieldBase['id']>): this
  label(value: NonNullable<FieldBase['label']>): this
  labelIcon (value: NonNullable<FieldBase['labelIcon']>): this
  noLabel (value?: FieldBase['noLabel']): this
  hint (value: NonNullable<FieldBase['hint']>): this
  required (value?: NonNullable<FieldBase['required']>): this
  visible (value?: FieldBase['visible']): this
  readonly (value?: FieldBase['readonly']): this
  disabled (value?: FieldBase['disabled']): this
  validator (value?: NonNullable<FieldBase['validator']>): this
  onValidated (value: NonNullable<FieldBase['onValidated']>): this
  validateOn (value: NonNullable<FieldBase['validate']>): this
}

/**
 * Base class for most FieldBuilder classes.
 */
export abstract class BaseFieldBuilder<F extends Field = Field, V = unknown> extends AbstractBaseBuilder<F, V> implements IBaseFieldBuilder<F, V> {

  /**
   * Set the id property of the field.
   * @param value
   */
  id (value: NonNullable<FieldBase['id']>): this {
    this.data.id = value
    return this
  }

  /**
   * Set the label property of the field.
   * @param value
   */
  label(value: NonNullable<FieldBase['label']>): this {
    this.data.label = value
    return this
  }

  /**
   * Set the labelIcon property of the field.
   * @param value
   */
  labelIcon (value: NonNullable<FieldBase['labelIcon']>): this {
    this.data.labelIcon = value
    return this
  }

  /**
   * Set the noLabel property of the field.
   * @param value
   */
  noLabel (value?: FieldBase['noLabel']): this {
    if (value === undefined) value = true
    this.data.noLabel = value
    return this
  }

  /**
   * Set the hint property of the field.
   * @param value
   */
  hint (value: NonNullable<FieldBase['hint']>): this {
    this.data.hint = value
    return this
  }

  /**
   * Set the required property of the field.
   * @param value
   */
  required (value?: NonNullable<FieldBase['required']>): this {
    if (value === undefined) value = true
    this.data.required = value
    return this
  }

  /**
   * Set the visible property of the field.
   * @param value
   */
  visible (value?: FieldBase['visible']): this {
    if (value === undefined) value = true
    this.data.visible = value
    return this
  }

  /**
   * Set the readonly property of the field.
   * @param value
   */
  readonly (value?: FieldBase['readonly']): this {
    if (value === undefined) value = true
    this.data.readonly = value
    return this
  }

  /**
   * Set the disabled property of the field.
   * @param value
   */
  disabled (value?: FieldBase['disabled']): this {
    if (value === undefined) value = true
    this.data.disabled = value
    return this
  }

  /**
   * Set the validator property of the field.
   * @param value
   */
  validator(value: NonNullable<FieldBase['validator']>): this {
    this.data.validator = value
    return this
  }

  /**
   * Set the `validate` property of the field. This determines when the validation will take place.
   * Defaults to `onBlur`.
   * @param value
   */
  validateOn (value: NonNullable<FieldBase['validate']>): this {
    this.data.validate = value
    return this
  }

  /**
   * Set the onValidated property of the field.
   * @param value
   */
  onValidated (value: NonNullable<FieldBase['onValidated']>) : this {
    this.data.onValidated = value
    return this
  }

}
