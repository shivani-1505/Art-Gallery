import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  base: './', // ✅ Ensures relative paths for Vercel
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  build: {
    target: 'esnext', // ✅ Fixes the Vercel build target for top-level await
  },
  esbuild: {
    target: 'esnext',
  },
});
