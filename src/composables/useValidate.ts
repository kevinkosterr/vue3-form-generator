import { ref, Ref, computed, ComputedRef } from 'vue'
import { getMessage } from '@/validators/messages'
import { isFunction, isString } from '@/helpers'
import { TValidatorFunction } from '@/resources/types/functions'
import { ValidatorMap } from '@/resources/types/generic'
import { Field } from '@/resources/types/fields'
import validators from '@/validators'

function getValidator (validator: string | TValidatorFunction | undefined): TValidatorFunction {
  if (validator === undefined) return (): boolean => true

  if (isFunction(validator)) return <TValidatorFunction>validator

  if (isString(validator)) {
    if ((validators as ValidatorMap)[<string>validator] === undefined) {
      throw new Error('Invalid validator: ' + validator)
    }
    return (validators as ValidatorMap)[<string>validator]
  }
  return (): boolean => true
}

export function useValidate (
  model: Record<string, never>,
  field: Field,
  isDisabled: boolean = false,
  isRequired: boolean = false,
  isReadOnly: boolean = false,
  currentModelValue: ComputedRef<never>
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

      if (field.min) {
        fieldValidators.push(validators.min)
      }

      if (field.max) {
        fieldValidators.push(validators.max)
      }
    }
    return fieldValidators
  })

  /**
   * Validate the field against given validators, plus the validators that are put there by default.
   */
  const validate = async (): Promise<string[]> => {
    const results: string[] = []
    const fieldValidators: TValidatorFunction[] = [ ...defaultValidators.value ]

    if (Array.isArray(field.validator)) {
      field.validator.forEach(validator => fieldValidators.push(getValidator(validator)))
    } else {
      fieldValidators.push(getValidator(field.validator))
    }

    fieldValidators.forEach((validator: TValidatorFunction): void => {
      const isValid: boolean = validator(currentModelValue.value, field, model)
      if (!isValid) results.push(getMessage(validator.name))
    })

    errors.value = results
    return results
  }

  return { errors, validate }

}