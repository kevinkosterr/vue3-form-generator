import { FieldText, FieldCheckBox, FieldPassword, FieldSelect } from '@/fields/core'

export default function getFieldComponent (field) {
  return {
    'text': FieldText,
    'checkbox': FieldCheckBox,
    'password': FieldPassword,
    'select': FieldSelect
  }[field.type]
}