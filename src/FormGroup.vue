<script setup>
import { ref, computed } from 'vue'
import { getFieldComponentName, hasLabel } from '@/helpers'

const props = defineProps({
  formGenerator: {
    type: Object,
    required: true
  },
  model: Object,
  field: {
    type: Object,
    required: true
  },
  errors: {
    type: Array,
    default: []
  }
})

const emit = defineEmits(['update-generator-model'])

/** Data / Refs */
const child = ref(null)

function onInput (value) {
  emit('update-generator-model', { model: props.field.model, value })
}

/** Computed */
const fieldId = computed(() => {
  return `${props.formGenerator.idPrefix ? props.formGenerator.idPrefix + "_" : ""}${props.field.name}`
})

const shouldHaveLabel = computed(() => {
  // checkbox will have their own label
  return hasLabel(props.field) && props.field.inputType !== 'checkbox'
})
</script>

<template>
  <div class="form-group">
    <label v-if="shouldHaveLabel" :for="fieldId">
      <span> {{ props.field.label }}</span>
    </label>

    <div class="field-wrap">
      <component ref="child" @on-input="onInput" :is="getFieldComponentName(props.field)" :id="fieldId" :model="model"
                 :field="props.field"/>
    </div>
  </div>
</template>
