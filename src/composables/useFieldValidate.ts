import { ref, Ref, computed, ComputedRef } from 'vue'
import { getMessage } from '@/validators/messages'
import { isFunction, toUniqueArray, getValidator } from '@/helpers'
import { TValidatorFunction } from '@/resources/types/functions'
import type { FormModel } from '@/resources/types/fieldAttributes'
import type { Field } from '@/resources/types/field/fields'
import validators from '@/validators'

/**
 * @deprecated will be removed in 3.0.0, use `useValidation` instead.
 */
export function useFieldValidate (
  model: FormModel,
  field: Field,
  isDisabled: boolean = false,
  isRequired: boolean = false,
  isReadOnly: boolean = false
) {

  const errors: Ref<string[]> = ref([])

  /**
   * Compute all validators that should be present by default.
   */
  const defaultValidators: ComputedRef<TValidatorFunction[]> = computed(() => {
    const fieldValidators: TValidatorFunction[] = []
    if (!isDisabled && !isReadOnly) {
      if (isRequired && !fieldValidators.includes(validators.required)) {
        fieldValidators.push(validators.required)
      }

      if ('min' in field && field.min) {
        fieldValidators.push(validators.min)
      }

      if ('max' in field && field.max) {
        fieldValidators.push(validators.max)
      }
    }
    return fieldValidators
  })

  /**
   * Validate the field against given validators, plus the validators that are put there by default.
   */
  const validate = async (currentModelValue: any): Promise<string[]> => {
    if (!('validator' in field)) return []

    const results: string[] = []
    const fieldValidators: TValidatorFunction[] = [ ...defaultValidators.value ]

    if (Array.isArray(field.validator)) {
      field.validator.forEach((validator: any) => fieldValidators.push(getValidator(validator)))
    } else {
      fieldValidators.push(getValidator(field.validator))
    }

    fieldValidators.forEach((validator: TValidatorFunction): void => {
      const isValid: boolean = validator(currentModelValue, field, model)
      if (!isValid) results.push(getMessage(validator.name))
    })

    const uniqueResults = toUniqueArray(results)

    if ('onValidated' in field && field.onValidated) {
      if (isFunction(field.onValidated)) {
        field.onValidated.call(null, model, uniqueResults, field)
      } else {
        throw new Error('onValidated property must be of type `function` on field: ' + field.name)
      }
    }

    errors.value = uniqueResults
    return uniqueResults
  }

  return { errors, validate }

}