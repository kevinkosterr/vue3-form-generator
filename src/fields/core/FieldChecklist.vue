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

<script setup lang="ts">
// This component is heavily inspired by https://github.com/shwld/vfg-field-checkboxlist/
import {
  useFieldEmits,
  useFieldValidate,
  useFormModel,
  useFieldAttributes
} from '@/composables'
import type { FieldProps, FieldPropRefs, ChecklistField } from '@/resources/types/field/fields'
import { type Ref, toRefs } from 'vue'

const emits = defineEmits(useFieldEmits())
const props = defineProps<FieldProps<ChecklistField>>()

const { field, model }: FieldPropRefs<ChecklistField> = toRefs(props)
const { hint, isVisible } = useFieldAttributes(model.value, field.value)
const { currentModelValue }: { currentModelValue: Ref<any[]> } = useFormModel(model.value, field.value)
const { validate, errors } = useFieldValidate(model.value, field.value)

const onFieldValueChanged = (event: Event) => {
  const target = event.target as HTMLInputElement
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

defineExpose({ hint, errors, isVisible })
</script>
