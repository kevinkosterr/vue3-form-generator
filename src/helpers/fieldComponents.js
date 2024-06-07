import {FieldText, FieldCheckBox, FieldPassword, FieldSelect, FieldSubmit, FieldReset, FieldRadio} from '@/fields/core'

const fieldComponents = {
  'text': FieldText,
  'checkbox': FieldCheckBox,
  'password': FieldPassword,
  'select': FieldSelect,
  'submit': FieldSubmit,
  'reset': FieldReset,
  'radio': FieldRadio
}

function setFieldComponent (fieldType, component) {
  fieldComponents[fieldType] = component
}

export default function getFieldComponent (field) {
  return fieldComponents[field.type]
}

export {
  setFieldComponent,
}
