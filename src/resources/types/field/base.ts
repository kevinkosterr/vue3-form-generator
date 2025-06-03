import type {
  TDynamicAttributeBooleanFunction,
  TDynamicAttributeStringFunction,
  TOnValidatedFunction,
  TValidatorFunction
} from '@/resources/types/functions'
import type { FieldOption } from '@/resources/types/fieldAttributes'

/**
 * The base of every field type.
 */
export type FieldBase = {
  id?: string;
  name: string;
  model: string;
  label?: string;
  type: string;
  visible?: boolean | TDynamicAttributeBooleanFunction;
  required?: boolean | TDynamicAttributeBooleanFunction;
  readonly?: boolean | TDynamicAttributeBooleanFunction;
  disabled?: boolean | TDynamicAttributeBooleanFunction;
  hint?: string | TDynamicAttributeStringFunction;
  validator?: TValidatorFunction | TValidatorFunction[],
  onValidated?: TOnValidatedFunction
}

/**
 * A type based on FieldMinMax uses the `min` and `max` properties.
 */
export type FieldMinMax = {
  min?: number;
  max?: number;
}

/**
 * A type based on OptionField has the `options` property.
 */
export type OptionField = {
  options: FieldOption[]
}

/**
 * A type based on InputField has the `type: 'input'` and an `inputType` property.
 */
export type InputField = {
  type: 'input';
  inputType: string;
}

/**
 * A type based on PlaceholderField has the `placeholder` property.
 */
export type PlaceholderField = {
  placeholder?: string;
}