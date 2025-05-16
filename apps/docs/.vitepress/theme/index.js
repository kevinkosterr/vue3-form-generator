import DefaultTheme from 'vitepress/theme'
import VueFormGenerator from '@/index'

import './index.css'
import '@/scss/themes/basic.scss'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(VueFormGenerator, {
      messages: {
        productCodeValidator: 'Your product code is invalid'
      }
    })
  }
}