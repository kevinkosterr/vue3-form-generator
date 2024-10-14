<template>
  <textarea
    :id="id"
    :style="field.resizable ? '' : 'resize: none;'"
    class="field-textarea"
    :name="field.name"
    :required="isRequired"
    :readonly="isReadOnly"
    :disabled="isDisabled"
    :maxlength="field.maxLength"
    :placeholder="field.placeholder"
    :value="currentModelValue"
    @input="onFieldValueChanged"
    @blur="onBlur"
  />
</template>

<script>
import { abstractField } from '@/mixins'

export default {
  name: 'FieldTextarea',
  mixins: [ abstractField ]
}
</script>