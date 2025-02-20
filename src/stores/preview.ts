import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * 图片预览Store
 * */
export const useImagePreviewStore = defineStore('image', () => {
  const previewUrl = ref('')
  const isShowing = ref(false)

  const open = (url: string) => {
    previewUrl.value = url
    isShowing.value = true
  }

  const close = () => {
    previewUrl.value = ''
    isShowing.value = false
  }

  return {
    previewUrl,
    isShowing,
    open,
    close,
  }
})

/**
 * 音频预览Store
 * */
export const useAudioPreviewStore = defineStore('audio', () => {
  const previewUrl = ref('')
  const isPlaying = ref(false)
  const progress = ref(0)
  const audio = ref<HTMLAudioElement | null>(null)

  const close = () => {
    isPlaying.value = false
    progress.value = 0
    audio.value?.pause()
    audio.value?.removeEventListener('ended', () => {})
    audio.value = null
  }

  const open = async (url: string) => {
    if (isPlaying.value && previewUrl.value === url) {
      close()
      return
    }
    close()
    previewUrl.value = url
    audio.value = new Audio(url)
    await audio.value.play()
    isPlaying.value = true
    audio.value.addEventListener('ended', () => close())
  }

  return {
    previewUrl,
    isPlaying,
    open,
    close,
  }
})

/**
 * 视频预览Store
 * */
export const useVideoPreviewStore = defineStore('video', () => {
  const previewUrl = ref('')
  const isPlaying = ref(false)

  const open = (url: string) => {
    previewUrl.value = url
    isPlaying.value = true
  }

  const close = () => {
    previewUrl.value = ''
    isPlaying.value = false
  }

  return {
    previewUrl,
    isPlaying,
    open,
    close,
  }
})
