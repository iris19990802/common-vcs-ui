import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    { path: '/', component: '@/pages/dashboard' },
  ],
  proxy: {
    '/api': {
      target: 'http://localhost:8900/',
      changeOrigin: true,
    },
  },
});
