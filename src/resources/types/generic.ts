import { TValidatorFunction } from '@/resources/types/functions'
import type { ComponentPublicInstance, Component, Ref } from 'vue'
import type { Field, FieldProps } from '@/resources/types/field/fields'
import { FormModel } from '@/resources/types/fieldAttributes'

export type ValidatorMap = Record<string, TValidatorFunction>

export type PluginComponentOption = {
  name: string;
  component: Component
}

export type PluginOptions = {
  aliases?: Record<string, string>;
  messages?: Record<string, string>;
  components?: PluginComponentOption[];
  excludedComponents?: string[];
}

export type FieldPluginOptions = {
  aliases?: PluginOptions['aliases'];
  excludedComponents?: PluginOptions['excludedComponents'];
}

export type FormGeneratorSchema = {
  model: FormModel;
  schema: {
    fields?: Field[];
    groups?: {
      legend: string;
      fields: Field[];
    }[]
  },
}

export type FormGroupProps = {
  formOptions?: FormOptions;
  model: FormModel;
  field: Field;
  errors?: string[];
}

export type FormGeneratorProps = {
  id?: string;
  idPrefix?: string;
  options?: FormOptions;
  schema: FormGeneratorSchema['schema'];
  model: FormGeneratorSchema['model'];
  enctype?: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'
}

export type FieldExposedValues = {
  // Whether the field is visible.
  isVisible: Ref<boolean>;
  // Errors occurred during validation of this field.
  errors: Ref<string[]>;
  // Hint displayed underneath the field.
  hint?: Ref<string | undefined>;
  // If true, the field component manages the label or doesn't have a label at all.
  noLabel?: boolean;
}

export type FieldComponent = ComponentPublicInstance<FieldProps, FieldExposedValues>

export type FormOptions = {
  idPrefix?: string;
}

export type FieldValidation = {
  fieldErrors: string[],
  field: Field
}

/** We're extending the HTMLElement interface to avoid TypeScript errors in directives  */
declare global {
  interface HTMLElement {
    clickOutsideEvent?: (event: Event) => void;
  }
}