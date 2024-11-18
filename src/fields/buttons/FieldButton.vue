<template>
  <button type="button" @click.prevent="field.onClick(model, field)">
    {{ field.buttonText }}
  </button>
</template>

<script setup>
import { toRefs } from 'vue'
import { useFieldProps } from '@/composables'

const props = defineProps(useFieldProps())

const { model, field } = toRefs(props)
</script>