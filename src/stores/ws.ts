import { defineStore } from 'pinia'
import { ref } from 'vue'
import { WsRequestMsgType } from '@/utils/wsType.ts'
import wsIns from '@/utils/websocket.ts'

export enum LoginStatus {
  Init,
  Waiting,
  Success,
}

export const useWsLoginStore = defineStore('wsLogin', () => {
  const loginQrCode = ref<string>()
  const loginStatus = ref(LoginStatus.Init)
  const showLogin = ref(false)

  const getLoginQrCode = () => {
    wsIns.send({ type: WsRequestMsgType.RequestLoginQrCode })
  }

  const resetLoginState = () => {
    loginQrCode.value = undefined
    loginStatus.value = LoginStatus.Init
  }

  return {
    loginQrCode,
    loginStatus,
    showLogin,
    getLoginQrCode,
    resetLoginState,
  }
})
