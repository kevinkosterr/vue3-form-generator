<template>
  <label class="field-switch" :for="formFieldId">
    <input :id="formFieldId" type="checkbox" :disabled="isDisabled" @change="onFieldValueChanged">
    <span class="slider" />
  </label>
</template>

<script>
import { abstractField } from '@/mixins/'

export default {
  name: 'FieldSwitch',
  mixins: [ abstractField ],
  methods: {
    formatFieldValue(target) {
      return target.checked
    }
  }
}
</script>

<style>
.vue-form-generator .field-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.vue-form-generator .field-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.vue-form-generator .slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;
}

.vue-form-generator .slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
}

.vue-form-generator input:checked + .slider {
  background-color: #2196F3;
}

.vue-form-generator input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

.vue-form-generator input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
</style>