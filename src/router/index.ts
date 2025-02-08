import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { setupRouterGuard } from '@/router/guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeLayout',
      component: () => import('@/views/Home/HomeLayout.vue'),
      children: [
        {
          path: '',
          name: 'HomeChat',
          component: () => import('@/views/Home/Chat/HomeChat.vue'),
        },
        {
          path: 'contact',
          name: 'HomeContact',
          component: () => import('@/views/Home/Contact/HomeContact.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export const setupRouter = (app: App) => {
  app.use(router)
  setupRouterGuard(router)
}

export default router
