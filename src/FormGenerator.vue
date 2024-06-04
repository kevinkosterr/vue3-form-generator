<script setup>
import {ref, getCurrentInstance} from "vue";
import FormGroup from "./FormGroup.vue";

const instance = getCurrentInstance()

const props = defineProps({
  schema: Object,
  model: Object,
  multiple: {
    type: Boolean,
    default: false,
  },
  isNewModel: {
    type: Boolean,
    default: false
  },
  tag: {
    type: String,
    default: 'fieldset',
    validator: (value) => value.length > 0
  },
  options: {
    type: Object,
    default: {
      validateAfterLoad: false,
      validateAfterChanged: false,
      fieldIdPrefix: "",
      validateAsync: false,
      validationErrorClass: "error",
      validationSuccessClass: ""
    }
  }
})

/** Data / Refs */
const formGenerator = ref(instance?.proxy || null)
// const errors = ref([])
</script>

<template>
  <div class="vue-form-generator" v-if="props.schema !== undefined">
    <fieldset v-if="props.schema.fields">
      <template v-for="field in props.schema.fields">
        <form-group :form-generator="formGenerator" :field="field" :model="props.model" :options="props.options"/>
      </template>
    </fieldset>
  </div>
</template>

<style>

</style>