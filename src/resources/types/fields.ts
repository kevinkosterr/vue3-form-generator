import {
  TDynamicAttributeBooleanFunction,
  TDynamicAttributeStringFunction, TOnValidatedFunction,
  TValidatorFunction
} from '@/resources/types/functions'

import { IOption } from '@/resources/types/fieldAttributes'

export interface IField {
  id?: string;
  name: string;
  model: string;
  label?: string;
  type: string;
  inputType?: string;
  visible?: boolean | TDynamicAttributeBooleanFunction;
  required?: boolean | TDynamicAttributeBooleanFunction;
  readonly?: boolean | TDynamicAttributeBooleanFunction;
  disabled?: boolean | TDynamicAttributeBooleanFunction;
  hint?: string | TDynamicAttributeStringFunction;
  validator?: TValidatorFunction | TValidatorFunction[],
  onValidated?: TOnValidatedFunction
  min?: number;
  max?: number;
}

export interface IRadioField extends IField {
  options: IOption[]
}

export interface ITextField extends IField {
  placeholder: string;
}

export interface ISelectField extends ITextField {
  emptyText: string;
  multiple: boolean;
  options: IOption[]
}

export interface IMaskField extends ITextField {
  mask: string;
  maskOptions?: {
    eager?: boolean;
    tokens?: Record<string, { pattern: RegExp, uppercase: boolean }>;
    unmasked?: boolean;
  };
}

export interface IPasswordField extends ITextField {
  indicator: boolean;
}

export interface IButtonFieldBase {
  buttonText: string;
  type: string;
}

export interface IButtonField extends IButtonFieldBase {
  onClick?: () => void;
}

export type Field = IField | IRadioField | ISelectField | IPasswordField | IButtonField | ITextField | IMaskField
export type FieldValue = number | string | number[] | string[]

export interface FieldProps<T extends Field=Field> {
  id: string;
  formGenerator: object;
  field: T;
  model: Record<string, unknown>;
}