import type { Field } from '@/resources/types/field/fields'
import type { FieldBase } from '@/resources/types/field/base'

export interface IAbstractBaseBuilder<T extends Field = Field> {
  __data__ (): Partial<T>
  extend (properties: Record<string, any>): this
  build (): T
  model (key: string): this
  default (value: any): this
  getInitialValue (): any
}

/**
 * The base class for every builder. Contains the absolute basics for every field builder.
 */
export abstract class AbstractBaseBuilder<T extends Field = Field> implements IAbstractBaseBuilder<T> {
  protected __default__: any = null

  protected data: Partial<T> = {}

  protected constructor (type: string, name: string) {
    this.data = {
      type, name
    } as Partial<T>
  }

  __data__ (): Partial<T> { return this.data }

  /**
   * Gets the keys required for this field.
   * Should be overridden by child classes if they have additional required keys.
   *
   * @protected
   */
  protected getRequiredKeys (): (keyof T)[] {
    return [ 'type', 'model' ] as (keyof T)[]
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
   * Get the initial value of the field.
   */
  getInitialValue (): any {
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
  build (): T {
    const requiredKeys: (keyof T)[] = this.getRequiredKeys()
    const missingKeys: (keyof T)[] = requiredKeys.filter((key: keyof T) => {
      return !(key in this.data) && (this.data[key] === undefined || this.data[key] === null || this.data[key] === '')
    })

    if (missingKeys.length) {
      throw new Error(`Failed to build field. Missing required keys: ${missingKeys.join(', ')}`)
    }

    return this.data as T
  }

}

export interface IBaseFieldBuilder<T extends Field = Field> extends IAbstractBaseBuilder<T> {
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
export abstract class BaseFieldBuilder<T extends Field = Field> extends AbstractBaseBuilder<T> implements IBaseFieldBuilder<T> {

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
