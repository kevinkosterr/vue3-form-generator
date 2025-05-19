<template>
  <div class="field-object">
    <FormGenerator
      ref="formGenerator"
      :schema="field.schema"
      :model="currentModelValue"
      :options="props.formOptions"
      @field-validated="onFieldValidated"
    />
  </div>
</template>

<script setup>
import FormGenerator from '@/FormGenerator.vue'
import { useFieldProps, useFieldEmits, useFormModel } from '@/composables'
import { toRefs, useTemplateRef, computed } from 'vue'

const emits = defineEmits(useFieldEmits())
const props = defineProps(useFieldProps())

const formGenerator = useTemplateRef('formGenerator')
const hasErrors = computed(() => formGenerator.value?.hasErrors ?? false)

const { field, model } = toRefs(props)

const { currentModelValue } = useFormModel(model.value, field.value)

/**
 * Emits the validated event
 * @param validation
 */
const onFieldValidated = (validation) => {
  const key = `${field.value.model}.${validation.field.model}`
  emits(
    'validated',
    validation.fieldErrors.length === 0,
    validation.fieldErrors,
    { ...field.value, model: key }
  )
}

defineExpose({ hasErrors })
</script>