import type { FieldOption, FormModel } from '@/resources/types/fieldAttributes'
import type { FieldMinMax, FieldBase, OptionField, PlaceholderField } from '@/resources/types/field/base'
import type { Ref } from 'vue'
import { FormGeneratorSchema, FormOptions } from '@/resources/types/generic'

export type NumberField = FieldBase & FieldMinMax & {
  type: 'number';
  placeholder: string;
  step?: number;
}

export type TextField = FieldBase & FieldMinMax & {
  type: 'text';
  placeholder?: string;
  autocomplete?: boolean;
}

export type CheckboxField = FieldBase & {
  type: 'checkbox';
}

export type ColorField = FieldBase & {
  type: 'color';
  withInput?: boolean;
}

export type RadioField = FieldBase & {
  type: 'radio';
  options: FieldOption[];
}

export type ChecklistField = FieldBase & OptionField & {
  type: 'checklist';
}

export type SelectField = FieldBase & OptionField & PlaceholderField & {
  type: 'select';
  multiple?: boolean;
}

export type SelectNativeField = FieldBase & OptionField & {
  type: 'select-native';
  multiple?: boolean;
  placeholder?: string;
}

export type MaskField = FieldBase & PlaceholderField & {
  type: 'mask',
  mask: string;
  maskOptions?: {
    eager?: boolean;
    tokens?: Record<string, { pattern: RegExp, uppercase: boolean }>;
    unmasked?: boolean;
  };
}

export type ObjectField = FieldBase & {
  type: 'object';
  model: string;
  schema: FormGeneratorSchema['schema'];
}

export type PasswordField = FieldBase & FieldMinMax & {
  type: 'password';
  placeholder?: string;
  indicator?: boolean;
}

export type ButtonFieldBase = FieldBase & {
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

export type SwitchField = FieldBase & {
  type: 'switch';
}

export type ResetField = ButtonFieldBase & {
  type: 'reset';
}

export type TextAreaField = FieldBase & PlaceholderField & {
  type: 'textarea';
  maxLength?: string;
  resizable?: boolean;
}

export type Field = TextField | RadioField | ChecklistField | SelectField | MaskField | PasswordField | ButtonField |
  NumberField | ColorField | CheckboxField | ObjectField | ResetField | SelectNativeField | SubmitField | SwitchField |
  TextAreaField
export type FieldValue = number | string | number[] | string[] | boolean | boolean[]

export interface FieldPropRefs<T extends Field=Field> {
  field: Ref<T>,
  model: Ref<FormModel>
}

export type FieldEmits = {
  validated: [isValid: boolean, errors: string[], field: Field];
  onInput: [value: FieldValue];
}

export interface FieldProps<T extends Field=Field> {
  id: string;
  formGenerator?: object;
  formOptions: FormOptions;
  field: T;
  model: Record<string, unknown>;
}
