import { App, Component } from 'vue'

import FieldText from '@/fields/core/FieldText.vue'
import FieldCheckBox from '@/fields/core/FieldCheckbox.vue'
import FieldPassword from '@/fields/core/FieldPassword.vue'
import FieldSelect from '@/fields/core/FieldSelect.vue'
import FieldSelectNative from '@/fields/core/FieldSelectNative.vue'
import FieldRadio from '@/fields/core/FieldRadio.vue'
import FieldColor from '@/fields/core/FieldColor.vue'
import FieldNumber from '@/fields/core/FieldNumber.vue'
import FieldSwitch from '@/fields/core/FieldSwitch.vue'
import FieldTextarea from '@/fields/core/FieldTextarea.vue'
import FieldMask from '@/fields/core/FieldMask.vue'

import FieldSubmit from '@/fields/core/FieldSubmit.vue'
import FieldReset from '@/fields/core/FieldReset.vue'
import FieldButton from '@/fields/core/FieldButton.vue'


const fieldComponents = {
  FieldColor, FieldText, FieldCheckBox, FieldPassword, FieldSelect, FieldSelectNative, FieldRadio,
  FieldNumber, FieldSubmit, FieldReset, FieldButton, FieldSwitch, FieldTextarea, FieldMask
]
} as const

type FieldComponentNames = keyof typeof fieldComponents

export default {
  install (app: App, aliases: Partial<Record<FieldComponentNames, string>>) {
    const componentEntries = Object.entries(fieldComponents) as [FieldComponentNames, Component][]

    for (const [ name, component ] of componentEntries) {
      const alias: string | undefined = aliases[name]
      app.component(alias ?? name, component)
    }
  }
}
