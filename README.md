# Vue 3 Form Generator
![GitHub last commit](https://img.shields.io/github/last-commit/kevinkosterr/vue3-form-generator?logo=github)
![Static Badge](https://img.shields.io/badge/Vue%20version-3.x.x-green?logo=vue.js)
![NPM Version](https://img.shields.io/npm/v/%40kevinkosterr%2Fvue3-form-generator?logo=npm)
![GitHub License](https://img.shields.io/github/license/kevinkosterr/vue3-form-generator)
<br>
A schema-based form generator component for Vue 3, based on `vue-form-generator`


## Basic usage
1. Install plugin in your Vue app, this will make all necessary components globally available in your app.
```javascript
// ...

import VueFormGenerator from '@kevinkosterr/vue3-form-generator'

app.use(VueFormGenerator)

// ...
```
2. Define a schema inside your Vue component
<br><br>
#### Composition API:
```vue
<template>
  <vue-form-generator :schema="form.schema" :model="form.model"/>
</template>

<script setup>
  import { ref } from 'vue'
  
  const form = ref({
    model: {
      name: '',
      terms: false,
    },
    schema: {
      fields: [
        {
          name: 'name',
          label: 'Name',
          type: 'input',
          inputType: 'text',
          model: 'name',
          placeholder: "Write name...",
          readonly: false,
          required: true,
        },
        {
          name: 'terms',
          label: 'Accept terms and conditions',
          type: 'input',
          inputType: 'checkbox',
          model: 'terms',
        }
      ]
    }
  })
</script>
```
#### Options API:
```vue
<template>
  <vue-form-generator :schema="form.schema" :model="form.model"/>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          model: {
            name: '',
          },
          schema: {
            fields: [
              {
                name: 'name',
                label: 'Name',
                type: 'input',
                inputType: 'text',
                model: 'name',
                placeholder: "Write name...",
                readonly: false,
                required: true,
              }
            ]
          }
        }
      }
    }
  }
</script>
```

