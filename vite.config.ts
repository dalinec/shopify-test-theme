import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    watch: {},
    rollupOptions: {
      input: {
        counter: 'src/main.tsx',
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
