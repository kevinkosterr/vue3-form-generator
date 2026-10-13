import { App, Component } from 'vue'
import type { FieldPluginOptions } from '@/resources/types/generic'

import FieldText from '@/fields/FieldText.vue'
import FieldPassword from '@/fields/FieldPassword.vue'
import FieldSelect from '@/fields/FieldSelect.vue'
import FieldSelectNative from '@/fields/FieldSelectNative.vue'
import FieldRadio from '@/fields/FieldRadio.vue'
import FieldColor from '@/fields/FieldColor.vue'
import FieldNumber from '@/fields/FieldNumber.vue'
import FieldSwitch from '@/fields/FieldSwitch.vue'
import FieldTextarea from '@/fields/FieldTextarea.vue'
import FieldMask from '@/fields/FieldMask.vue'
import FieldChecklist from '@/fields/FieldChecklist.vue'
import FieldCheckbox from '@/fields/FieldCheckbox.vue'
import FieldObject from '@/fields/FieldObject.vue'

import FieldSubmit from '@/fields/FieldSubmit.vue'
import FieldReset from '@/fields/FieldReset.vue'
import FieldButton from '@/fields/FieldButton.vue'


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
