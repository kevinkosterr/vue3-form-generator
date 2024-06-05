import { FieldText, FieldCheckBox } from '@/fields/core'

export default function getFieldComponent (field) {
  return {
    'text': FieldText,
    'checkbox': FieldCheckBox,
  }[field.type]
}