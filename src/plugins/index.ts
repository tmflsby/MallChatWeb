import type { App } from 'vue'
import { setupElementPlus } from '@/plugins/elementPlus'
import { setupUnoCSS } from '@/plugins/unocss'

export const setupPlugins = (app: App) => {
  setupElementPlus()
  setupUnoCSS()
}
