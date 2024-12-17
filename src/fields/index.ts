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

import FieldSubmit from '@/fields/core/FieldSubmit.vue'
import FieldReset from '@/fields/core/FieldReset.vue'
import FieldButton from '@/fields/core/FieldButton.vue'


const fieldComponents: Component[] = [
  FieldColor, FieldText, FieldCheckBox, FieldPassword, FieldSelect, FieldSelectNative, FieldRadio,
  FieldNumber, FieldSubmit, FieldReset, FieldButton, FieldSwitch, FieldTextarea
]

export default {
  install (app: App, aliases: Record<string, string>) {
    for (const fieldComponent of fieldComponents) {
      let componentName

      if ('name' in fieldComponent) {
        componentName = fieldComponent.name
      } else {
        /** Composition API components */
        componentName = fieldComponent.__name
      }

      if (!componentName) throw new Error('Something went wrong')

      const alias = aliases[componentName]
      if (alias) {
        app.component(alias, fieldComponent)
      } else {
        app.component(componentName, fieldComponent)
      }
    }
  }
}
