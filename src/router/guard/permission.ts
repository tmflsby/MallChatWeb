import type { Router } from 'vue-router'

export const setupPermissionGuard = (router: Router) => {
  router.beforeEach((to, from, next) => {
    console.log('permission guard')
    next()
  })
}
