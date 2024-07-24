// nuxt.config.ts or nuxt.config.js
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@pinia/nuxt', 
    '@nuxtjs/tailwindcss', 
    '@nuxtjs/google-fonts'
  ],
  googleFonts: {
    families: {
      Sarabun: [400, 700], // Load all weights and styles
    },
    display: 'swap', // Optional: Control the display mode
  }
})