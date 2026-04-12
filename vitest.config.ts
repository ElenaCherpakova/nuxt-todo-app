import { defineConfig } from 'vitest/config'

import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
    plugins: [vue()],
    test: {
        environment: 'happy-dom',
        globals: true,
        include: ['tests/unit/**/*.test.ts'],
        setupFiles: ['tests/unit/setup.ts']
    },
    resolve: {
        alias: { '~': resolve(__dirname, '.') } 
    }
})