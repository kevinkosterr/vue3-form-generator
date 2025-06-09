<template>
  <input
    :id="props.id"
    class="field-input"
    type="text"
    :name="field.name"
    :required="isRequired"
    :disabled="isDisabled"
    :readonly="isReadonly"
    :placeholder="field.placeholder"
    :autocomplete="autoCompleteState"
    :value="currentModelValue"
    @input="onFieldValueChanged"
    @blur="onBlur"
  >
</template>

<script setup lang="ts">
import { toRefs, computed, type ComputedRef } from 'vue'
import type { FieldPropRefs, FieldProps, TextField } from '@/resources/types/field/fields'
import { useFormModel, useFieldAttributes, useFieldValidate, useFieldEmits } from '@/composables'

const emits = defineEmits(useFieldEmits())
const props = defineProps<FieldProps<TextField>>()

const { field, model }: FieldPropRefs<TextField> = toRefs(props)

const autoCompleteState: ComputedRef<string> = computed(() => field.value.autocomplete ? 'on' : 'off')

const { currentModelValue } = useFormModel(model.value, field.value)
const { isRequired, isDisabled, isReadonly, isVisible, hint } = useFieldAttributes(model.value, field.value)
const { errors, validate } = useFieldValidate(
  model.value,
  field.value,
  isDisabled.value,
  isRequired.value,
  false
)

const onBlur = () => {
  validate(currentModelValue.value).then((validationErrors) => {
    emits('validated',
      validationErrors.length === 0,
      validationErrors,
      field.value
    )
  })
}

const onFieldValueChanged = (event: Event) => {
  errors.value = []
  emits('onInput', (event.target as HTMLInputElement).value)
}

defineExpose({ errors, hint, isVisible })
</script>