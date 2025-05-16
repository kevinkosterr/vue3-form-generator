## What is Vue Form Generator?
Vue Form Generator (`vue3-form-generator`) is a schema-based form generator component, based on the original 
[`vue-form-generator`](https://github.com/vue-generators/vue-form-generator). This package is built for Vue 3 and aims 
to have as little dependencies as possible.

All components are (mostly) un-styled out of the box. However, you can load one of the available themes from the `themes`
folder inside the package.

## Installation
Use one of the following commands to install the package:
::: code-group

```bash [pnpm]
pnpm add @kevinkosterr/vue3-form-generator
```

```bash [npm]
npm install @kevinkosterr/vue3-form-generator
```

```bash [yarn]
yarn add @kevinkosterr/vue3-form-generator
```

:::

Now, to start using the components you'll need to install the plugin inside your main file. By default, the components
are completely un-styled.

::: code-group
```javascript [main.js]
import { createApp } from 'vue'
import App from './App.vue'

import VueFormGenerator from '@kevinkosterr/vue3-form-generator'

const app = createApp(App).use(VueFormGenerator)
```
:::

You can load one of the available themes by importing it inside your `main.js` file.
```javascript
import '@kevinkosterr/vue3-form-generator/themes/basic.css'
// or
import '@kevinkosterr/vue3-form-generator/themes/legacy.css' // Most of the styling from the old vue-form-generator library
```

## Basic example

::: code-group

```vue [Composition API]
<template>
	<vue-form-generator :schema="form.schema" :model="form.model"/>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
	model: {
		readTutorial: false
	},
	schema: {
		fields: [
			{
				name: 'tutorialRead',
				label: 'Have you read the tutorial?',
				model: 'readTutorial', // string reference to key in model
				type: 'input',
				inputType: 'checkbox'
			}
		]
	}
})
</script>
```

```vue [Options API]
<template>
	<vue-form-generator :schema="form.schema" :model="form.model"/>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          model: {
            readTutorial: false
          },
          schema: {
            fields: [
              {
                name: 'tutorialRead',
                label: 'Have you read the tutorial?',
                model: 'readTutorial', // string reference to key in model
                type: 'input',
                inputType: 'checkbox'
              }
            ]
          }
        }
      }
    }
  }
</script>
```

:::

#### Result

<script setup>
import { ref } from 'vue';

const form = ref({
	model: {
		readTutorial: false
	},
	schema: {
		fields: [
			{
				name: 'tutorialRead',
				label: 'Have you read the tutorial?',
				model: 'readTutorial', // string reference to key in model
				type: 'input',
				inputType: 'checkbox'
			}
		]
	}
})
</script>
 
readTutorial: <code>{{ form.model.readTutorial }}</code>
<vue-form-generator :schema="form.schema" :model="form.model"/>
