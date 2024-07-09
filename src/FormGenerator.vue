<script setup>
import {ref, getCurrentInstance} from "vue";
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

/** Data / Refs */
const formGenerator = ref(instance?.proxy || null)
const fieldElements = ref([])
const formErrors = ref([])
const defaultValues = ref({...props.model})

/**
 * Update form model key with its new value.
 * @param {String} model model key to update.
 * @param {any} value value to set.
 */
const updateGeneratorModel = ({ model, value }) => {
  props.model[model] = value
}

const onFieldValidated = ({isValid, fieldErrors, field}) => {
}

/**
 * Handle the submit event from the form element.
 */
const onSubmit = () => {
  if (!formErrors.value.length) emits('submit')
}
</script>

<template>
  <form :id="props.id ?? ''" :class="`vue-form-generator ${props.classes ?? ''}`" v-if="props.schema !== undefined"
        @submit.prevent="onSubmit" :enctype="enctype">
    <fieldset v-if="props.schema.fields">
      <template v-for="field in props.schema.fields">
        <form-group :ref="el => fieldElements.push(el)" :form-generator="formGenerator" :field="field" :model="props.model"
                    @value-updated="updateGeneratorModel" @validated="onFieldValidated"/>
      </template>
      <template v-for="group in props.schema.groups">
        <fieldset>
          <legend v-if="group.legend">{{group.legend}}</legend>
          <template v-for="field in group.fields">
            <form-group :ref="el => fieldElements.push(el)" :form-generator="formGenerator" :field="field" :model="props.model"
                        @value-updated="updateGeneratorModel" @validated="onFieldValidated"/>
          </template>
        </fieldset>
      </template>
    </fieldset>
    {{formErrors}}
  </form>
</template>

<style>
.vue-form-generator input:not([type='checkbox'],[type='submit'],[type='radio']) {
  width: 100%;
}

.vue-form-generator > fieldset {
  border: none;
}
</style>