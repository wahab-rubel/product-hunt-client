// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://product-hunt-server-n68wm3en9-wahab-rubels-projects.vercel.app/',
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
});
