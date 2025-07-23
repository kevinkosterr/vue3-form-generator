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
  useFieldEmits,
  useFieldProps
} from '@/composables'

import FormGenerator from '@/FormGenerator.vue'
import FormGeneratorFields from '@/fields'
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
  validators
}

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
