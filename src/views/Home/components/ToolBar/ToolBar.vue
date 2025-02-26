<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user.ts'
import { useGlobalStore } from '@/stores/global.ts'
import { judgeClient } from '@/utils/detectDevice.ts'

const userStore = useUserStore()
const avatar = computed(() => userStore?.userInfo.avatar)

const globalStore = useGlobalStore()
const unReadMark = computed(() => globalStore.unReadMark)

const client = judgeClient()
const isPc = computed(() => client === 'PC')

const visible = ref(false)
const showSettingBox = () => (visible.value = true)

const menuList = [
  {
    name: '后端源码',
    desc: 'MallChatWeb Server',
    icon: 'github',
    handler: () => {
      window.open('https://github.com/zongzibinbin/MallChat', '_blank')
    },
  },
  {
    name: '前端源码',
    desc: 'MallChatWeb Web',
    icon: 'github',
    handler: () => {
      window.open('https://github.com/tmflsby/MallChatWeb', '_blank')
    },
  },
]
</script>

<template>
  <aside
    class="side-toolbar flex flex-col items-center w-80px p-x-0 p-y-20px select-none"
    style="color: var(--font-main)"
  >
    <BaseAvatar
      :src="userStore.isSign ? avatar : ''"
      :size="isPc ? 50 : 40"
      v-login="showSettingBox"
    />
    <div class="flex flex-col gap-y-8px mt-16px">
      <!--   会话   -->
      <RouterLink exactActiveClass="tool-icon-active" to="/">
        <ElBadge
          :value="unReadMark.newMsgUnreadCount"
          :hidden="unReadMark.newMsgUnreadCount === 0"
          :max="99"
        >
          <BaseIcon class="flex-cc w-50px h50px" icon="chat" :size="28" />
        </ElBadge>
      </RouterLink>
      <!--   联系人   -->
      <RouterLink exactActiveClass="tool-icon-active" to="/contact">
        <ElBadge
          :value="unReadMark.newFriendUnreadCount"
          :hidden="unReadMark.newFriendUnreadCount === 0"
          :max="99"
        >
          <BaseIcon class="flex-cc w-50px h50px" icon="group" :size="28" />
        </ElBadge>
      </RouterLink>
    </div>
    <div class="menu flex-ec flex-col flex-1">
      <a
        class="menu-item flex flex-col items-center m-x-0 m-y-6px text-center"
        style="line-height: 1.2"
        v-for="menu in menuList"
        :key="menu.name"
        :title="menu.desc"
        @click="menu.handler"
      >
        <BaseIcon :icon="menu.icon" :size="28" colorful />
        <span v-if="menu.name" class="menu-item-name mt-4px text-12px whitespace-nowrap">
          {{ menu.name }}
        </span>
      </a>
    </div>
    <BaseIcon class="hidden" icon="zhankai" :size="28" />
  </aside>
</template>

<style lang="scss" scoped>
@media only screen and (max-width: 640px) {
  .side-toolbar {
    flex-direction: row;
    width: 100%;
    height: 44px;
    padding: 0 16px;
    margin-top: 16px;
    .menu {
      flex-direction: row;
      justify-content: flex-start;
      margin: 0 8px;
      overflow-y: auto;
      &-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 8px;
        line-height: 1.2;
        text-align: center;
      }
    }
    .mallchatcolor {
      display: block;
      font-size: 23px !important;
      line-height: 28px;
    }
    .icon-zhankai {
      display: block;
    }
    ::-webkit-scrollbar {
      width: 1px;
      height: 1px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: var(--background-2);
    }

    ::-webkit-scrollbar-track {
      background-color: var(--background);
    }
  }
}
.tool-icon-active {
  color: var(--color-primary);
  background-color: var(--background-secondary);
  border-radius: 8px;
  transition: background-color 0.3s;
  &:hover {
    background-color: var(--background-secondary);
  }
}
</style>
