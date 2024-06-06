<template>
  <input
      type="submit"
      :disabled="isDisabled"
      :value="field.buttonText || 'Submit'"
  />
</template>

<script>
import {abstractField} from "@/mixins";

export default {
  name: 'FieldSubmit',
  mixins: [abstractField]
}
</script>
