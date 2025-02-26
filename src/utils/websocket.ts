// import router from '@/router'
import { useWsLoginStore, LoginStatus } from '@/stores/ws.ts'
import { useUserStore } from '@/stores/user.ts'
// import { useChatStore } from '@/stores/chat.ts'
// import { useGroupStore } from '@/stores/group.ts'
// import { useEmojiStore } from '@/stores/emoji.ts'
// import { useGlobalStore } from '@/stores/global.ts'
import { worker } from '@/utils/initWorker.ts'
import { computedToken } from '@/services/request.ts'
import { WsResponseMessageType } from '@/utils/wsType.ts'
import type { LoginSuccessResType, LoginInitResType, WsReqMsgContentType } from '@/utils/wsType.ts'

class WS {
  #tasks: WsReqMsgContentType[] = []
  // 重连
  #connectReady = false

  constructor() {
    this.initConnect()
    // 收到消息
    worker.addEventListener('message', this.onWorkerMsg)
  }

  initConnect = () => {
    const token = localStorage.getItem('TOKEN')
    // 如果token 是 null, 而且 localStorage 的用户信息有值，需要清空用户信息
    if (token === null && localStorage.getItem('USER_INFO')) {
      localStorage.removeItem('USER_INFO')
    }
    // 初始化 ws
    worker.postMessage(`{"type":"initWS","value":${token ? `"${token}"` : null}}`)
  }

  onWorkerMsg = (e: MessageEvent<unknown>) => {
    const params: { type: string; value: unknown } = JSON.parse(
      typeof e.data === 'string' ? e.data : JSON.stringify(e.data),
    )
    switch (params.type) {
      case 'message': {
        this.onMessage(params.value as string)
        break
      }
      case 'open': {
        this.#dealTasks()
        break
      }
      case 'close':
      case 'error': {
        this.#onClose()
        break
      }
    }
  }

  #onClose = () => {
    this.#connectReady = false
  }

  #dealTasks = () => {
    this.#connectReady = true
    // 先探测登录态
    // this.#detectionLoginStatus()

    setTimeout(() => {
      const userStore = useUserStore()
      const wsLoginStore = useWsLoginStore()
      if (userStore.isSign) {
        // 处理堆积的任务
        this.#tasks.forEach((task) => {
          this.send(task)
        })
        // 清空缓存的消息
        this.#tasks = []
      } else {
        // 如果没登录，而且已经请求了登录二维码，就要更新登录二维码。
        if (wsLoginStore.loginQrCode) {
          wsLoginStore.getLoginQrCode()
        }
      }
    }, 500)
  }

  #send(msg: WsReqMsgContentType) {
    worker.postMessage(
      `{"type":"message","value":${typeof msg === 'string' ? msg : JSON.stringify(msg)}}`,
    )
  }

  send = (params: WsReqMsgContentType) => {
    if (this.#connectReady) {
      this.#send(params)
    } else {
      // 放到队列
      this.#tasks.push(params)
    }
  }

  // 收到消息回调
  onMessage = (value: string) => {
    // FIXME 可能需要 try catch,
    const params: { type: WsResponseMessageType; data: unknown } = JSON.parse(value)
    const loginStore = useWsLoginStore()
    const userStore = useUserStore()
    // const chatStore = useChatStore()
    // const groupStore = useGroupStore()
    // const globalStore = useGlobalStore()
    // const emojiStore = useEmojiStore()
    switch (params.type) {
      // 获取登录二维码
      case WsResponseMessageType.LoginQrCode: {
        const data = params.data as LoginInitResType
        loginStore.loginQrCode = data.loginUrl
        break
      }
      // 等待授权
      case WsResponseMessageType.WaitingAuthorize: {
        loginStore.loginStatus = LoginStatus.Waiting
        break
      }
      // 登录成功
      case WsResponseMessageType.LoginSuccess: {
        userStore.isSign = true
        const { token, ...rest } = params.data as LoginSuccessResType
        // FIXME 可以不需要赋值了，单独请求了接口。
        userStore.userInfo = { ...userStore.userInfo, ...rest }
        localStorage.setItem('USER_INFO', JSON.stringify(rest))
        localStorage.setItem('TOKEN', token)
        // 更新一下请求里面的 token.
        computedToken.clear()
        computedToken.get()
        loginStore.loginStatus = LoginStatus.Success
        // 获取用户详情
        userStore.getUserDetailAction()
        // 关闭登录弹窗
        loginStore.showLogin = false
        // 清空登录二维码
        loginStore.loginQrCode = undefined
        break
      }
      default: {
        console.log('接收到未处理类型的消息:', params)
        break
      }
    }
  }
}

export default new WS()
