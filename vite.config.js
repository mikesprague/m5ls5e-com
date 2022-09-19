import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  iappType: 'custom',
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
