import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import JsonViewer from 'vue3-json-viewer'
import "vue3-json-viewer/dist/index.css";

createApp(App).use(JsonViewer).mount('#app')
