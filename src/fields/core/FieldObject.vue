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

<script setup lang="ts">
import FormGenerator from '@/FormGenerator.vue'
import type { FieldProps, FieldPropRefs, ObjectField } from '@/resources/types/field/fields'
import { useFieldEmits, useFormModel } from '@/composables'
import { toRefs, useTemplateRef, computed, type ComputedRef } from 'vue'
import { FieldValidation } from '@/resources/types/generic'

const emits = defineEmits(useFieldEmits())
const props = defineProps<FieldProps<ObjectField>>()

const formGenerator = useTemplateRef('formGenerator')
const hasErrors: ComputedRef<boolean> = computed(() => formGenerator.value?.hasErrors ?? false)

const { field, model }: FieldPropRefs<ObjectField> = toRefs(props)

const { currentModelValue } = useFormModel(model.value, field.value)

/**
 * Emits the validated event
 * @param validation
 */
const onFieldValidated = (validation: FieldValidation) => {
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