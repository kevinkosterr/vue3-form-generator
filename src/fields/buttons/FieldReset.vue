<template>
  <button type="reset">
    {{field.buttonText}}
  </button>
</template>

<script>
import { abstractField } from '@/mixins/index.js'

export default {
  name: 'FieldReset',
  mixins: [ abstractField ],
}
</script>