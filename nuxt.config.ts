export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
  ],

  css: ['~/assets/css/main.css'],

  typescript: {
    typeCheck: false,
  },

  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700],
    },
  },

  vite: {
    server: {
      hmr: {
        port: 24678,
        host: 'localhost',
      },
      watch: {
        usePolling: true,
        interval: 1000,
        ignored: ['**/node_modules/**', '**/.git/**'],
      },
    },
  },
  hooks: {
    'pages:extend'(pages) {
      pages.forEach((page) => {
        if (page.path?.startsWith('/auth/')) {
          page.path = page.path.replace('/auth/', '/')
        }
      })
    },
  },
  // Clear build cache
  nitro: {
    storage: {
      '.data': {
        driver: 'memory',
      },
    },
  },
})
