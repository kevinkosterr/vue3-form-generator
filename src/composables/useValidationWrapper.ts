import { type ValidationTrigger } from '@/resources/types/generic'


/**
 * Use a provided validator function when the trigger of that validator matches
 * the validation method used for the current form or form field.
 * @param {Function} fn - validator function to execute upon meeting conditions
 * @param {ValidationTrigger} trigger - trigger for the validation, 'onBlur' or 'onChanged'
 * @param {string | undefined} fieldValidationMethod - validation method as set by the field schema, can be undefined.
 * @param {string | undefined} formValidationMethod - validation method as set by the form options, can be undefined.
 */
export function useValidationWrapper(
  fn: (...args: any[]) => void,
  trigger: ValidationTrigger,
  fieldValidationMethod: string | undefined,
  formValidationMethod: string | undefined
) {
  return (...args: any[]) => {
    if (fieldValidationMethod !== undefined) {
      return fieldValidationMethod === trigger ? fn(...args) : undefined
    }

    if (formValidationMethod !== undefined) {
      return formValidationMethod === trigger ? fn(...args) : undefined
    }

    return trigger === 'onBlur' ? fn(...args) : undefined
  }

}