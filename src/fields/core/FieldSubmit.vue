<template>
  <input
    type="submit"
    class="field-submit"
    :disabled="isDisabled"
    :value="field.buttonText || 'Submit'"
    :class="field.buttonClasses"
  >
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import type { FieldProps, FieldPropRefs, SubmitField } from '@/resources/types/field/fields'
import { useFieldAttributes } from '@/composables'

const props = defineProps<FieldProps<SubmitField>>()

const { model, field }: FieldPropRefs<SubmitField> = toRefs(props)

const { isDisabled, isVisible } = useFieldAttributes(model.value, field.value)

defineExpose({ noLabel: true, isVisible })
</script>
