import type { FieldOption, FormModel } from '@/resources/types/fieldAttributes'
import type { FieldMinMax, FieldBase, InputField, OptionField, PlaceholderField } from '@/resources/types/field/base'
import type { Ref } from 'vue'
import { FormGeneratorSchema, FormOptions } from '@/resources/types/generic'

export type NumberField = FieldBase & InputField & FieldMinMax & {
  inputType: 'number';
  placeholder: string;
  step?: number;
}

export type TextField = FieldBase & InputField & FieldMinMax & {
  inputType: 'text';
  placeholder?: string;
  autocomplete?: boolean;
}

export type CheckboxField = FieldBase & InputField & {
  inputType: 'checkbox';
}

export type ColorField = FieldBase & InputField & {
  inputType: 'color';
  withInput?: boolean;
}

export type RadioField = FieldBase & InputField & {
  inputType: 'radio';
  options: FieldOption[];
}

export type ChecklistField = FieldBase & OptionField & {
  type: 'checklist';
  inputType: undefined;
}

export type SelectField = FieldBase & OptionField & PlaceholderField & {
  type: 'select';
  inputType: undefined;
  multiple?: boolean;
}

export type SelectNativeField = FieldBase & OptionField & {
  type: 'select-native';
  inputType: undefined;
  multiple?: boolean;
  placeholder?: string;
}

export type MaskField = FieldBase & PlaceholderField & {
  type: 'mask',
  inputType: undefined;
  mask: string;
  maskOptions?: {
    eager?: boolean;
    tokens?: Record<string, { pattern: RegExp, uppercase: boolean }>;
    unmasked?: boolean;
  };
}

export type ObjectField = FieldBase & {
  type: 'object';
  inputType: undefined;
  model: string;
  schema: FormGeneratorSchema['schema'];
}

export type PasswordField = FieldBase & InputField & FieldMinMax & {
  inputType: 'password';
  placeholder?: string;
  indicator?: boolean;
}

export type ButtonFieldBase = FieldBase & {
  inputType: undefined;
  buttonText: string;
  buttonClasses?: string;
}

export type SubmitField = ButtonFieldBase & {
  type: 'submit';
}

export type ButtonField = ButtonFieldBase & {
  type: 'button';
  onClick?: (model: FormModel, field: Field) => void;
}

export type SwitchField = FieldBase

export type ResetField = ButtonFieldBase & {
  type: 'reset';
}

export type TextAreaField = FieldBase & PlaceholderField & {
  maxLength?: string;
  resizable?: boolean;
}

export type Field = TextField | RadioField | ChecklistField | SelectField | MaskField | PasswordField | ButtonField |
  NumberField | ColorField | CheckboxField | ObjectField | ResetField | SelectNativeField | SubmitField | SwitchField |
  TextAreaField
export type FieldValue = number | string | number[] | string[]

export interface FieldPropRefs<T extends Field=Field> {
  field: Ref<T>,
  model: Ref<FormModel>
}

export interface FieldProps<T extends Field=Field> {
  id: string;
  formGenerator?: object;
  formOptions?: FormOptions;
  field: T;
  model: Record<string, unknown>;
}
