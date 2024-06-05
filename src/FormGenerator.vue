<script setup>
import { ref, getCurrentInstance } from "vue";
import FormGroup from "./FormGroup.vue";

const instance = getCurrentInstance()

const props = defineProps({
  schema: Object,
  model: Object,
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
  <form class="vue-form-generator" v-if="props.schema !== undefined">
    <fieldset v-if="props.schema.fields">
      <template v-for="field in props.schema.fields">
        <form-group :form-generator="formGenerator" :field="field" :model="props.model"
                    @update-generator-model="handleUpdateGeneratorModel"/>
      </template>
    </fieldset>
  </form>
</template>

<style>
.vue-form-generator input:not([type='checkbox']) {
  width: 100%;
}
</style>