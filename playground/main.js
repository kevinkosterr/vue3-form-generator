import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import JsonViewer from 'vue3-json-viewer'
import VueFormGenerator from '@/index.ts'
import 'vue3-json-viewer/dist/index.css'
import './css/basic.css'

const app = createApp(App).use(JsonViewer)

app.use(VueFormGenerator)
app.mount('#app')
