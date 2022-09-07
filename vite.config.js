import { defineConfig } from 'vite';
import { resolve } from 'path';

const isDev = process.env.NODE_ENV !== 'production';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: isDev ? resolve(__dirname, 'index.html') : './index.html',
        nested: isDev
          ? resolve(__dirname, 'thanksgiving-1984/index.html')
          : './thanksgiving-1984/index.html',
      },
    },
  },
  publicDir: '../public',
  base: './',
  outDir: './',
  server: {
    strictPort: true,
  },
});
