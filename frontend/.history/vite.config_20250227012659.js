import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {port:5173}
})
defineConfig({
  define: {
    "process.env.REACT_APP_ROUTER_OPTS": JSON.stringify({
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }),
  },
});