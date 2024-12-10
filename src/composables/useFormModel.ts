import { computed, ComputedRef } from 'vue'
import { Field } from '@/resources/types/fields'

/**
 * Composable for current model state of current field
 * @param model - form schema model
 * @param field - form field
 */
export function useFormModel(
  model: Record<string, never>,
  field: Field
) {

  const currentModelValue: ComputedRef<any> = computed((): unknown => {
    return 'model' in field ? model[field.model] : undefined
  })

  return { currentModelValue }

}