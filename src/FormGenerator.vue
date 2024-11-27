<script setup>
import { ref, getCurrentInstance } from 'vue'
import { resetObjectProperties, toUniqueArray } from '@/helpers'
import FormGroup from './FormGroup.vue'

const instance = getCurrentInstance()
const emits = defineEmits([ 'submit' ])

const props = defineProps({
  id: {
    type: String,
    required: false,
    default: ''
  },
  idPrefix: {
    type: String,
    required: false,
    default: ''
  },
  schema: {
    type: Object,
    required: true
  },
  model: {
    type: Object,
    required: true
  },
  enctype: {
    type: String,
    default: 'application/x-www-form-urlencoded'
  }
})

/** Data / Refs */
const formGenerator = ref(instance?.proxy || null)
const fieldElements = ref([])
const formErrors = ref([])

/**
 * Update form model key with its new value.
 * @param {String} model model key to update.
 * @param {any} value value to set.
 */
const updateGeneratorModel = ({ model, value }) => {
  // eslint-disable-next-line vue/no-mutating-props
  props.model[model] = value
}

const onFieldValidated = ({ fieldErrors }) => {
  formErrors.value = toUniqueArray([ ...formErrors.value, ...fieldErrors ])
}

/**
 * Handle the submit event from the form element.
 */
const onSubmit = () => {
  if (!formErrors.value.length) emits('submit')
}

const onReset = () => {
  // eslint-disable-next-line vue/no-mutating-props
  props.model = resetObjectProperties(props.model)
}
</script>

<template>
  <form
    v-if="props.schema !== undefined" :id="props.id ?? ''"
    class="vue-form-generator"
    :enctype="enctype" @submit.prevent="onSubmit"
    @reset.prevent="onReset"
  >
    <fieldset v-if="props.schema.fields">
      <template v-for="field in props.schema.fields" :key="field">
        <form-group
          :ref="el => fieldElements.push(el)"
          :form-generator="formGenerator" :field="field"
          :model="props.model"
          @value-updated="updateGeneratorModel"
          @validated="onFieldValidated"
        />
      </template>
      <template v-for="group in props.schema.groups" :key="group">
        <fieldset>
          <legend v-if="group.legend">
            {{ group.legend }}
          </legend>
          <template v-for="field in group.fields" :key="field">
            <form-group
              :ref="el => fieldElements.push(el)"
              :form-generator="formGenerator"
              :field="field"
              :model="props.model"
              @value-updated="updateGeneratorModel"
              @validated="onFieldValidated"
            />
          </template>
        </fieldset>
      </template>
    </fieldset>
  </form>
</template>