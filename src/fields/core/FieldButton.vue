<template>
  <button type="button" :class="field.buttonClasses" @click.prevent="field.onClick(model, field)">
    {{ field.buttonText }}
  </button>
</template>

<script setup>
import { toRefs } from 'vue'
import { useFieldProps } from '@/composables/index.ts'

const props = defineProps(useFieldProps())

const { model, field } = toRefs(props)

defineExpose({ noLabel: true })
</script>