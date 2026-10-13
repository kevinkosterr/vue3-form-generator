<template>
  <input
    type="reset"
    class="field-reset"
    :disabled="isDisabled"
    :value="field.buttonText"
    :class="field.buttonClasses"
  >
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import type { FieldPropRefs, FieldProps, ResetField } from '@/resources/types/field/fields'
import { useFieldAttributes } from '@/composables'

const props = defineProps<FieldProps<ResetField>>()

const { field, model }: FieldPropRefs<ResetField> = toRefs(props)
const { isVisible, isDisabled } = useFieldAttributes(model.value, field.value)

defineExpose({ noLabel: true, isVisible })
</script>
