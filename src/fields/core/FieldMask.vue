<template>
  <input
    v-maska:unmaskedValue.unmasked="maskOptions"
    :value="inputDefaultValue"
    :disabled="isDisabled"
    :required="isRequired"
    :type="inputType"
    :placeholder="field.placeholder"
    @input="onFieldValueChanged"
    @blur="onBlur"
  >
</template>

<script setup lang="ts">
import { toRefs, computed, ComputedRef, ref, onBeforeMount } from 'vue'
import type { FieldEmits, FieldPropRefs, FieldProps, MaskField } from '@/resources/types/field/fields'
import type { MaskInputOptions } from 'maska'
import { Mask } from 'maska'
import { vMaska } from 'maska/vue'
import { useFormModel, useFieldAttributes, useValidation } from '@/composables'

const emits = defineEmits<FieldEmits>()
const props = defineProps<FieldProps<MaskField>>()
const { field, model }: FieldPropRefs<MaskField> = toRefs(props)

const unmaskedValue = ref('')
const inputDefaultValue = ref('')
const allowedInputTypes: Readonly<string[]> = [ 'text', 'search', 'URL', 'password', 'tel' ]

const inputType: ComputedRef<string> = computed(() => {
  return field.value.inputType || 'text'
})
const maskOptions: ComputedRef<MaskInputOptions> = computed(() => {
  return {
    mask: field.value.mask,
    ...field.value.maskOptions
  }
})

const { currentModelValue } = useFormModel(model.value, field.value)
const { isRequired, isDisabled, isVisible, hint } = useFieldAttributes(model.value, field.value)
const { errors, onChanged, onBlur } = useValidation(
  model.value,
  field.value,
  currentModelValue,
  props.formOptions,
  emits,
  isDisabled.value,
  isRequired.value,
  false
)

const onFieldValueChanged = (event: Event): void => {
  errors.value = []
  if (field.value.maskOptions && field.value.maskOptions.unmasked) {
    emits('onInput', unmaskedValue.value)
  } else if (event.target) {
    emits('onInput', (event.target as HTMLInputElement).value)
  }
  onChanged()
}

onBeforeMount(() => {
  if (field.value.inputType && !allowedInputTypes.includes(field.value.inputType)) {
    throw new Error('Invalid input type for Mask field! Must be one of ' + allowedInputTypes.join(','))
  }
  /** Mask the default value, if set. */
  if (currentModelValue.value) {
    inputDefaultValue.value = new Mask({ mask: field.value.mask }).masked(currentModelValue.value)
  }
})

defineExpose({ unmaskedValue, hint, errors, isVisible })
</script>
