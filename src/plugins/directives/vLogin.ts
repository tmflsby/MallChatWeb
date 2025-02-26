import type { Directive } from 'vue'
import { useUserStore } from '@/stores/user.ts'
import { useWsLoginStore } from '@/stores/ws.ts'

const handler = (fn: () => void) => {
  const userStore = useUserStore()
  const wsLoginStore = useWsLoginStore()

  // 没登录先登录
  if (!userStore.isSign) {
    wsLoginStore.showLogin = true
    return
  }
  fn?.()
}

export const vLogin: Directive = {
  mounted(el, binding) {
    if (typeof binding.value !== 'function') return
    el.fn = handler.bind(el, binding.value)
    el.addEventListener('click', el.fn)
  },
  unmounted(el, binding) {
    if (typeof binding.value !== 'function') return
    el.removeEventListener('click', el.fn)
  },
}
