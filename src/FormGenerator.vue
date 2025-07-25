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
        <FormGroup
          :ref="el => (el && '$el' in el) ? fieldElements.push((el as FormGroupInstance)) : null"
          :form-options="formOptions"
          :field="field"
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
            <FormGroup
              :ref="el => (el && '$el' in el) ? fieldElements.push((el as FormGroupInstance)) : null"
              :form-options="formOptions"
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

<script setup lang="ts">
import type { FieldValidation, FormGeneratorProps, FormOptions } from '@/resources/types/generic'
import type { ComponentPublicInstance, ComputedRef, Ref } from 'vue'
import { computed, ref } from 'vue'
import { resetObjectProperties, toUniqueArray } from '@/helpers'
import FormGroup from './FormGroup.vue'

const emits = defineEmits([ 'submit', 'field-validated' ])

const props = withDefaults(defineProps<FormGeneratorProps>(), {
  enctype: 'application/x-www-form-urlencoded',
  id: '',
  idPrefix: '', // Kept for compatibility reasons.
  options: () => ({
    validate: 'onBlur' // Always validate onBlur by default.
  })
})

type FormGroupInstance = ComponentPublicInstance<InstanceType<typeof FormGroup>>
/** Data / Refs */
const fieldElements: Ref<FormGroupInstance[]> = ref([])
const formErrors: Ref<Record<string, any>> = ref({})
const formOptions: ComputedRef<FormOptions> = computed(() => ({ ...props.options, idPrefix: props.idPrefix }))

/**
 * Update form model key with its new value.
 * @param {String} model model key to update.
 * @param {any} value value to set.
 */
const updateGeneratorModel = ({ model, value }: { model: string, value: any }) => {
  // eslint-disable-next-line vue/no-mutating-props
  props.model[model] = value
}

/**
 * Handle a field validation
 * @param fieldErrors errors discovered during validation of the field.
 * @param field field schema object that has been validated.
 */
const onFieldValidated = ({ fieldErrors, field }: FieldValidation) => {
  emits('field-validated', { fieldErrors, field })
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
  return Boolean(Object.values(formErrors.value).map(e => Boolean(e.length)).filter(e => e).length)
})

/** Handle the submit event from the form element. */
const onSubmit = () => {
  if (!hasErrors.value) emits('submit')
}

const onReset = () => {
  // Hideous hack to update the model, without TypeScript crying about mutation of props. And yes, I know it isn't
  // recommended to update the props.
  (props as any).model = resetObjectProperties(props.model)
}

defineExpose({ hasErrors, formErrors })
</script>