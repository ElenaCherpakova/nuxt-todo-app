import Aura from '@primeuix/themes/aura'

export default defineNuxtConfig({
    devtools: { enabled: true },

    css: ['primeicons/primeicons.css'],

    modules: ['@primevue/nuxt-module'],

    primevue: {
        options: {
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: '.dark-mode'
                }
            }
        }
    }
})