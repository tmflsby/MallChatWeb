import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useGlobalStore = defineStore('global', () => {
  const unReadMark = reactive<{ newFriendUnreadCount: number; newMsgUnreadCount: number }>({
    newFriendUnreadCount: 5,
    newMsgUnreadCount: 6,
  })

  return {
    unReadMark,
  }
})
