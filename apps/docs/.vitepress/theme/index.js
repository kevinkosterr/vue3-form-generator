import DefaultTheme from 'vitepress/theme'
import VueFormGenerator from '@/index'

import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'

import './index.css'
import '@/scss/themes/basic.scss'
import 'virtual:group-icons.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    enhanceAppWithTabs(app)
    app.use(VueFormGenerator, {
      messages: {
        productCodeValidator: 'Your product code is invalid'
      }
    })
  }
}