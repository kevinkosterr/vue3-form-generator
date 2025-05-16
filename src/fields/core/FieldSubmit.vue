<template>
  <input
    type="submit"
    class="field-submit"
    :disabled="isDisabled"
    :value="field.buttonText || 'Submit'"
    :class="field.buttonClasses"
  >
</template>

<script setup>
import { toRefs } from 'vue'
import { useFieldProps, useFieldAttributes } from '@/composables/index.ts'

const props = defineProps(useFieldProps())

const { model, field } = toRefs(props)

const { isDisabled } = useFieldAttributes(model.value, field.value)

defineExpose({ noLabel: true })
</script>
