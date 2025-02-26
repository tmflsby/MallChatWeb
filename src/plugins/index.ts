import type { App } from 'vue'
import { setupStyle } from '@/plugins/style'
import { setupElementPlus } from '@/plugins/elementPlus'
import { setupUnoCSS } from '@/plugins/unocss'
import { setupDirectives } from '@/plugins/directives'
import { setupWS } from '@/plugins/ws'

export const setupPlugins = (app: App) => {
  setupStyle()
  setupElementPlus()
  setupUnoCSS()
  setupDirectives(app)
  setupWS()
}
