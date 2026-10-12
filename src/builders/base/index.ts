import type { Component } from 'vue'
import type { Field } from '@/resources/types/field/fields'
import type { LabelIconDefinition } from '@/resources/types/field/base'
import type { FormModel } from '@/resources/types/fieldAttributes'
import type { ValidationTrigger } from '@/resources/types/generic'
import type {
  TDynamicAttributeBooleanFunction,
  TDynamicAttributeStringFunction,
  TOnValidatedFunction,
  TValidatorFunction
} from '@/resources/types/functions'
import { BuilderError } from '@/exceptions'

/**
 * A boolean, or a function receiving the model and field that returns a boolean.
 */
export type DynamicBoolean<M, F> = boolean | TDynamicAttributeBooleanFunction<M, F>

/**
 * Hints shown in build errors, telling the user how to set a missing required property.
 */
const REQUIRED_KEY_HINTS: Record<string, string> = {
  name: 'pass a name to the builder, or use it inside f.schema()',
  model: 'call .model(key), or use it inside f.schema()',
  mask: 'call .mask(pattern)',
  buttonText: 'call .buttonText(text)',
  schema: 'pass a schema to f.object()'
}

const isMissing = (value: unknown): boolean => value === undefined || value === null || value === ''

/**
 * The base class for every builder. Contains the absolute basics for every field builder.
 *
 * @typeParam F - Type of the field this builder builds.
 * @typeParam V - Type of the value this field adds to the model. `never` for fields without a value.
 * @typeParam M - Type of the form model, passed to callbacks.
 */
export abstract class AbstractBaseBuilder<F extends Field = Field, V = unknown, M extends object = FormModel> {
  /** Type-only brand holding the value type of this field. Does not exist at runtime. */
  declare readonly '~value': V

  /** @internal Whether this field adds a value to the model. */
  readonly emitsValue: boolean = true

  protected data: Partial<F>
  protected declare defaultValue: V

  protected constructor (type: string, name?: string) {
    this.data = { type } as Partial<F>
    if (name !== undefined) this.data.name = name
  }

  /**
   * Set a property of the field.
   * @param key - Name of the property.
   * @param value - Value of the property.
   */
  protected set<K extends keyof F> (key: K, value: F[K]): this {
    this.data[key] = value
    return this
  }

  /**
   * Gets the keys required for this field.
   * Should be overridden by child classes if they have additional required keys.
   */
  protected getRequiredKeys (): (keyof F)[] {
    const keys = [ 'type', 'name' ] as (keyof F)[]
    if (this.emitsValue) keys.push('model')
    if (this.data.type === 'input') keys.push('inputType' as keyof F)
    return keys
  }

  /** @internal Get the initial value of the field. */
  getDefaultValue (): V {
    return this.defaultValue
  }

  /**
   * @internal Create a copy of this builder, so changes to the copy don't affect the original.
   */
  clone (): this {
    const copy = Object.assign(Object.create(Object.getPrototypeOf(this)), this) as this
    copy.data = { ...this.data }
    return copy
  }

  /**
   * @internal Create a copy of this builder bound to a key of a schema. The key is used as model key,
   * and as name if no name was given.
   * @param key - Key of the field inside the schema.
   * @param defaultValue - Overrides the default value of the field, if defined.
   */
  bindTo (key: string, defaultValue?: unknown): this {
    if (this.emitsValue && this.data.model !== undefined && this.data.model !== key) {
      throw new BuilderError(
        `Model "${this.data.model}" conflicts with schema key "${key}". Remove .model(), the schema key is used instead.`
      )
    }
    const copy = this.clone()
    if (copy.data.name === undefined) copy.data.name = key
    if (copy.emitsValue) copy.data.model = key
    if (defaultValue !== undefined) copy.defaultValue = defaultValue as V
    return copy
  }

  /**
   * Set the model key of the field. Only needed when using the builder without `f.schema()`,
   * since the schema uses the key of each field as its model key.
   * @param key
   */
  model (key: string): this {
    return this.set('model', key)
  }

  /**
   * Set the initial value of the field.
   */
  default (value: V): this {
    this.defaultValue = value
    return this
  }

  /**
   * Set the id property of the field.
   * @param value
   */
  id (value: string): this {
    return this.set('id', value)
  }

  /**
   * Set the visible property of the field.
   * @param value - Defaults to `true`.
   */
  visible (value: DynamicBoolean<M, F> = true): this {
    return this.set('visible', value as F['visible'])
  }

  /**
   * Hide the field. Shorthand for `.visible(false)`.
   */
  hidden (): this {
    return this.visible(false)
  }

  /**
   * Set the disabled property of the field.
   * @param value - Defaults to `true`.
   */
  disabled (value: DynamicBoolean<M, F> = true): this {
    return this.set('disabled', value as F['disabled'])
  }

  /**
   * Extend the current field with additional properties.
   * @param properties
   */
  extend (properties: Partial<F> & Record<string, unknown>): this {
    Object.assign(this.data, properties)
    return this
  }

  /**
   * Build and validate the field object.
   * Ensures all required properties are present.
   */
  build (): F {
    const missingKeys = this.getRequiredKeys().filter(key => isMissing(this.data[key]))
    if (missingKeys.length) {
      const missing = missingKeys.map(key => {
        const hint = REQUIRED_KEY_HINTS[key as string]
        return hint ? `"${String(key)}" (${hint})` : `"${String(key)}"`
      })
      throw new BuilderError(`Failed to build ${this.data.type} field, missing required ${missing.join(', ')}.`)
    }

    const field: Record<string, unknown> = {}
    for (const [ key, value ] of Object.entries(this.data)) {
      field[key] = Array.isArray(value) ? [ ...value ] : value
    }
    return field as F
  }

}

/**
 * Base class for most FieldBuilder classes.
 */
export abstract class BaseFieldBuilder<F extends Field = Field, V = unknown, M extends object = FormModel>
  extends AbstractBaseBuilder<F, V, M>
{

  /**
   * Set the label property of the field.
   * @param value
   */
  label (value: string): this {
    return this.set('label', value)
  }

  /**
   * Set the labelIcon property of the field.
   * @param icon - Icon class name(s) or component.
   * @param position - Position of the icon relative to the label.
   */
  labelIcon (icon: string | Component | LabelIconDefinition, position?: LabelIconDefinition['position']): this {
    if (position !== undefined && (typeof icon === 'string' || !('icon' in icon))) {
      return this.set('labelIcon', { icon, position })
    }
    return this.set('labelIcon', icon)
  }

  /**
   * Set the noLabel property of the field.
   * @param value - Defaults to `true`.
   */
  noLabel (value: boolean = true): this {
    return this.set('noLabel', value)
  }

  /**
   * Set the hint property of the field.
   * @param value
   */
  hint (value: string | TDynamicAttributeStringFunction<M, F>): this {
    return this.set('hint', value as F['hint'])
  }

  /**
   * Set the required property of the field.
   * @param value - Defaults to `true`.
   */
  required (value: DynamicBoolean<M, F> = true): this {
    return this.set('required', value as F['required'])
  }

  /**
   * Set the readonly property of the field.
   * @param value - Defaults to `true`.
   */
  readonly (value: DynamicBoolean<M, F> = true): this {
    return this.set('readonly', value as F['readonly'])
  }

  /**
   * Add one or more validators to the field. Can be called multiple times, validators are appended.
   * @param validators
   */
  validator (...validators: TValidatorFunction<V, F, M>[]): this {
    const current = this.data.validator
    const all = [ ...(current === undefined ? [] : Array.isArray(current) ? current : [ current ]), ...validators ]
    return this.set('validator', (all.length === 1 ? all[0] : all) as F['validator'])
  }

  /**
   * Set the `validate` property of the field. This determines when the validation will take place.
   * Defaults to `onBlur`.
   * @param value
   */
  validateOn (value: ValidationTrigger): this {
    return this.set('validate', value)
  }

  /**
   * Set the onValidated property of the field.
   * @param value
   */
  onValidated (value: TOnValidatedFunction<M, F>): this {
    return this.set('onValidated', value as F['onValidated'])
  }

}
