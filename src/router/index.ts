import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { setupRouterGuard } from '@/router/guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home/HomeView.vue'),
      children: [
        {
          path: '',
          name: 'HomeChat',
          component: () => import('@/views/Home/Chat/HomeChatView.vue'),
        },
        {
          path: 'contact',
          name: 'HomeContact',
          component: () => import('@/views/Home/Contact/HomeContactView.vue'),
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
