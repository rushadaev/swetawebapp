import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { io } from 'socket.io-client';


const app = createApp(App).use(router, io)
app.config.globalProperties.TWA = window.Telegram.WebApp
app.mount('#app')
