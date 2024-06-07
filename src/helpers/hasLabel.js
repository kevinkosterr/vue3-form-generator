export default function hasLabel(field) {
  if (!field.label) return false

  switch (field.type) {
    case 'button':
    case 'submit':
    case 'reset':
      return false
    default:
      return true
  }
}