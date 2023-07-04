// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': 'postcss-nesting',
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-quasar-ui',
    "nuxt-lodash",
    // [
    //   '@pinia/nuxt',
    //   {
    //     autoImports: [
    //       'defineStore',
    //       ['defineStore', 'definePiniaStore'],
    //     ],
    //   },
    // ],
  ],
  quasar: { /* */ },
  build: {
    postcss: {
      postcssOptions: require('./postcss.config.js'),
    },
  },
  lodash: {
    prefix: "_",
    prefixSkip: ["string"],
    upperAfterPrefix: false,
    exclude: ["map"],
    alias: [
      ["camelCase", "stringToCamelCase"], // => stringToCamelCase
      ["kebabCase", "stringToKebab"], // => stringToKebab
      ["isDate", "isLodashDate"], // => _isLodashDate
    ],
  },
})
