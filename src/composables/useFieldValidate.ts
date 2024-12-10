import { ref, Ref, computed, ComputedRef } from 'vue'
import { getMessage } from '@/validators/messages'
import { isFunction, isString, toUniqueArray } from '@/helpers'
import { TValidatorFunction } from '@/resources/types/functions'
import { ValidatorMap } from '@/resources/types/generic'
import { Field } from '@/resources/types/fields'
import validators from '@/validators'

/**
 * Get the corresponding validator function for a given string, or function. If a function is passed, the function is
 * assumed to be the validator to use and thus return. If no argument is passed, we'll just return a function that
 * will always return true, thus assuming the value is always valid.
 * @param validator
 */
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

export function useFieldValidate (
  model: Record<string, any>,
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

    errors.value = uniqueResults
    return uniqueResults
  }

  return { errors, validate }

}