import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import UnoCss from 'unocss/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import process from 'node:process'

type viteConfigType = {
  mode: string
  command: string
  isSsrBuild: boolean
  isPreview: boolean
  [key: string]: unknown
}

// https://vite.dev/config/
export default (viteConfig: viteConfigType) => {
  // console.log('viteConfig', viteConfig)
  const CWD = process.cwd()
  const env = loadEnv(viteConfig.mode, CWD)

  return defineConfig({
    plugins: [
      vue(),
      vueDevTools(),
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          // Auto import icon components
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
        dts: 'src/auto-imports.d.ts',
      }),
      Components({
        resolvers: [
          // Auto register icon components
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep'],
          }),
          // Auto register Element Plus components
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
        ],
        dts: 'src/components.d.ts',
      }),
      UnoCss(),
      Icons({ autoInstall: true }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 5173,
      open: false, // 自动打开浏览器
      fs: {
        strict: true, // 文件读取必须是相对于根目录的绝对路径
      },
      proxy: {
        // capi 开头的请求代理到远程服务器
        '/capi': {
          target: env.VITE_API_PREFIX,
          changeOrigin: true,
        },
      },
    },
  })
}
