<template>
  <button type="button" :class="field.buttonClasses" @click.prevent="onClick">
    {{ field.buttonText }}
  </button>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import type { ButtonField, FieldPropRefs, FieldProps } from '@/resources/types/field/fields'

const props = defineProps<FieldProps<ButtonField>>()

const { model, field }: FieldPropRefs<ButtonField> = toRefs(props)

const onClick = () => {
  return field.value.onClick !== undefined ? field.value.onClick(model.value, field.value) : undefined
}

defineExpose({ noLabel: true })
</script>