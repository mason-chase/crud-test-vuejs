import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import App from './App.vue'

import '@/assets/main.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons/faUserPlus'
import { faUserPen } from '@fortawesome/free-solid-svg-icons/faUserPen'
import { faUserMinus } from '@fortawesome/free-solid-svg-icons/faUserMinus'
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons/faXmarkCircle'
library.add(faUserPlus, faUserPen, faUserMinus, faXmarkCircle)

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

const app = createApp(App)
app.use(pinia)
app.component('svg-icon', FontAwesomeIcon)
app.mount('#app')
