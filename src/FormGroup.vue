<script setup>
import { ref, computed } from 'vue'
import { getFieldComponentName, hasLabel } from '@/helpers'

const fieldComponent = ref(null)

const props = defineProps({
  formGenerator: {
    type: Object,
    required: true
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
  return `${props.formGenerator.idPrefix ? props.formGenerator.idPrefix + '_' : ''}${props.field.name}`
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
      <component
        :is="getFieldComponentName(props.field)" :id="fieldId" ref="fieldComponent"
        :model="model"
        :field="props.field" @on-input="onInput" @validated="onValidated"
      />
    </div>

    <div v-if="fieldComponent && fieldComponent.hint" class="hints">
      <span class="hint">{{ fieldComponent.hint }}</span>
    </div>

    <div v-if="fieldComponent && fieldComponent.errors.length" class="errors help-block">
      <template v-for="error in fieldComponent.errors" :key="error">
        <span class="error">{{ error }}</span> <br>
      </template>
    </div>
  </div>
</template>

<style>
.form-group:has(input[required],select[required]) label:first-child::after {
  content: "*";
  font-size: .9em;
  color: red;
  margin-left: .2rem;
}

.hint {
  color: gray;
  font-size: 90%;
}

.errors {
  color: red;
  font-size: .8rem;
  margin-bottom: .3rem;
}
</style>
