<template>
  <button type="button" @click.prevent="field.onClick(model, field)">
    {{ field.buttonText }}
  </button>
</template>

<script>
import { abstractField } from '@/mixins/index.js'

export default {
  name: 'FieldButton',
  mixins: [ abstractField ]
}
</script>