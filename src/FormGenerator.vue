<script setup>
import { computed, getCurrentInstance, ref } from 'vue'
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
const formErrors = ref({})

/**
 * Update form model key with its new value.
 * @param {String} model model key to update.
 * @param {any} value value to set.
 */
const updateGeneratorModel = ({ model, value }) => {
  // eslint-disable-next-line vue/no-mutating-props
  props.model[model] = value
}

/**
 * Handle a field validation
 * @param fieldErrors errors discovered during validation of the field.
 * @param field field schema object that has been validated.
 */
const onFieldValidated = ({ fieldErrors, field }) => {
  if (!fieldErrors.length) {
    if (!(field.model in formErrors.value)) return
    else {
      delete formErrors.value[field.model]
      return
    }
  }
  formErrors.value[field.model] = toUniqueArray(fieldErrors)
}

/** Compute if the form has errors */
const hasErrors = computed(() => {
  return Boolean(Object.values(formErrors.value).map(e => Boolean(e.length)).filter(e => e === true).length)
})

/**
 * Handle the submit event from the form element.
 */
const onSubmit = () => {
  if (hasErrors.value === false) emits('submit')
}

const onReset = () => {
  // eslint-disable-next-line vue/no-mutating-props
  props.model = resetObjectProperties(props.model)
}

defineExpose({ hasErrors })
</script>

<template>
  <form
    v-if="props.schema !== undefined" :id="props.id ?? ''"
    class="vue-form-generator"
    :enctype="enctype"
    @submit.prevent="onSubmit"
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