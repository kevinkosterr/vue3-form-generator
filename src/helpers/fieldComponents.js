import { FieldText, FieldCheckBox, FieldPassword, FieldSelect, FieldSubmit } from '@/fields/core'

const fieldComponents = {
  'text': FieldText,
  'checkbox': FieldCheckBox,
  'password': FieldPassword,
  'select': FieldSelect,
  'submit': FieldSubmit
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
