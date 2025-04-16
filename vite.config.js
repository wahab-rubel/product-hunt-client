// vite.config.js
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const proxyTarget = mode === 'development'
    ? 'http://localhost:5000'
    : 'https://product-hunt-server-n68wm3en9-wahab-rubels-projects.vercel.app/';

  return {
    plugins: [
      react(),
      tsconfigPaths(),
    ],
    server: {
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    resolve: {
      alias: {
        events: 'events/',
      },
    },
  };
});