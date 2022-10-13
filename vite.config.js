import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  appType: 'spa',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: './src/index.html',
        nested: './src/thanksgiving-1984/index.html',
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
