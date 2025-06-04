import { TValidatorFunction } from '@/resources/types/functions'
import { Component } from 'vue'
import type { Field } from '@/resources/types/field/fields'
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

export type FormGeneratorProps = {
  id?: string;
  idPrefix?: string;
  options?: FormOptions;
  schema: FormGeneratorSchema['schema'];
  model: FormGeneratorSchema['model'];
  enctype?: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'
}

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