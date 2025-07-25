import type { Field, FieldEmits } from '@/resources/types/field/fields'
import type { FormModel } from '@/resources/types/fieldAttributes'
import type { FormOptions, ValidationTrigger } from '@/resources/types/generic'
import { type Ref, type ComputedRef, type EmitFn, computed, ref } from 'vue'

import { isFunction, toUniqueArray, getValidator } from '@/helpers'
import { getMessage } from '@/validators/messages'
import { useValidationWrapper } from '@/composables/useValidationWrapper'
import { TValidatorFunction } from '@/resources/types/functions'

import validators from '@/validators'

/**
 * Composable for validation of the value(s) from a field.
 * Houses all the necessary logic for performing a validation and handles the emitted events.
 * @param model - model object from the form.
 * @param field - field schema object.
 * @param currentModelValue - current model value Ref.
 * @param formOptions
 * @param emits
 * @param isDisabled
 * @param isRequired
 * @param isReadOnly
 */
export function useValidation(
  model: FormModel,
  field: Field,
  currentModelValue: Ref<any>,
  formOptions: FormOptions,
  emits: EmitFn<FieldEmits>,
  isDisabled: boolean,
  isRequired: boolean,
  isReadOnly: boolean
) {

  const errors: Ref<string[]> = ref([])

  /**
   * The method of validation determined by this field.
   * Can be either 'onChanged', 'onBlur' or undefined.
   */
  const validationMethod: ComputedRef<ValidationTrigger | undefined> = computed(() => {
    return field.validate
  })

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
   * Emit the 'validated' event.
   * @param isValid - whether the field value is valid.
   * @param errors - errors found during validation.
   * @param field - field object.
   */
  const emitValidated = (isValid: boolean, errors: string[], field: Field): void => {
    emits('validated', isValid, errors, field)
  }

  /**
   * Validate the field against given validators, plus the validators that are put there by default.
   */
  const validate = async (): Promise<void> => {
    if (!('validator' in field)) {
      emitValidated(true, [], field)
      return
    }

    const results: string[] = []
    const fieldValidators: TValidatorFunction[] = [ ...defaultValidators.value ]

    if (Array.isArray(field.validator)) {
      field.validator.forEach((validator: any) => fieldValidators.push(getValidator(validator)))
    } else {
      fieldValidators.push(getValidator(field.validator))
    }

    fieldValidators.forEach((validator: TValidatorFunction): void => {
      const isValid: boolean = validator(currentModelValue.value, field, model)
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
    emitValidated(uniqueResults.length === 0, uniqueResults, field)
  }

  const onChanged = useValidationWrapper(validate, 'onChanged', validationMethod.value, formOptions.validate)
  const onBlur = useValidationWrapper(validate, 'onBlur', validationMethod.value, formOptions.validate)

  return {
    errors,
    validate,
    onChanged,
    onBlur
  }

}