import type { App } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const pinia = createPinia()

pinia.use(createPersistedState())

export const setupStore = (app: App) => {
  app.use(pinia)
}
