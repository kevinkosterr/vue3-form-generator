import type { FieldEmits } from '@/resources/types/field/fields'

export function useFieldEmits (): (keyof FieldEmits)[] {
  return [ 'onInput', 'validated' ]
}