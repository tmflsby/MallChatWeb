<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

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

const { icon, size, rotate, spin, colorful } = withDefaults(defineProps<Props>(), {
  size: 16,
})

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
    styles.fontSize = typeof size === 'number' ? `${size}px` : size
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
