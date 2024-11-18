import { App, Component } from 'vue'

import FieldText from '@/fields/input/FieldText.vue'
import FieldCheckBox from '@/fields/input/FieldCheckbox.vue'
import FieldPassword from '@/fields/input/FieldPassword.vue'
import FieldSelectNative from '@/fields/input/FieldSelectNative.vue'
import FieldSelect from '@/fields/input/FieldSelect.vue'
import FieldRadio from '@/fields/input/FieldRadio.vue'
import FieldColor from '@/fields/input/FieldColor.vue'
import FieldNumber from '@/fields/input/FieldNumber.vue'
import FieldSwitch from '@/fields/input/FieldSwitch.vue'
import FieldTextarea from '@/fields/input/FieldTextarea.vue'

import FieldSubmit from '@/fields/buttons/FieldSubmit.vue'
import FieldReset from '@/fields/buttons/FieldReset.vue'
import FieldButton from '@/fields/buttons/FieldButton.vue'


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
