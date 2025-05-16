# Creating a validator
Validation is a crucial step to making sure the input provided by the user is valid. In `vue3-form-generator` this is
done by passing the necessary validator functions to the field schema objects. Each field schema object holds its own
validator(s).

A field will be validated, by default, once the [`blur`](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event) event has occurred.

::: warning
Client-side validation should **never** replace server-side validation. Make sure you also validate
a user's input on the server-side.
:::

<script setup>
import ValidatorExample from '/components/ValidatorExample.vue'
</script>

## Arguments
A validator function will take the following arguments, displayed in order:
- `value` - current value of the field;
- `field` - field schema object;
- `model` - entire model object.

## Example
Let's say we create a text input field using the following code:
::: code-group 
```javascript [script setup]
import { ref } from 'vue'

const form = ref({
  model: { productCode: '' },
  schema: {
    fields: [
      {
        type: 'input',
        inputType: 'text',
        model: 'productCode',
        label: 'Redeem product code',
        placeholder: 'xxxx-xxxx-xxxx-xxxx'
      }
    ]
  }
})
```
```vue [template]
<template>
  <vue-form-generator :schema="form.schema" :model="form.model" />
</template>
```
:::
<ValidatorExample />

The placeholder would suggest only a value following this format (`xxxx-xxxx-xxxx-xxxx`) would be valid input. But,
because we're not using any validators here, any value is accepted. Let's create a validator function to change that.

```javascript
function productCodeValidator (value, field, model) {
  return value.match(/^[a-z]{4}-[a-z]{4}-[a-z]{4}-[a-z]{4}$/)
}
```
Now, add this validator function to the `validator` property inside the field schema, like so:

```javascript
import { ref } from 'vue'

function productCodeValidator (value, field, model) {
  return value.match(/^[a-z]{4}-[a-z]{4}-[a-z]{4}-[a-z]{4}$/)
}

const form = ref({
  model: { productCode: '' },
  schema: {
    fields: [
      {
        type: 'input',
        inputType: 'text',
        model: 'productCode',
        label: 'Redeem product code',
        placeholder: 'xxxx-xxxx-xxxx-xxxx',
        validator: productCodeValidator // [!code focus]
      }
    ]
  }
})
```

::: info
You can add multiple validators by passing an Array of validator functions to the `validator` property
:::

<ValidatorExample include-validator />


## Error messages
The default error message for validators that don't have a message set is `'Field is invalid'`. You can add your own
error messages by passing a messages object inside the plugin options. Where each key should correspond to the name of 
a validator function, and it's key is the error message that will be displayed.

::: code-group
```javascript [main.js]
// other imports
import VueFormGenerator from '@kevinkosterr/vue3-form-generator'

app.use(VueFormGenerator, { 
  messages: {
    'productCodeValidator': 'Your product code is invalid'
  }
}).mount('#app')
```
:::

