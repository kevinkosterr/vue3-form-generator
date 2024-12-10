import { App } from 'vue'
import { PluginOptions } from '@/resources/types/generic'

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

    app.use(FormGeneratorFields, options.aliases ?? {})
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
