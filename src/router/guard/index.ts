import type { Router } from 'vue-router'
import { setupPermissionGuard } from '@/router/guard/permission.ts'

export const setupRouterGuard = (router: Router) => {
  setupPermissionGuard(router)
}
