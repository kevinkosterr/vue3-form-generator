<template>
  <input type="reset" :value="field.buttonText">
</template>

<script>
import { abstractField } from '@/mixins/index.js'

export default {
  name: 'FieldReset',
  mixins: [ abstractField ]
}
</script>