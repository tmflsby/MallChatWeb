import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'
import VueHook from 'alova/vue'

export const alovaInstance = createAlova({
  baseURL: '',
  statesHook: VueHook,
  requestAdapter: adapterFetch(),
  beforeRequest: (method) => {
    return method
  },
  responded: (response) => {
    return response
  },
})
