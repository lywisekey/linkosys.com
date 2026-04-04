import { fileURLToPath, URL } from 'node:url'
import {BootstrapVueNextResolver} from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [BootstrapVueNextResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
     preprocessorOptions: {
        scss: {
          silenceDeprecations: [
            'import',
            'mixed-decls',
            'color-functions',
            'global-builtin',
          ],
        },
     },
  },
  server: {
    proxy: {
      '/send-submit.php': {
        target: 'http://phpcode.test/submitform',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/send-submit\.php/, '/send-submit.php')
      }
    }
  },
})


