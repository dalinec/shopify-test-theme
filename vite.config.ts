import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    watch: {},
    rollupOptions: {
      input: {
        counter: 'src/components/counter/main.tsx',
        'add-to-cart-button': 'src/components/add-to-cart-button/main.tsx',
        newsletter: 'src/components/newsletter/main.tsx',
      },
      output: {
        dir: 'assets',
        entryFileNames: 'vite-[name].js',
        chunkFileNames: 'vite-[name].js',
        assetFileNames: 'vite-[name].[ext]',
      },
    },
    emptyOutDir: false,
  },
});
