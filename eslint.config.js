import pluginVue from 'eslint-plugin-vue'

export default [
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      'vue/no-unused-vars': 'warn',
      'vue/multi-word-component-names': 'off'
    }
  }
]