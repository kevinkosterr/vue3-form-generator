<template>
  <button
    type="submit"
    :disabled="isDisabled"
  >
    {{ field.buttonText || 'Submit' }}
  </button>
</template>

<script>
import { abstractField } from '@/mixins/index.js'

export default {
  name: 'FieldSubmit',
  mixins: [ abstractField ]
}
</script>
