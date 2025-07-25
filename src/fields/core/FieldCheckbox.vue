<template>
  <input
    :id="props.id"
    type="checkbox"
    :name="field.name"
    :required="isRequired"
    :disabled="isDisabled"
    :value="currentModelValue"
    :checked="currentModelValue"
    @change="onFieldValueChanged"
  >
  <FormLabel
    v-if="field.label"
    style="margin-left: .4em"
    :field-id="props.id"
    :label-icon-position="labelIconPosition"
    :label-icon="labelIcon"
    :label="field.label"
  />
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import type { CheckboxField, FieldPropRefs, FieldProps, FieldEmits } from '@/resources/types/field/fields'
import {
  useFormModel,
  useFieldAttributes,
  useValidation
} from '@/composables'
import { useLabelIcon } from '@/composables/useLabelIcon'

import FormLabel from '@/components/FormLabel.vue'

const emits = defineEmits<FieldEmits>()
const props = defineProps<FieldProps<CheckboxField>>()

const { field, model }: FieldPropRefs<CheckboxField> = toRefs(props)
const { labelIcon, labelIconPosition } = useLabelIcon(field.value.labelIcon)

const { currentModelValue } = useFormModel(model.value, field.value)
const { isRequired, isDisabled, isVisible, hint } = useFieldAttributes(model.value, field.value)
const { errors, onChanged } = useValidation(
  model.value,
  field.value,
  currentModelValue,
  props.formOptions,
  emits,
  isDisabled.value,
  isRequired.value,
  false
)

const onFieldValueChanged = (event: Event) => {
  const target = event.target as HTMLInputElement
  errors.value = []
  emits('onInput', target.checked)
  onChanged()
}

defineExpose({ hint, noLabel: true, errors, isVisible })
</script>
