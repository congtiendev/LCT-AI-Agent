export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/i18n', // Thêm i18n module
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

  i18n: {
    locales: [
      {
        code: 'vi',
        name: 'Tiếng Việt',
        file: 'vi.json',
      },
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
      },
    ],
    defaultLocale: 'vi',
    langDir: 'locales/',
  },

  imports: {
    presets: ['vue', 'vue-router', 'vue-i18n'],
    dirs: ['composables', 'composables/**'],
  },

  components: [
    // Components chính (mặc định)
    {
      path: '~/components',
      pathPrefix: false,
      extensions: ['vue'],
      global: true,
    },
    // Auth components
    {
      path: '~/components/auth',
      prefix: 'Auth',
      global: true,
    },
    // Base components
    {
      path: '~/components/base',
      prefix: 'Base',
      global: true,
    },
    // UI components
    {
      path: '~/components/ui',
      prefix: 'Ui',
      global: true,
    },
    // Form components (không có 's' ở cuối)
    {
      path: '~/components/forms',
      prefix: 'Form',
      global: true,
    },
    // Layout components
    // {
    //   path: '~/layouts',
    //   prefix: 'Layout',
    //   global: true,
    // },
  ],

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
      script: [{ src: '/js/bundle.js' }],
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
