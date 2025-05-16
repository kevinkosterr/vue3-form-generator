<script setup>
import { computed, useTemplateRef } from 'vue'
import { getFieldComponentName } from '@/helpers'

const fieldComponent = useTemplateRef('fieldComponent')

const props = defineProps({
  formOptions: {
    type: Object,
    default: () => ({})
  },
  model: {
    type: Object,
    required: true
  },
  field: {
    type: Object,
    required: true
  },
  errors: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits([ 'value-updated', 'validated' ])

function onInput (value) {
  emit('value-updated', { model: props.field.model, value })
}

function onValidated (isValid, fieldErrors, field) {
  emit('validated', { isValid, fieldErrors, field })
}

/** Computed */
const fieldId = computed(() => {
  return `${props.formOptions.idPrefix ? props.formOptions.idPrefix + '_' : ''}${props.field.name}`
})

const shouldHaveLabel = computed(() => {
  if (fieldComponent.value?.noLabel || props.field.noLabel === true) {
    return false
  }
  return props.field.label
})
</script>

<template>
  <div class="form-group">
    <label v-if="shouldHaveLabel" :for="fieldId">
      <span> {{ props.field.label }}</span>
    </label>

    <div class="field-wrap">
      <component
        :is="getFieldComponentName(props.field)"
        :id="fieldId"
        ref="fieldComponent"
        :form-options="props.formOptions"
        :model="model"
        :field="props.field"
        @on-input="onInput"
        @validated="onValidated"
      />
    </div>

    <div v-if="fieldComponent && fieldComponent.hint" class="hints">
      <span class="hint">{{ fieldComponent.hint }}</span>
    </div>

    <div v-if="fieldComponent && fieldComponent.errors && fieldComponent.errors.length" class="errors help-block">
      <template v-for="error in fieldComponent.errors" :key="error">
        <span class="error">{{ error }}</span> <br>
      </template>
    </div>
  </div>
</template>