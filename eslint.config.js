import pluginVue from 'eslint-plugin-vue'
import stylistic from '@stylistic/eslint-plugin'
import alias from 'eslint-plugin-import-alias'

export default [
  ...pluginVue.configs['flat/recommended'],
  {
    plugins: {
      '@stylistic': stylistic,
      'import-alias': alias
    },
    rules: {
      'vue/no-unused-vars': 'warn',
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-component-names': 'off',
      '@stylistic/array-bracket-spacing': [ 1, 'always' ],
      '@stylistic/indent': [ 'error', 2 ],
      '@stylistic/object-curly-spacing': [ 1, 'always' ],
      '@stylistic/quotes': [ 1, 'single' ],
      '@stylistic/quote-props': [ 1, 'consistent-as-needed' ],
      '@stylistic/no-trailing-spaces': 'error',
      'max-len': [ 'error', { code: 120 } ],
      'comma-dangle': [ 'error', 'never' ],
      'semi': [ 'error', 'never' ],
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      'vue/max-attributes-per-line': [ 'error', {
        singleline: {
          max: 4
        },
        multiline: {
          max: 3
        }
      } ],
      'import-alias/import-alias': [
        'error',
        {
          relativeDepth: 0,
          aliases: [
            { alias: '@', matcher: '^src' }
          ]
        }
      ]
    }
  }
]