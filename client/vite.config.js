import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  build: {
    outDir: 'dist',
    assetsDir: '.',
    assetsInclude: ['/*.js', '/.css', '**/.html', '**/.json', 'service-worker.js'],
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        offline: path.resolve(__dirname, 'offline.html'),
        'service-worker': path.resolve(__dirname, 'service-worker.js'),
      },
    },
  },
  plugins: [
    VitePWA({
      mode: 'production',
      filename: 'service-worker.js', // 변경된 파일 이름
      base: '/',
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'assets/'],
      manifest: {
        name: '아 맞다!',
        short_name: 'Amatta',
        icons: [
          {
            src: 'icon-x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'icon-x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: 'icon-x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'icon-x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        start_url: 'https://amatta.site/', // 변경된 start_url
        display: 'fullscreen',
        background_color: '#92b8b1',
        theme_color: '#ffffff',
      },
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        swDest: 'dist/service-worker.js', // 변경된 파일 경로
      },
    }),
  ],
});
