import { App } from 'vue'
import type { FieldPluginOptions, PluginOptions } from '@/resources/types/generic'
import type { FieldProps, FieldPropRefs, FieldEmits } from '@/resources/types/field/fields'
import type { FieldBase } from '@/resources/types/field/base'
import type { FieldOption, FormModel } from '@/resources/types/fieldAttributes'
import type {
  TDynamicAttributeBooleanFunction,
  TDynamicAttributeStringFunction,
  TValidatorFunction,
  TOnValidatedFunction
} from '@/resources/types/functions'
import type {
  ValidationTrigger,
  FormGeneratorSchema,
  FieldExposedValues,
  FieldComponent,
  FormOptions,
  FieldValidation
} from '@/resources/types/generic'

import { setMessages } from '@/validators/messages'
import { isObject } from '@/helpers'
import {
  useFieldValidate,
  useFormModel,
  useFieldAttributes,
  useValidation,
  useFieldEmits,
  useFieldProps,
  useLabelIcon
} from '@/composables'

import FormGenerator from '@/FormGenerator.vue'
import FormGeneratorFields from '@/fields'
import FormLabel from '@/components/FormLabel.vue'

import validators from '@/validators'

const VueFormGenerator = {
  install (app: App, options: PluginOptions) {
    if (!options) options = {}

    const fieldOptions: FieldPluginOptions = {
      aliases: options.aliases, excludedComponents: options.excludedComponents
    }
    app.use(FormGeneratorFields, fieldOptions)
    app.component('VueFormGenerator', FormGenerator)

    if (options.messages !== undefined && isObject(options.messages)) {
      setMessages(options.messages)
    }

    if (Array.isArray(options.components)) {
      options.components.forEach(({ name, component }) => {
        app.component(name, component)
      })
    }
  }
}

export default VueFormGenerator
export {
  useFieldProps,
  useFormModel,
  useFieldEmits,
  useFieldAttributes,
  useFieldValidate,
  useLabelIcon,
  useValidation,
  FormLabel,
  validators
}

export { BuilderError } from '@/exceptions'
export {
  f,
  type BuilderFactory,
  schema,
  text,
  password,
  number,
  color,
  textarea,
  mask,
  checkbox,
  switch,
  checklist,
  radio,
  select,
  selectNative,
  object,
  button,
  submit,
  reset,
  typed
} from '@/builders/index'
export {
  SchemaBuilder,
  type SchemaEntries,
  type SchemaModel,
  type BuiltSchemaField,
  type InferModel,
  type InferField,
  type ValidateEntries
} from '@/builders/schema'
export { default as GroupBuilder } from '@/builders/group'
export { AbstractBaseBuilder, BaseFieldBuilder, type DynamicBoolean } from '@/builders/base'
export { default as BaseInputBuilder } from '@/builders/base/BaseInput'
export {
  default as BaseOptionFieldBuilder,
  type OptionsInput,
  type OptionValue,
  type OptionValues
} from '@/builders/base/BaseOption'
export { default as BaseSelectBuilder, type SelectValue } from '@/builders/base/BaseSelect'
export { default as BaseButtonBuilder } from '@/builders/base/BaseButton'
export { default as TextFieldBuilder } from '@/builders/fields/TextFieldBuilder'
export { default as PasswordFieldBuilder } from '@/builders/fields/PasswordFieldBuilder'
export { default as NumberFieldBuilder } from '@/builders/fields/NumberFieldBuilder'
export { default as ColorFieldBuilder } from '@/builders/fields/ColorFieldBuilder'
export { default as TextareaFieldBuilder } from '@/builders/fields/TextareaFieldBuilder'
export { default as MaskFieldBuilder } from '@/builders/fields/MaskFieldBuilder'
export { default as CheckboxFieldBuilder } from '@/builders/fields/CheckboxFieldBuilder'
export { default as SwitchFieldBuilder } from '@/builders/fields/SwitchFieldBuilder'
export { default as ChecklistFieldBuilder } from '@/builders/fields/ChecklistFieldBuilder'
export { default as RadioFieldBuilder } from '@/builders/fields/RadioFieldBuilder'
export { default as SelectFieldBuilder } from '@/builders/fields/SelectFieldBuilder'
export { default as SelectNativeFieldBuilder } from '@/builders/fields/SelectNativeFieldBuilder'
export { default as ObjectFieldBuilder } from '@/builders/fields/ObjectFieldBuilder'
export { default as ButtonFieldBuilder } from '@/builders/fields/ButtonFieldBuilder'
export { default as SubmitFieldBuilder } from '@/builders/fields/SubmitFieldBuilder'
export { default as ResetFieldBuilder } from '@/builders/fields/ResetFieldBuilder'

export type {
  FieldProps,
  FieldEmits,
  FieldPropRefs,
  FieldPluginOptions,
  PluginOptions,
  FieldBase,
  FieldOption,
  FormModel,
  TDynamicAttributeBooleanFunction,
  TDynamicAttributeStringFunction,
  TValidatorFunction,
  TOnValidatedFunction,
  ValidationTrigger,
  FormGeneratorSchema,
  FieldExposedValues,
  FieldComponent,
  FormOptions,
  FieldValidation
}
