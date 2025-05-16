<script setup>
import { ref, onBeforeMount } from 'vue'

const props = defineProps({
  withInput: Boolean
})

const form = ref({
  model: {
    colorChoice: '#3f3f3f'
  },
  schema: {
    fields: [
      {
        name: 'choiceColor',
        label: 'Choose a color',
        model: 'colorChoice',
        type: 'input',
        inputType: 'color'
      }
    ]
  }
})

onBeforeMount(() => {
  form.value.schema.fields[0].withInput = props.withInput
})
</script>

<template>
  <ul>
    <li>Hex: {{ form.model.colorChoice }}</li>
    <li v-if="!props.withInput">As badge background: <span class="VPBadge" :style="'background:' + form.model.colorChoice">your color</span></li>
  </ul>
  <vue-form-generator :schema="form.schema" :model="form.model"/>
</template>