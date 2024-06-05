<script setup>
import {ref, computed} from 'vue'
import { getFieldComponent } from '@/helpers'

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
  return props.field.name
})
</script>

<template>
  <div class="form-group">
    <label :for="fieldId">
      <span>{{field.label}}</span>
    </label>

    <div class="field-wrap">
      <component ref="child" @on-input="onInput" :is="getFieldComponent(props.field)" :model="model" :field="props.field"/>
    </div>
  </div>
</template>

<style scoped>

</style>