import { createApp } from 'vue'
import i18n from './i18n'
import { createVuestic } from 'vuestic-ui'
import { createGtm } from '@gtm-support/vue-gtm'

import stores from './stores'
import router from './router'
import vuesticGlobalConfig from './services/vuestic-ui/global-config'
import App from './App.vue'

// Dodavanje importa za useColors
import { useColors } from 'vuestic-ui'

const app = createApp(App)

app.use(stores)
app.use(router)
app.use(i18n)

app.use(createVuestic({ config: vuesticGlobalConfig }))

// Dodavanje funkcije za rad s bojama
const { applyPreset } = useColors()
// Postavljanje početne teme
applyPreset('dark')

if (import.meta.env.VITE_APP_GTM_ENABLED) {
  app.use(
    createGtm({
      id: import.meta.env.VITE_APP_GTM_KEY,
      debug: false,
      vueRouter: router,
    }),
  )
}

app.mount('#app')
