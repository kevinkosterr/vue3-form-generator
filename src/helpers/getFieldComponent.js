import { FieldText, FieldCheckBox, FieldPassword, FieldSelect, FieldSubmit } from '@/fields/core'

export default function getFieldComponent (field) {
  return {
    'text': FieldText,
    'checkbox': FieldCheckBox,
    'password': FieldPassword,
    'select': FieldSelect,
    'submit': FieldSubmit
  }[field.type]
}