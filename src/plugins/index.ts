import { setupStyle } from '@/plugins/style'
import { setupElementPlus } from '@/plugins/elementPlus'
import { setupUnoCSS } from '@/plugins/unocss'

export const setupPlugins = () => {
  setupStyle()
  setupElementPlus()
  setupUnoCSS()
}
