<template>
  <input
    type="reset"
    :value="field.buttonText"
  />
</template>

<script>
import { abstractField } from '@/mixins'

export default {
  name: 'FieldReset',
  mixins: [ abstractField ],
}
</script>