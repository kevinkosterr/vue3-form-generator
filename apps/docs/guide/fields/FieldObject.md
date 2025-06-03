# FieldObject
`FieldObject` is a field that has its own `schema`, meaning the field itself
renders other fields. These fields will return their values to the object inside
the model that is assigned to the `FieldObject` component.

### type `object`

<script setup>
import FieldObjectExample from '/components/examples/fields/FieldObjectExample.vue'
</script>

## Basic example
::: details Code 
```js
const form = ref({
  model: {
    person: {
      name: '',
      surname: '',
      age: null
    }
  },
  schema: {
    fields: [
      {
        type: 'object',
        model: 'person',
        schema: {
          fields: [
            {
              type: 'input',
              inputType: 'text',
              model: 'name',
              label: 'Name'
            },
            {
              type: 'input',
              inputType: 'text',
              model: 'surname',
              label: 'Surname'
            },
            {
              type: 'input',
              inputType: 'number',
              model: 'age',
              label: 'Age'
            }
          ]
        }
      }
    ]
  }
})
```
:::
<FieldObjectExample/>

## With validators
::: details Code
```js
function minLengthThree (value) {
  return value && value.length >= 3
}

function overEighteen (value) {
  return value && value >= 18
}

// ......
fields: [
      {
        type: 'object',
        model: 'person',
        schema: {
          fields: [
            {
              type: 'input',
              inputType: 'text',
              model: 'name',
              label: 'Name',
              validator: minLengthThree
            },
            {
              type: 'input',
              inputType: 'text',
              model: 'surname',
              label: 'Surname',
              validator: minLengthThree
            },
            {
              type: 'input',
              inputType: 'number',
              model: 'age',
              label: 'Age',
              validator: overEighteen
            }
          ]
        }
      }
  ]
```
:::
::: info
In this example, `name` and `surname` must have a length of three letters or more, `age` must be at least 18.
:::
<FieldObjectExample add-validators/>


## Properties
| Property | Default | Type     | Description                                 |
|----------|---------|----------|---------------------------------------------|
| schema   | `{}`    | `Object` | A form schema, as seen in `FormGenerator.vue` |