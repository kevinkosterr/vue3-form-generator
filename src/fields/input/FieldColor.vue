<template>
  <input
    type="color"
    :id="id"
    :name="field.name"
    @change="onFieldValueChanged"
  />
</template>

<script>
import {abstractField} from '@/mixins'

export default {
  name: 'FieldColor',
  mixins: [abstractField]
}
</script>