<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useWsLoginStore, LoginStatus } from '@/stores/ws.ts'
import QrCode from 'qrcode.vue'

const loginStore = useWsLoginStore()
const visible = computed({
  get() {
    return loginStore.showLogin
  },
  set(value) {
    loginStore.showLogin = value
  },
})

const loginQrCode = computed(() => loginStore.loginQrCode)
const loginStatus = computed(() => loginStore.loginStatus)

watchEffect(() => {
  // 打开窗口了 而且 二维码没获取，而且非登录就去获取二维码
  if (visible.value && !loginQrCode.value) {
    // 获取登录二维码
    loginStore.getLoginQrCode()
  }
})
</script>

<template>
  <ElDialog class="login-box-dialog" :width="376" v-model="visible" center>
    <div class="flex flex-col items-center">
      <img class="w-100px b-rd-8px" src="@/assets/logo.jpeg" alt="MallChat" />
      <p class="mt-12px mb-16px text-14px" style="color: var(--font-light)">边聊边买，岂不快哉~</p>
      <div class="w-328px h-328px" v-loading="!loginQrCode">
        <QrCode v-if="loginQrCode" :value="loginQrCode" :size="328" :margin="5" />
      </div>
      <p class="flex items-center h-32px mt-16px" v-if="loginStatus === LoginStatus.Waiting">
        <ElIcon class="mr-8px" color="var(--color-wechat)" :size="32">
          <IEpSuccessFilled />
        </ElIcon>
        扫码成功~，点击“登录”继续登录
      </p>
      <p class="flex items-center h-32px mt-16px" v-if="loginStatus === LoginStatus.Init">
        使用 「<strong class="font-bold" style="color: var(--color-wechat)">微信</strong>」
        扫描二维码登录~~
      </p>
    </div>
  </ElDialog>
</template>

<style scoped lang="scss">
:global(.login-box-dialog) {
  border-radius: 8px !important;
}

:global(.login-box-dialog .el-dialog__header) {
  padding: 0;
}

:global(.login-box-dialog .el-dialog__headerbtn) {
  z-index: 5;
}
</style>
