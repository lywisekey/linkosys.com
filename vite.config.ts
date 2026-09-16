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
  ssr: {
    // Bundle dependencies into the prerender build instead of leaving them as
    // Node imports: several ship directory imports or CJS entry points that
    // Node's ESM resolver rejects (oh-vue-icons is one). Build-time only, so
    // the client bundle is unaffected.
    noExternal: true
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


