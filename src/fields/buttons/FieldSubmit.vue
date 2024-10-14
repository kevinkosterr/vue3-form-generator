<template>
  <input
    type="submit"
    class="field-submit"
    :disabled="isDisabled"
    :value="field.buttonText || 'Submit'"
  >
</template>

<script>
import { abstractField } from '@/mixins/index.js'

export default {
  name: 'FieldSubmit',
  mixins: [ abstractField ]
}
</script>
