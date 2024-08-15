// nuxt.config.ts or nuxt.config.js
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  ssr: false,
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  plugins: ['~/plugins/fontawesome.ts' , '~/plugins/apexcharts.ts' ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
  ],
  googleFonts: {
    families: {
      Sarabun: [400, 700],
      Inter: [400, 700], 
      Kanit: [400, 700], 
    },
    display: 'swap',
  },
})