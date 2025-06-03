import { computed, ComputedRef } from 'vue'
import type { Field } from '@/resources/types/field/fields'
import { TDynamicAttributeBooleanFunction, TDynamicAttributeStringFunction } from '@/resources/types/functions'
import type { FormModel } from '@/resources/types/fieldAttributes'

export function useFieldAttributes (
  model: FormModel,
  field: Field
) {

  /**
   * Determine the boolean value of an attribute by calling the provided method, or simply returning the set boolean
   * value.
   */
  function determineDynamicBooleanAttribute(attribute: string, defaultValue: boolean = false): boolean {
    const attributeValue = field[(attribute as keyof Field)]

    if (typeof attributeValue === 'function') {
      return (attributeValue as TDynamicAttributeBooleanFunction)(model, field)
    }

    return typeof attributeValue !== 'boolean' ? defaultValue : attributeValue
  }

  /**
   * Determine the string value of an attribute by calling the provided method, or simply returning the set string
   * value.
   */
  function determineDynamicStringAttribute(attribute: string, defaultValue: string = ''): string {
    const attributeValue = field[(attribute as keyof Field)]

    if (typeof attributeValue === 'function') {
      return (attributeValue as TDynamicAttributeStringFunction)(model, field)
    }

    return typeof attributeValue !== 'string' ? defaultValue : attributeValue
  }

  /**
   * Compute the disabled state of the field/input component. `this.field.disabled` must be set for this to work,
   * otherwise this will always return false.
   *
   * You can pass a method to the `disabled` property of a field to apply the disabled state conditionally.
   * The method will be passed the entire model, the current field instance and the field component.
   */
  const isDisabled: ComputedRef<boolean> = computed((): boolean => {
    return determineDynamicBooleanAttribute('disabled')
  })

  /**
   * Compute the required state of the field/input component. `this.field.required` must be set for this to work,
   * otherwise this will always return false.
   *
   * You can pass a method to the `required` property of a field to apply the required state conditionally.
   * The method will be passed the entire model, the current field instance and the field component.
   */
  const isRequired: ComputedRef<boolean> = computed((): boolean => {
    return determineDynamicBooleanAttribute('required')
  })

  /**
   * Compute the readonly state of the field/input component. `this.field.readonly` must be set for this to work,
   * otherwise this will always return false.
   *
   * You can pass a method to the `required` property of a field to apply the readonly state conditionally.
   * The method will be passed the entire model, the current field instance and the field component.
   */
  const isReadonly: ComputedRef<boolean> = computed((): boolean => {
    return determineDynamicBooleanAttribute('readonly')
  })

  /**
   * Compute the state of visibility of the field/input component. `this.field.visible` must be set for this to work,
   * otherwise this will always return true.
   */
  const isVisible: ComputedRef<boolean> = computed((): boolean => {
    return determineDynamicBooleanAttribute('visible', true)
  })

  /**
   * Compute the hint to be displayed underneath the field input element.
   * Should return a string value.
   */
  const hint: ComputedRef<string> = computed((): string => {
    return determineDynamicStringAttribute('hint', '')
  })

  return {
    hint,
    isVisible,
    isDisabled,
    isRequired,
    isReadonly
  }

}
