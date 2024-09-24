<template>
  <div class="wrapper">
    <input
      :id="id"
      type="password"
      :name="field.name"
      :required="isRequired"
      :disabled="isDisabled"
      :placeholder="field.placeholder"
      :value="currentModelValue"
      @input="onFieldValueChanged"
      @blur="onBlur"
    >
    <div v-if="field.indicator" class="password-strength-indicator" :style="meterStyle" />
  </div>
</template>

<script>
import { abstractField } from '@/mixins'

export default {
  name: 'FieldPassword',
  mixins: [ abstractField ],
  data () {
    return {
      /** from PrimeVue */
      mediumRegex: new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'),
      strongRegex: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})')
    }
  },
  computed: {
    passwordStrength () {
      if (this.strongRegex.test(this.currentModelValue)) {
        return 3
      } else if (this.mediumRegex.test(this.currentModelValue)) {
        return 2
      } else if (this.currentModelValue.length) {
        return 1
      }
      return 0
    },
    meterStyle () {
      return {
        0: '',
        1: 'width:15%;background:red;',
        2: 'width:50%;background:orange;',
        3: 'width:100%;background:green;'
      }[this.passwordStrength]
    }
  }
}
</script>

<style scoped>
.password-strength-indicator {
  transition: width 0.1s ease-in, background 0.3s ease-in;
  height: .5em;
  width: 100%;
  background: rgba(0, 0, 0, 0.1);
}
</style>