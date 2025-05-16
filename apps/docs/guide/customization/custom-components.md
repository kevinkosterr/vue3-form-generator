---
outline: [2,3]
---

# Creating your component

::: info
A [template repository](https://github.com/kevinkosterr/field-template) is available on GitHub to make it easy to create
custom field components and publish them as independent packages. This allows for your field components to keep track
of their own dependencies. 
:::

## Composition API <Badge type="tip" text="2.0.0+" />
To create a field component you make use of different composables ([?](https://vuejs.org/guide/reusability/composables)) to
get the behaviour you want the component to have. Different composables handle different functionality inside the field
component.

Every component must at least use these composables to work properly:
- [`useFieldEmits`](/guide/composables/useFieldEmits) - returns all events emitted by a field component;
- [`useFieldProps`](/guide/composables/useFieldProps) - returns all props used by a field component;
- [`useFormModel`](/guide/composables/useFormModel) - used to get the current model value for this field component.

Optional:
- [`useFieldValidate`](/guide/composables/useFieldValidate) - used for validation of the field;
- [`useFieldAttributes`](/guide/composables/useFieldAttributes) - holds different dynamic field attributes like `required` and `readonly`.


### Basic example
::: code-group
```vue [template]
<template>
  <input
    :id="id"
    class="field-input"
    type="text"
    :name="field.name"
    :required="isRequired"
    :disabled="isDisabled"
    :placeholder="field.placeholder"
    :autocomplete="field.autocomplete || 'off'"
    :value="currentModelValue"
    @input="onFieldValueChanged"
    @blur="onBlur"
  >
</template>
```

```vue [script setup]
<script setup>
import { toRefs } from 'vue'
import { useFormModel, useFieldAttributes, useFieldValidate, useFieldProps, useFieldEmits } from '@/composables'

const emits = defineEmits(useFieldEmits())
const props = defineProps(useFieldProps())

const { field, model } = toRefs(props)

const { currentModelValue } = useFormModel(model.value, field.value)
const { isRequired, isDisabled } = useFieldAttributes(model.value, field.value)
const { errors, validate } = useFieldValidate(
  model.value,
  field.value,
  isDisabled.value,
  isRequired.value,
  false
)

const onBlur = () => {
  validate(currentModelValue.value).then((validationErrors) => {
    emits('validated',
      validationErrors.length === 0,
      validationErrors,
      field.value
    )
  })
}

const onFieldValueChanged = ({ target }) => {
  errors.value = []
  emits('onInput', target.value)
}
```
:::

### Advanced example
For a more advanced example, you can take a look at the [`FieldSelect`](/guide/fields/FieldSelect) ([source](https://github.com/kevinkosterr/vue3-form-generator/blob/69cb6aeb8e8c82926ec3598e7d73be2d1146a3f2/src/fields/core/FieldSelect.vue)) component.

## Registering your component
To use your component inside the form generator, your component must be globally available throughout your app. You do this
by simply registering it in your `main.js` file. Names <strong>must</strong> start with `Field`.
::: code-group
```javascript [main.js]
// other imports etc.
import FieldCustom from '@/fields' // your import goes here

app.component('FieldCustom', FieldCustom)
```
:::

## Options API (Mixin) <Badge type="warning" text="deprecated" /> <Badge type="tip" text="<2.0.0" />
The base of every field component is the [`abstractField`](/guide/mixins/abstractField) mixin. Thus, in order to create a custom component, you'll
need to make use of the Options API. An example of a field that uses these methods can be found [here](https://github.com/kevinkosterr/vue3-form-generator/blob/89086d7c738825dde7b6c41d4c5e4f6033dce73f/src/fields/input/FieldSelect.vue).

To start creating your own field component, create a new Vue file and import the [`abstractField`](/guide/mixins/abstractField) mixin like so:

```vue
<script>
  import { abstractField } from "@kevinkosterr/vue3-form-generator";
  
  export default {
    mixins: [ abstractField ]
  }
</script>
```
Every field must make use of one of the following methods to pass its new value to the form generator:

- Handle one of the built-in input events and pass `onFieldValueChanged` as the event handler.
- Manually emit an `onInput` event with the new value as its argument.

::: code-group
```vue {11-16} [using onFieldValueChanged]
<template>
    <input type="checkbox" @change="onFieldValueChanged" >
</template>

<script>
  import { abstractField } from "@kevinkosterr/vue3-form-generator";

  export default {
    mixins: [ abstractField ],
    methods: {
      /** Will be called by onFieldValueChanged() to 
       * determine the definitive value to pass, returns `target.value` 
       * by default */
      formatFieldValue (target) { // Event target is passed here.
        return target.checked
      }
    }
  }
</script>
```

```vue {21-23} [Manual]
<template>
  <div v-for="card in cards" class="card" @click.prevent="selectCard(card.name)">
    {{ card.body }}
  </div>
</template>

<script>
  import { abstractField } from "@kevinkosterr/vue3-form-generator";

  export default {
    mixins: [ abstractField ],
    data () {
      return {
        cards: [
          { name: 'foo', body: 'Wow, that is awesome!' },
          { name: 'bar', body: 'This is cooler!'  }
        ]
      }
    },
    methods: {
      selectCard (name) {
        this.$emit('onInput', name) // Card with 'name' was chosen
      }
    }
  }
</script>
```
:::
