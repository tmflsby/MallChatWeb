import { createApp } from 'vue'
import { setupPlugins } from '@/plugins'
import { setupStore } from '@/stores'
import { setupRouter } from '@/router'

import App from '@/App.vue'

const app = createApp(App)

setupPlugins()
setupStore(app)
setupRouter(app)

app.mount('#app')
