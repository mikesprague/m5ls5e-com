import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'thanksgiving-1984/index.html'),
      },
    },
  },
  publicDir: '../public',
  base: './',
  outDir: './',
  server: {
    port: 3000,
    strictPort: true,
  },
});
