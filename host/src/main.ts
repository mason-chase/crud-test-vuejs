import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './presentation/views/App.vue'
import router from './infrastructure/router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { listenRemoteRoutes } from './infrastructure/router/remoteRoutes'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

listenRemoteRoutes(router)

app.use(router)
app.use(pinia)

app.mount('#app')
