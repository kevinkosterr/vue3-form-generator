<template>
  <div class="wrapper">
    <input type="password"
           :id="id"
           :name="field.name"
           :required="isRequired"
           :disabled="isDisabled"
           :placeholder="field.placeholder"
           :value="model[field.model]"
           @input="onFieldValueChanged"
    />
    <div class="password-strength-indicator" v-if="field.indicator" :style="meterStyle"></div>
    <small class="password-feedback" v-if="(field.suggestions || field.warning) && passwordFeedback">
        <div class="password-suggestions" v-if="field.suggestions && passwordFeedback.suggestions.length">
          <strong>Suggestions</strong>
          <ul class="password-suggestions-ul">
            <li v-for="suggestion in passwordFeedback.suggestions">{{suggestion}}</li>
          </ul>
        </div>
        <div class="password-warnings" v-if="field.warning && passwordFeedback.warning">
          <strong>Warning</strong>
          <div>{{passwordFeedback.warning}}</div>
        </div>
    </small>
  </div>
</template>

<script>
import zxcvbn from 'zxcvbn'
import { abstractField } from "@/mixins"

export default {
  name: 'FieldPassword',
  mixins: [abstractField],
  computed: {
    shouldCheckPassword () {
      return (this.field.indicator || this.field.suggestions || this.field.warning)
    },
    checkedPassword () {
      if (!this.model[this.field.model] || !this.shouldCheckPassword) return {}
      return zxcvbn(this.model[this.field.model])
    },
    passwordStrength () {
      return this.checkedPassword?.score
    },
    passwordFeedback () {
      return this.checkedPassword?.feedback
    },
    meterStyle () {
      if (this.passwordStrength === 0 && this.model[this.field.model].length > 0) {
        return "width:10%;background:red;"
      }
      return {
        1: 'width:25%;background:red;',
        2: 'width:50%;background:orange;',
        3: 'width:75%;background:green;',
        4: 'width:100%;background:darkgreen;'
      }[this.passwordStrength]
    }
  },
}
</script>

<style scoped>
.password-strength-indicator {
  transition: width 0.1s ease-in, background 0.3s ease-in;
  height: .5em;
  width: 100%;
  background: rgba(0, 0, 0, 0.1);
}

.password-feedback {
  margin-top: .5em;
  margin-bottom: 1em;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>