<template>
  <div class="wrapper">
    <input
      :id="id"
      type="password"
      :name="field.name"
      :required="isRequired"
      :disabled="isDisabled"
      :placeholder="field.placeholder"
      :value="currentModelValue"
      @input="onFieldValueChanged"
      @blur="onBlur"
    >
    <div v-if="field.indicator" class="password-strength-indicator" :style="meterStyle" />
  </div>
</template>

<script setup lang="ts">
import { computed, type ComputedRef, toRefs } from 'vue'
import {
  useFormModel,
  useFieldValidate,
  useFieldAttributes,
  useFieldEmits
} from '@/composables'
import type { PasswordField, FieldProps, FieldPropRefs } from '@/resources/types/field/fields'

const mediumRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})')
const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})')

const props = defineProps<FieldProps<PasswordField>>()
const emits = defineEmits(useFieldEmits())

const { model, field }: FieldPropRefs<PasswordField> = toRefs(props)
const { isRequired, isDisabled, hint } = useFieldAttributes(model.value, field.value)
const { currentModelValue } = useFormModel(model.value, field.value)

const { errors, validate } = useFieldValidate(
  model.value,
  field.value,
  isDisabled.value,
  isRequired.value,
  false
)

/** Roughly determine the strength level of the password */
const passwordStrength: ComputedRef<number> = computed(() => {
  if (strongRegex.test(currentModelValue.value)) {
    return 3
  } else if (mediumRegex.test(currentModelValue.value)) {
    return 2
  } else if (currentModelValue.value.length) {
    return 1
  }
  return 0
})

const meterStyle: ComputedRef<string> = computed(() => {
  return {
    0: '',
    1: 'width:15%;background:red;',
    2: 'width:50%;background:orange;',
    3: 'width:100%;background:green;'
  }[passwordStrength.value] ?? ''
})

const onFieldValueChanged = (event: Event) => {
  errors.value = []
  emits('onInput', (event.target as HTMLInputElement).value)
}

const onBlur = () => {
  validate(currentModelValue.value).then((validationErrors) => {
    emits('validated',
      validationErrors.length === 0,
      validationErrors,
      field.value
    )
  })
}

defineExpose({ hint, errors })
</script>