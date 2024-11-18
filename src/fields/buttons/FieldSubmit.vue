<template>
  <input
    type="submit"
    class="field-submit"
    :disabled="isDisabled"
    :value="field.buttonText || 'Submit'"
  >
</template>

<script setup>
import { toRefs } from 'vue'
import { useFieldProps, useAttributes } from '@/composables'

const props = defineProps(useFieldProps())

const { model, field } = toRefs(props)

const { isDisabled } = useAttributes(model.value, field.value)
</script>
