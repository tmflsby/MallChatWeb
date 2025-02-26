import type { App } from 'vue'
import { vLogin } from '@/plugins/directives/vLogin.ts'
import { vLoginShow } from '@/plugins/directives/vLoginShow.ts'

export const setupDirectives = (app: App) => {
  app.directive('login', vLogin)
  app.directive('login-show', vLoginShow)
}
