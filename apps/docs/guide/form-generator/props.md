---
outline: [ 2,3 ]
---

## Overview

| Prop       | Type     | Description                                         |
|------------|----------|-----------------------------------------------------|
| `schema`   | `Object` | Form schema, filled with field groups and/or fields |
| `model`    | `Object` | Model object, contains all form data                |
| `idPrefix` | `string` | Prefix for all the generated ids in the form        |

## `model`
Type: `Object`

A model consists of keys that each have their own value and type of value. The value initially set in the model will
determine the type of the value, and the initial model value. 

```javascript
{
  firstName: '', 
  lastName: '', 
  iAmLukeSkywalker: false
}
```

## `schema`

Type: `Object`

### Properties
| Property | Type            | Description            |
|----------|-----------------|------------------------|
| `fields` | `Array<Object>` | Array of field objects |
| `groups` | `Array<Group>`  | Array of field objects |

#### Group
| Property | Type            | Description                              |
|----------|-----------------|------------------------------------------|
| `legend` | `string`        | Form group header, `legend` HTML element |
| `fields` | `Array<Object>` | Array of field objects                   |

```javascript
{
  fields: [
    {
      name: 'first_name',
      label: 'First name',
      model: 'firstName', // corresponds to `firstName` key in model object.
      type: 'input',
      inputType: 'text'
    },
    {
      name: 'last_name',
      label: 'Last name',
      model: 'lastName' // corresponds to `lastName` key in model object.
      type: 'input',
      inputType: 'text'
    }
  ],
    groups: [
    {
      legend: 'More information',
      fields: [
        {
          name: 'luke_skywalker',
          label: 'I am Luke Skywalker',
          model: 'iAmLukeSkywalker',
          type: 'input',
          inputType: 'checkbox'
        },
        {
          buttonText: 'This is me',
          type: 'submit'
        }
      ]
    }
  ]
}
```

## Result

<script setup>
import { ref } from 'vue'

const form = ref({
	model: {
		firstName: '',
        lastName: '',
iAmLukeSkywalker: false
	},
	schema: {
  fields: [
    {
      name: 'first_name',
      label: 'First name',
      model: 'firstName', // corresponds to `firstName` key in model object.
        type: 'input',
        inputType: 'text'
        
    },
    {
      name: 'last_name',
      label: 'Last name',
      model: 'lastName', // corresponds to `lastName` key in model object.
        type: 'input',
        inputType: 'text'
    }
  ],
    groups: [
    {
      legend: 'More information',
      fields: [
        {
          name: 'luke_skywalker',
          label: 'I am Luke Skywalker',
          model: 'iAmLukeSkywalker',
            type: 'input',
          inputType: 'checkbox'
        },
        {
          buttonText: 'This is me',
          type: 'submit'
        }
      ]
    }
  ]
}
})
</script>

<pre><code>{{ form.model }}</code></pre>
<vue-form-generator :schema="form.schema" :model="form.model"/>
