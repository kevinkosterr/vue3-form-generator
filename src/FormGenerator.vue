<script setup>
import { ref, getCurrentInstance } from "vue";
import FormGroup from "./FormGroup.vue";

const instance = getCurrentInstance()
const emits = defineEmits(['submit'])

const props = defineProps({
  id: {
    type: String,
    required: false,
  },
  classes: {
    type: String,
    required: false,
  },
  idPrefix: {
    type: String,
    required: false,
    default: ''
  },
  schema: Object,
  model: Object,
  enctype: {
    type: String,
    default: "application/x-www-form-urlencoded"
  },
})

/**
 * Update form model key with its new value.
 * @param {String} model model key to update.
 * @param value value to set.
 */
const handleUpdateGeneratorModel = ({ model, value }) => {
  props.model[model] = value
}

/** Data / Refs */
const formGenerator = ref(instance?.proxy || null)
// const errors = ref([])
</script>

<template>
  <form :id="props.id" :class="`vue-form-generator ${props.classes}`" v-if="props.schema !== undefined" @submit.prevent="emits('submit')" :enctype="enctype">
    <fieldset v-if="props.schema.fields">
      <template v-for="field in props.schema.fields">
        <form-group :form-generator="formGenerator" :field="field" :model="props.model"
                    @update-generator-model="handleUpdateGeneratorModel"/>
      </template>
    </fieldset>
  </form>
</template>

<style>
.vue-form-generator input:not([type='checkbox'],[type='submit'],[type='radio']) {
  width: 100%;
}
</style>