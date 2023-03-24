import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'

const app = createApp(App).use(router)
app.config.globalProperties.TWA = window.Telegram.WebApp
app.mount('#app')
