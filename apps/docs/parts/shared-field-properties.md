| Property    | Default    | Type                                        | Description                                                                                     |
|-------------|------------|---------------------------------------------|-------------------------------------------------------------------------------------------------|
| name        | -          | `string`                                    | Name of the field                                                                               |
| model       | -          | `string`                                    | Key of model in the form schema model                                                           |
| label       | -          | `string`                                    | Label for the field                                                                             |
| type        | -          | `string`                                    | Type of field, generally `input` if the field is an input.                                      |
| inputType   | -          | `string`                                    | Type of input, only required when `type === 'input'`                                             |
| id          | _computed_ | `string`                                    | `id` of the field                                                                               |
| visible     | `true`     | `Boolean \| Function`                       | Whether the field is visible, method will be passed the `model`, `field` and field component*   |
| required    | `false`    | `Boolean \| Function`                       | Whether the field is required, method will be passed the `model`, `field` and field component*  |
| readonly    | `false`    | `Boolean \| Function`                       | Whether the field is read only, method will be passed the `model`, `field` and field component* |
| disabled    | `false`    | `Boolean \| Function`                       | Whether the field is disabled, method will be passed the `model`, `field` and field component*  |
| hint        | -          | `string \| Function`                        | Hint to display underneath the field, can be passed a method*                                   |
| validator   | _computed_ | `Array<Function> \| Function  \| undefined` | A (list of) validator(s) to be validating the field against.                                    |
| onValidated | -          | `Function  \| undefined`                    | Method to be called after validation has been completed.                                        |

_*_ see [determineDynamicAttribute()](/guide/mixins/abstractField#determinedynamicattribute) for more information.