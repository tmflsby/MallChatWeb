import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'
import VueHook from 'alova/vue'
import { ElMessage } from 'element-plus'

const getToken = () => {
  let tempToken = ''
  return {
    get: () => {
      if (tempToken) return tempToken
      const token = localStorage.getItem('TOKEN')
      if (token) {
        tempToken = token
      }
      return token
    },
    clear: () => {
      tempToken = ''
    },
  }
}

export const computedToken = getToken()

export const alovaInstance = createAlova({
  baseURL: '',
  statesHook: VueHook,
  requestAdapter: adapterFetch(),
  beforeRequest: (method) => {
    method.config.headers = {
      ...method.config.headers,
      Authorization: `Bearer ${computedToken.get()}`,
      ContentType: 'application/json; charset=utf-8',
    }
  },
  responded: async (response) => {
    const json = await response.json()
    if (response.status !== 200 || !json.success) {
      if (json.errMsg) {
        // 空 token 且 状态码 401 不弹提示
        if (!computedToken.get() && response.status === 401) {
          //
        } else {
          ElMessage.error(json.errMsg)
        }
        throw new Error(json.errMsg)
      } else {
        throw new Error(json.message)
      }
    }
    return json.data
  },
})
