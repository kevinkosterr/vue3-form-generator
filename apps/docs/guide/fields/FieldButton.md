# FieldButton
`FieldButton` is a field component that renders a standard HTML button element.

### type `button`

## Basic example
<script setup>
import FieldButtonExampleWithSideEffect from '/components/FieldButtonExampleWithSideEffect.vue'
import FieldButtonExample from '/components/FieldButtonExample.vue'
</script>

::: details Code
```javascript
{
  type: 'button',
  buttonText: 'Show me something',
  onClick: () => {
    alert('Here it is!')
  }
}
```
:::

<FieldButtonExample />

## Example with side effect
::: details Code
```javascript
{
  model: {
    checkboxExample: false
  },
  schema: {
    fields: [
      {
        type: 'input',
        inputType: 'checkbox',
        model: 'checkboxExample'
      },
      {
        type: 'button',
        buttonText: 'Magically check the box',
        onClick: (model, field) => {
          model.checkboxExample = true
          field.buttonText = 'Wow! Incredible!'
        }
      }
    ]
  }
}
```
:::

<FieldButtonExampleWithSideEffect />

## Properties
| Property      | Default | Type       | Description                                                                    |
|---------------|---------|------------|--------------------------------------------------------------------------------|
| buttonText    | ``   | `String`   | Text to display on the button                                                  |
| buttonClasses | ``   | `String`   | String of classes to add to the button                                         |
| onClick       | -       | `Function` | Function to execute when clicked, gets passed `model` and `field` as arguments |