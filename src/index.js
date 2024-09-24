import { setMessages } from '@/validators/messages.js'
import { isObject } from '@/helpers'
import { abstractField } from '@/mixins'

import FormGenerator from '@/FormGenerator.vue'
import FormGeneratorFields from '@/fields'
import validators from '@/validators'

const VueFormGenerator = {
  install (app, options) {
    if (!options) options = {}

    app.use(FormGeneratorFields, options.aliases ?? {})
    app.component('VueFormGenerator', FormGenerator)

    if (isObject(options.messages)) {
      setMessages(options.messages)
    }

    if (Array.isArray(options.components)) {
      options.components.forEach(({ name, component }) => {
        app.component(name, component)
      })
    }
  },
  validators
}

export default VueFormGenerator
export {
  abstractField
}
