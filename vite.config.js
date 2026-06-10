import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Proxy /api during dev so you can also call relative URLs if you prefer
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
});
