import FieldText from './FieldText.vue'
import FieldCheckBox from './FieldCheckbox.vue'
import FieldPassword from "./FieldPassword.vue"
import FieldSelect from "./FieldSelect.vue"
import FieldSubmit from "./FieldSubmit.vue"
import FieldReset from './FieldReset.vue'
import FieldRadio from './FieldRadio.vue'
import FieldColor from './FieldColor.vue'

const coreFields = [
  FieldText,
  FieldCheckBox,
  FieldPassword,
  FieldSelect,
  FieldSubmit,
  FieldReset,
  FieldRadio,
  FieldColor
]

export default {
  install (app, options) {
    for (const fieldComponent of coreFields) {
      app.component(fieldComponent.name, fieldComponent)
    }
  }
}
