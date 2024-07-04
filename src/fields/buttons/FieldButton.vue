<template>
  <button type="button">
    {{field.buttonText}}
  </button>
</template>

<script>
import { abstractField } from "@/mixins/index.js";

export default {
  name: 'FieldButton',
  mixins: [abstractField]
}
</script>