const secrets = require('./secrets.json');
import { defineNuxtConfig } from '@nuxt/bridge';

export default defineNuxtConfig({
  bridge: {
    meta: true,
  },

  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'PistonVideo',
    meta: [
      {
        name: 'format-detection',
        content: 'telephone=no',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/vue-plyr',
      mode: 'client',
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxtjs/fontawesome',
    '@nuxtjs/color-mode',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'nuxt-helmet',
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: {
      source: 'static/icon.png',
    },
    meta: {
      ogHost: 'https://pistonvideo.com',
      twitterCreator: '@AlexProgrammer3',
      theme_color: '#FF9900',
      description: 'Awesome open source video upload platform!',
      author: undefined,
      ogImage: '/icon.png',
      ogSiteName: undefined,
      ogTitle: 'PistonVideo',
    },
    manifest: {
      lang: 'en',
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  googleFonts: {
    download: true,
    base64: true,
  },

  fontawesome: {
    icons: {
      solid: true,
      brands: true,
    },
  },

  tailwindcss: {
    // add '~tailwind.config` alias
    exposeConfig: true,
    viewer: false,
  },

  colorMode: {
    classSuffix: '',
    preference: 'system', // default value of $colorMode.preference
    fallback: 'dark', // fallback value if not system preference found
  },

  proxy: {
    '/api': 'http://localhost:3434',
    '/static': 'http://localhost:3434',
  },

  loading: {
    color: 'blue',
    height: '5px',
  },

  auth: {
    redirect: {
      login: '/login',
      callback: '/oauth/callback',
      home: '/',
    },
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          required: true,
          type: '',
        },
        user: {
          property: 'user',
          autoFetch: true,
        },
        endpoints: {
          login: {
            url: '/api/auth/login',
            method: 'post',
          },
          logout: {
            url: '/api/auth/logout',
            method: 'post',
          },
          user: {
            url: '/api/auth/user',
            method: 'get',
          },
        },
      },
      github: {
        clientId: secrets.github.clientId,
        clientSecret: secrets.github.clientSecret,
      },
      facebook: {
        endpoints: {
          userInfo: 'https://graph.facebook.com/v6.0/me?fields=id,name,picture{url}',
        },
        clientId: secrets.facebook.clientId,
        scope: ['public_profile', 'email'],
      },
      google: {
        clientId: secrets.google.clientId,
      },
      discord: {
        clientId: secrets.discord.clientId,
        clientSecret: secrets.discord.clientSecret,
      },
    },
  },

  router: {
    middleware: ['auth'],
  },
});
