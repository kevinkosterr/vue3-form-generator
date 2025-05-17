<template>
  <div class="field-checklist">
    <div
      v-for="checklistItem in field.options"
      :key="checklistItem.value"
      class="form-checklist"
    >
      <label class="form-check-label">
        <input
          type="checkbox"
          class="form-check-input"
          :value="checklistItem.value"
          :checked="currentModelValue.includes(checklistItem.value)"
          @change="onFieldValueChanged"
        >
        {{ checklistItem.name }}
      </label>
    </div>
  </div>
</template>

<script setup>
// This component is heavily inspired by https://github.com/shwld/vfg-field-checkboxlist/
import {
  useFieldProps,
  useFieldEmits,
  useFieldValidate,
  useFormModel, useFieldAttributes
} from '@/composables'
import { toRefs } from 'vue'

const emits = defineEmits(useFieldEmits())
const props = defineProps(useFieldProps())

const { field, model } = toRefs(props)
const { hint } = useFieldAttributes(model.value, field.value)
const { currentModelValue } = useFormModel(model.value, field.value)
const { validate, errors } = useFieldValidate(model.value, field.value)

const onFieldValueChanged = ({ target }) => {
  errors.value = []
  let newValue
  const valueAlreadyChecked = currentModelValue.value.includes(target.value)

  if (valueAlreadyChecked) {
    // If the value was previously already checked, make sure it is removed from the current list of values.
    newValue = currentModelValue.value.filter(v => v !== target.value)
  } else {
    newValue = [ ...currentModelValue.value, target.value ]
  }

  emits('onInput', newValue)

  // Validate the current array of values whenever a value is (un)checked.
  validate(newValue).then((validationErrors) => {
    emits('validated',
      validationErrors.length === 0, // Is the current value for this field valid?
      validationErrors, // Actual errors
      field.value // Field schema/object
    )
  })
}

defineExpose({ hint, errors })
</script>