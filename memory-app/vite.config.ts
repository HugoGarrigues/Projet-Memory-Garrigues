import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// TailwindCSS s'intègre automatiquement a Vite et donc pas besoin de le configurer ici //
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), 
    tailwindcss()],
})
