<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'
import { isNumber } from '@/utils'

interface Props {
  /** 图标名称 */
  icon: string
  /** 图标尺寸 */
  size?: number | string
  /** 旋转角度 */
  rotate?: number
  /** 加载态 */
  spin?: boolean
  /** 是否多色 */
  colorful?: boolean
}

const { icon, size = 16, rotate, spin, colorful } = defineProps<Props>()

const iconCls = computed(() => {
  return [
    {
      mallchat: !colorful,
      mallchatcolor: colorful,
      [`icon-spin`]: spin,
    },
    `icon-${icon}`,
  ]
})

const innerStyle = computed(() => {
  const styles: CSSProperties = {}
  if (size) {
    styles.fontSize = isNumber(size) ? `${size}px` : size
  }
  if (rotate) {
    styles.transform = `rotate(${rotate}deg)`
  }
  return styles
})
</script>

<template>
  <i :class="iconCls" :style="innerStyle" />
</template>

<style scoped></style>
