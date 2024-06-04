<script setup>
import { ref, computed } from 'vue'
import { fieldText } from './fields/core'

const props = defineProps({
  formGenerator: {
    type: Object,
    required: true
  },
  model: Object,
  options: {
    type: Object
  },
  field: {
    type: Object,
    required: true
  },
  errors: {
    type: Array,
    default: []
  }
})

/** Data / Refs */
const child = ref(null)

/** Methods */
function getFieldComponent (fieldSchema) {
  return {'text': fieldText}[fieldSchema.type]
}

/** Computed */
const fieldId = computed(() => {
  return props.field.name
})
</script>

<template>
  <div class="form-group">
    <label :for="fieldId">
      <span>{{field.label}}</span>
    </label>

    <div class="field-wrap">
      <component ref="child" :is="getFieldComponent(props.field)" :field="props.field"/>
    </div>
  </div>
</template>

<style scoped>

</style>