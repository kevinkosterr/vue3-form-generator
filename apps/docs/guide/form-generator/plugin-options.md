These are options you can pass to the plugin when installing it into your app.

## Usage

```ts
import VueFormGenerator from '@kevinkosterr/vue3-form-generator'

app.use(
  VueFormGenerator,
  {} // Your options go here.
)
```

## `aliases`
> An object where the component names are the keys and their aliases are its values.
```ts
{
  aliases: {
    'FieldText': 'FieldTextInput'
  }
}
```
When defining something like this, the `type` inside a schema changes to everything 
after `"Field"`, so in this example a new schema would look like this:
```ts
{
  type: 'textinput',
  // Other code...
}
```

## `components`
> An array of objects with two properties, `name` and `component` where name is the name of the component (must start with `"Field"`)
> and component is the component instance.
```ts
import FieldTest from '@/components/FieldTest.vue'

{
  components: [
    {
      name: 'FieldTest',
      component: FieldTest
    }
  ]
}
```

## `excludedComponents`
> An array of field component names to exclude from the global components, this makes it
> so the components can't be used inside your forms.
```ts
{
  excludedComponents: [ 'FieldObject', 'FieldNumber' ]
}
```

## `messages`
> An object where the keys are the validator function names and the values its error messages.
> This is for showing specific messages for your custom or existing components.
```ts
{
  messages: { 
    'yourcustomvalidator': 'This is not valid, man!'
  }
}
```