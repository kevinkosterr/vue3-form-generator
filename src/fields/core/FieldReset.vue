<template>
  <input type="reset" class="field-reset" :value="field.buttonText" :class="field.buttonClasses">
</template>

<script setup>
import { toRefs } from 'vue'
import { useFieldProps } from '@/composables/index.ts'

const props = defineProps(useFieldProps())

const { field } = toRefs(props)
</script>