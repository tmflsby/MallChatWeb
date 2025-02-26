import { defineStore } from 'pinia'
import { ref } from 'vue'
import apis from '@/services/apis.ts'
import type { UserInfoType } from '@/services/types.ts'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<Partial<UserInfoType>>({})
  const isSign = ref(false)

  let localUserInfo = {}
  try {
    localUserInfo = JSON.parse(localStorage.getItem('USER_INFO') || '{}')
  } catch (error) {
    console.error(error)
    localUserInfo = {}
  }

  // 从 local读取
  if (!Object.keys(userInfo.value).length && Object.keys(localUserInfo).length) {
    userInfo.value = localUserInfo
  }

  const getUserDetailAction = () => {
    apis
      .getUserDetail()
      .send()
      .then((data) => {
        userInfo.value = { ...userInfo.value, ...data }
      })
      .catch(() => {
        // 删除缓存
        localStorage.removeItem('TOKEN')
        localStorage.removeItem('USER_INFO')
      })
  }

  return {
    userInfo,
    isSign,
    getUserDetailAction,
  }
})
