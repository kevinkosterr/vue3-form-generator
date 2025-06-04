import { App, Component } from 'vue'
import type { FieldPluginOptions } from '@/resources/types/generic'

import FieldText from '@/fields/core/FieldText.vue'
import FieldPassword from '@/fields/core/FieldPassword.vue'
import FieldSelect from '@/fields/core/FieldSelect.vue'
import FieldSelectNative from '@/fields/core/FieldSelectNative.vue'
import FieldRadio from '@/fields/core/FieldRadio.vue'
import FieldColor from '@/fields/core/FieldColor.vue'
import FieldNumber from '@/fields/core/FieldNumber.vue'
import FieldSwitch from '@/fields/core/FieldSwitch.vue'
import FieldTextarea from '@/fields/core/FieldTextarea.vue'
import FieldMask from '@/fields/core/FieldMask.vue'
import FieldChecklist from '@/fields/core/FieldChecklist.vue'
import FieldCheckbox from '@/fields/core/FieldCheckbox.vue'
import FieldObject from '@/fields/core/FieldObject.vue'

import FieldSubmit from '@/fields/core/FieldSubmit.vue'
import FieldReset from '@/fields/core/FieldReset.vue'
import FieldButton from '@/fields/core/FieldButton.vue'


const fieldComponents = {
  FieldColor, FieldText, FieldPassword, FieldSelect, FieldSelectNative, FieldRadio, FieldNumber, FieldSubmit,
  FieldReset, FieldButton, FieldSwitch, FieldTextarea, FieldMask, FieldChecklist, FieldCheckbox, FieldObject
} as const

type FieldComponentNames = keyof typeof fieldComponents

export default {
  install (app: App, options: FieldPluginOptions) {
    const componentEntries = Object.entries(fieldComponents) as [FieldComponentNames, Component][]
    const isExcluded = (componentName: string) => options.excludedComponents ? options.excludedComponents.includes(componentName) : false

    for (const [ name, component ] of componentEntries) {
      if (!isExcluded(name)) {
        const alias: string | undefined = options.aliases ? options.aliases[name] : undefined
        app.component(alias ?? name, component)
      }
    }
  }
}
