import { FieldText, FieldCheckBox, FieldPassword } from '@/fields/core'

export default function getFieldComponent (field) {
  return {
    'text': FieldText,
    'checkbox': FieldCheckBox,
    'password': FieldPassword
  }[field.type]
}