<template>
  <input
    :id="id"
    type="color"
    :name="field.name"
    :required="isRequired"
    @change="onFieldValueChanged"
  >
</template>

<script>
import { abstractField } from '@/mixins'

export default {
  name: 'FieldColor',
  mixins: [ abstractField ]
}
</script>