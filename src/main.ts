import { createApp } from 'vue'
import './assets/global.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import 'primeicons/primeicons.css'
import { router } from './router'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(PrimeVue, {
  theme: {
    ripple: false,
    preset: Aura,
    options: {
      darkModeSelector: false,
    },
  },
})
app.use(router)
app.mount('#app')

// create router -> npm install vue-router@4
// create pinia -> npm install pinia
