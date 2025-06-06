<template>
  <button
    type="button"
    :disabled="isDisabled"
    :class="field.buttonClasses"
    @click.prevent="onClick"
  >
    {{ field.buttonText }}
  </button>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import { useFieldAttributes } from '@/composables'
import type { ButtonField, FieldPropRefs, FieldProps } from '@/resources/types/field/fields'

const props = defineProps<FieldProps<ButtonField>>()

const { model, field }: FieldPropRefs<ButtonField> = toRefs(props)
const { isVisible, hint, isDisabled } = useFieldAttributes(model.value, field.value)

const onClick = () => {
  return field.value.onClick !== undefined ? field.value.onClick(model.value, field.value) : undefined
}

defineExpose({ noLabel: true, isVisible, hint })
</script>