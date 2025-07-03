export default defineNuxtConfig({
  devtools: { enabled: false },

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

  // Thêm các script từ HTML gốc
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content:
            'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
        },
        { 'http-equiv': 'X-UA-Compatible', content: 'ie=edge' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: '/css/style.css' },
      ],
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
