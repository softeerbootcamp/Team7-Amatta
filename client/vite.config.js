import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  build: {
    outDir: 'dist',
    assetsDir: '.',
    assetsInclude: ['/*.js', '/.css', '**/.html', '**/.json'],
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        offline: path.resolve(__dirname, 'offline.html'),
      },
    },
  },
});
