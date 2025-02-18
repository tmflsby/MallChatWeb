<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  /** 头像地址 */
  src?: string
  /** 头像尺寸 */
  size?: number | string
  /** 头像形状 */
  shape?: 'circle' | 'square'
  /** 是否有边框 */
  bordered?: boolean
  /** 是否显示状态 */
  showStatus?: boolean
  /** 在线状态 */
  online?: boolean
}

withDefaults(defineProps<Props>(), {
  src: '',
  size: 40,
  shape: 'circle',
  bordered: false,
  showStatus: false,
  online: true,
})

const hasError = ref(false)
</script>

<template>
  <div
    :class="[
      'pos-relative',
      'box-border',
      'lh-none',
      'ws-nowrap',
      'v-mid',
      'cursor-pointer',
      'select-none',
      `avatar-${shape}`,
      { offline: !online },
    ]"
    :style="{
      width: typeof size === 'number' ? size + 'px' : size,
      height: typeof size === 'number' ? size + 'px' : size,
    }"
  >
    <template v-if="src">
      <BaseIcon v-if="hasError" icon="avatar" :size="size" />
      <img v-else class="wh-full select-none" :src="src" alt="avatar" @error="hasError = true" />
    </template>
    <slot v-else>
      <BaseIcon icon="avatar" :size="size" />
    </slot>
    <i
      v-if="showStatus"
      class="pos-absolute right-0 bottom-0 z-1 w-30% h-30% b-rd-50%"
      style="background-color: var(--color-online)"
    />
  </div>
</template>

<style lang="scss" scoped>
.offline {
  filter: grayscale(1);
}
.avatar-circle {
  border-radius: 50%;
  img {
    border-radius: 50%;
  }
}
.avatar-square {
  border-radius: 8px;
  img {
    overflow: hidden;
    border-radius: 8px;
  }
}
</style>
