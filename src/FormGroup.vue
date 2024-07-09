<script setup>
import { ref, computed } from 'vue'
import { getFieldComponentName, hasLabel } from '@/helpers'

const fieldComponent = ref(null)

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

const emit = defineEmits(['value-updated', 'validated'])

function onInput (value) {
  emit('value-updated', { model: props.field.model, value })
}

function onValidated (isValid, fieldErrors, field) {
  emit('validated', { isValid, fieldErrors, field })
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
      <component ref="fieldComponent" @on-input="onInput" @validated="onValidated" :is="getFieldComponentName(props.field)"
                 :id="fieldId" :model="model" :field="props.field"/>
    </div>

    <div class="errors help-block" v-if="fieldComponent && fieldComponent.errors.length">
      <template v-for="error in fieldComponent.errors">
        <span class="error" v-html="error"/> <br/>
      </template>
    </div>

  </div>
</template>

<style>
.form-group:has(input[required]) label::after {
  content: "*";
  font-size: .9em;
  color: red;
  margin-left: .1rem;
}

.errors {
  color: red;
  font-size: .8rem;
  margin-bottom: .3rem;
}
</style>
