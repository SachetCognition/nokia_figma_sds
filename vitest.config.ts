import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: {
      compositions: path.resolve(__dirname, './src/ui/compositions'),
      data: path.resolve(__dirname, './src/data'),
      hooks: path.resolve(__dirname, './src/ui/hooks'),
      icons: path.resolve(__dirname, './src/ui/icons'),
      images: path.resolve(__dirname, './src/ui/images'),
      layout: path.resolve(__dirname, './src/ui/layout'),
      primitives: path.resolve(__dirname, './src/ui/primitives'),
      utils: path.resolve(__dirname, './src/ui/utils'),
    },
  },
})
