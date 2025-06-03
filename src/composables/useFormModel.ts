import { computed, ComputedRef } from 'vue'
import type { Field } from '@/resources/types/field/fields'
import type { FormModel } from '@/resources/types/fieldAttributes'

/**
 * Composable for current model state of current field
 * @param model - form schema model
 * @param field - form field
 */
export function useFormModel(
  model: FormModel,
  field: Field
) {

  const currentModelValue: ComputedRef<any> = computed((): unknown => {
    return 'model' in field ? model[field.model] : undefined
  })

  return { currentModelValue }

}