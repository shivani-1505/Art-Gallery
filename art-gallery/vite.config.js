import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  base: './', // Add this line to use relative paths for assets
  build: {
    target: 'esnext',
    outDir: 'build',
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss({
          // Add content paths to properly purge unused styles
          content: [
            './index.html',
            './src/**/*.{js,jsx,ts,tsx}'
          ],
        }),
        autoprefixer(),
      ],
    },
  },
});