<template>
  <div class="form-group" :style="fieldStyle">
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

    <div v-if="fieldComponent && fieldHasHint" class="hints">
      <span class="hint">{{ fieldComponent.hint }}</span>
    </div>

    <div v-if="fieldComponent && fieldHasErrors" class="errors help-block">
      <template v-for="error in fieldComponent.errors" :key="error">
        <span class="error">{{ error }}</span> <br>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ComputedRef, ShallowRef } from 'vue'
import type { FieldComponent, FormGroupProps } from '@/resources/types/generic'
import type { Field } from '@/resources/types/field/fields'
import { computed, useTemplateRef } from 'vue'
import { getFieldComponentName } from '@/helpers'

const fieldComponent = useTemplateRef('fieldComponent') as Readonly<ShallowRef<FieldComponent | undefined>>

const props = withDefaults(defineProps<FormGroupProps>(), {
  formOptions: () => ({}),
  errors: () => []
})
const emit = defineEmits([ 'value-updated', 'validated' ])

function onInput (value: any) {
  emit('value-updated', { model: props.field.model, value })
}

function onValidated (isValid: boolean, fieldErrors: string[], field: Field) {
  emit('validated', { isValid, fieldErrors, field })
}

/** Computed */
const fieldId: ComputedRef<string> = computed(() => {
  return `${props.formOptions.idPrefix ? props.formOptions.idPrefix + '_' : ''}${props.field.name}`
})

const fieldStyle: ComputedRef<Record<string, string | undefined>> = computed(() => ({
  display: fieldComponent.value && fieldComponent.value.isVisible ? undefined : 'none'
}))

const fieldHasErrors: ComputedRef<boolean> = computed(() => {
  return Boolean(fieldComponent.value && fieldComponent.value.errors && fieldComponent.value.errors.length)
})
const fieldHasHint: ComputedRef<boolean> = computed(() => {
  return Boolean(fieldComponent.value && fieldComponent.value.hint)
})

const shouldHaveLabel: ComputedRef<boolean> = computed(() => {
  if (fieldComponent.value?.noLabel || props.field.noLabel === true) {
    return false
  }
  return Boolean(props.field.label)
})
</script>