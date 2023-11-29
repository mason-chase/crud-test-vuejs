import { createApp } from 'vue'
import App from './App.vue'
import router from './infrastructure/router'
import { listenRemoteRoutes } from './infrastructure/router/remoteRoutes'

const app = createApp(App)
listenRemoteRoutes(router);

app.use(router);

app.mount('#app')
