import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import fs from 'fs';
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

export default defineConfig({
  optimizeDeps: {
    exclude: ['some-heavy-lib'],
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', 'vue-i18n'],
      dts: 'src/types/auto-imports.d.ts',
    }),
    Components({
      dirs: ['src/components/base', 'src/layouts'],
      extensions: ['vue'],
      deep: true,
      dts: 'src/types/components.d.ts',
      directoryAsNamespace: true,
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  server: {
    port: 3000,
    https: {
      key: fs.readFileSync(
        path.resolve(__dirname, 'certs/localhost+2-key.pem')
      ),
      cert: fs.readFileSync(path.resolve(__dirname, 'certs/localhost+2.pem')),
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`,
      },
    },
  },
});
