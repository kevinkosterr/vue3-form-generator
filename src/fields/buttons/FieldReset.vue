<template>
  <input type="reset" class="field-reset" :value="field.buttonText">
</template>

<script setup>
import { toRefs } from 'vue'
import { useFieldProps } from '@/composables'

const props = defineProps(useFieldProps())

const { field } = toRefs(props)
</script>