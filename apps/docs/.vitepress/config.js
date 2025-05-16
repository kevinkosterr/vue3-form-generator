import { defineConfig } from 'vitepress'
import path from 'path'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/vue3-form-generator/',
  title: 'Vue3 Form Generator',
  description: 'Documentation for vue3-form-generator',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting started', link: 'guide/introduction/getting-started' },
          { text: 'Field schema overview', link: 'guide/introduction/field-overview' }
        ]
      },
      {
        text: 'Customization',
        items: [
          { text: 'Custom field components', link: '/guide/customization/custom-components' },
          { text: 'Custom validators', link: '/guide/customization/custom-validators' }
        ]
      },
      {
        text: 'Composables',
        items: [
          { text: 'useFieldAttributes', link: '/guide/composables/useFieldAttributes' },
          { text: 'useFieldEmits', link: '/guide/composables/useFieldEmits' },
          { text: 'useFieldProps', link: '/guide/composables/useFieldProps' },
          { text: 'useFieldValidate', link: '/guide/composables/useFieldValidate' },
          { text: 'useFormModel', link: '/guide/composables/useFormModel' }
        ]
      },
      {
        text: 'Form Generator',
        items: [
          { text: 'Props', link: '/guide/form-generator/props' },
          { text: 'Events', link: '/guide/form-generator/events' }
        ]
      },
      {
        text: 'Fields',
        items: [
          { text: 'FieldButton', link: '/guide/fields/FieldButton' },
          { text: 'FieldCheckbox', link: '/guide/fields/FieldCheckbox' },
          { text: 'FieldColor', link: '/guide/fields/FieldColor' },
          { text: 'FieldMask', link: '/guide/fields/FieldMask' },
          { text: 'FieldNumber', link: '/guide/fields/FieldNumber' },
          { text: 'FieldPassword', link: '/guide/fields/FieldPassword' },
          { text: 'FieldRadio', link: '/guide/fields/FieldRadio' },
          { text: 'FieldReset', link: '/guide/fields/FieldReset' },
          { text: 'FieldSelect', link: '/guide/fields/FieldSelect' },
          { text: 'FieldSelectNative', link: '/guide/fields/FieldSelectNative' },
          { text: 'FieldSubmit', link: '/guide/fields/FieldSubmit' },
          { text: 'FieldSwitch', link: '/guide/fields/FieldSwitch' },
          { text: 'FieldText', link: '/guide/fields/FieldText' },
          { text: 'FieldTextarea', link: '/guide/fields/FieldTextarea' }
        ]
      },
      {
        text: 'Mixins <span class="VPBadge custom warning">deprecated</span>',
        items: [
          { text: 'abstractField', link: '/guide/mixins/abstractField' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kevinkosterr/vue3-form-generator' }
    ]
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../../../src')
      }
    }
  }
})
