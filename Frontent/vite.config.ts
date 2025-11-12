import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa'; // 1. IMPORTAR O PWA

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      react(),
      
      // 2. ADICIONAR O PLUGIN DO PWA
      VitePWA({
        registerType: 'autoUpdate', // Atualiza o app automaticamente
        manifest: {
          // Mude os nomes para o seu app
          name: 'App Lojinha - Avaliação',
          short_name: 'Avaliação',
          description: 'Aplicativo de avaliação de quiosque',
          theme_color: '#ffffff', // Cor da barra de status do tablet
          icons: [
            {
              src: 'pwa-192x192.png', // Você precisa criar esse ícone
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png', // E esse ícone também
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      })
    ],

    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname 
      }
    }
  };
});