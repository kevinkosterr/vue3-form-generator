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

export interface ISelectField extends IField {
  emptyText: string;
  multiple: boolean;
  options: IOption[]
}

export interface IPasswordField extends IField {
  indicator: boolean;
}

export type Field = IField | IRadioField | ISelectField | IPasswordField
export type FieldValue = number | string | number[] | string[]