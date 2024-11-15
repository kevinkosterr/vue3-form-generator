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


const fieldComponents = [
  FieldColor, FieldText, FieldCheckBox, FieldPassword, FieldSelect, FieldSelectNative, FieldRadio,
  FieldNumber, FieldSubmit, FieldReset, FieldButton, FieldSwitch, FieldTextarea
]

export default {
  install (app, aliases) {
    for (const fieldComponent of fieldComponents) {
      const alias = aliases[fieldComponent.name]
      if (alias) {
        app.component(alias, fieldComponent)
      } else {
        let componentName
        if ('name' in fieldComponent) {
          componentName = fieldComponent.name
        } else {
          /** Composition API components */
          componentName = fieldComponent.__name
        }
        app.component(componentName, fieldComponent)
      }
    }
  }
}
