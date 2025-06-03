<template>
  <input type="reset" class="field-reset" :value="field.buttonText" :class="field.buttonClasses">
</template>

<script setup lang="ts">
import { type Ref, toRefs } from 'vue'
import type { FieldProps, ResetField } from '@/resources/types/field/fields'

const props = defineProps<FieldProps<ResetField>>()

const { field }: { field: Ref<ResetField> } = toRefs(props)

defineExpose({ noLabel: true })
</script>