// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.js";
import { VitePWA } from "file:///home/project/node_modules/vite-plugin-pwa/dist/index.js";
var vite_config_default = defineConfig({
  build: {
    target: "esnext",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          supabase: ["@supabase/supabase-js"],
          lucide: ["lucide-react"]
        }
      }
    },
    chunkSizeWarningLimit: 1e3
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      manifest: {
        name: "Daccurso Career Studio",
        short_name: "DCS",
        description: "Professional resume writing, interview coaching, and career guidance for students and young professionals.",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "portrait",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        lang: "en",
        icons: [
          {
            src: "https://nkrnbtythzdnogvtdizv.supabase.co/storage/v1/object/public/media/dcs-web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "https://bvevrurqtidadhfsuoee.supabase.co/storage/v1/object/public/media/dcs-web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      },
      devOptions: {
        enabled: true
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,webp}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
                // 1 year
              },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            urlPattern: /^https:\/\/bvevrurqtidadhfsuoee\.supabase\.co\/.*/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "supabase-media-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30
                // 30 days
              },
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      }
    })
  ],
  publicDir: "public",
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "@supabase/supabase-js"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYnVpbGQ6IHtcbiAgICB0YXJnZXQ6ICdlc25leHQnLFxuICAgIG1pbmlmeTogJ3RlcnNlcicsXG4gICAgdGVyc2VyT3B0aW9uczoge1xuICAgICAgY29tcHJlc3M6IHtcbiAgICAgICAgZHJvcF9jb25zb2xlOiB0cnVlLFxuICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICAncmVhY3QtdmVuZG9yJzogWydyZWFjdCcsICdyZWFjdC1kb20nLCAncmVhY3Qtcm91dGVyLWRvbSddLFxuICAgICAgICAgIHN1cGFiYXNlOiBbJ0BzdXBhYmFzZS9zdXBhYmFzZS1qcyddLFxuICAgICAgICAgIGx1Y2lkZTogWydsdWNpZGUtcmVhY3QnXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDEwMDAsXG4gIH0sXG5cbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG5cbiAgICBWaXRlUFdBKHtcbiAgICAgIHJlZ2lzdGVyVHlwZTogJ2F1dG9VcGRhdGUnLFxuICAgICAgaW5qZWN0UmVnaXN0ZXI6ICdhdXRvJyxcblxuICAgICAgbWFuaWZlc3Q6IHtcbiAgICAgICAgbmFtZTogJ0RhY2N1cnNvIENhcmVlciBTdHVkaW8nLFxuICAgICAgICBzaG9ydF9uYW1lOiAnRENTJyxcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgJ1Byb2Zlc3Npb25hbCByZXN1bWUgd3JpdGluZywgaW50ZXJ2aWV3IGNvYWNoaW5nLCBhbmQgY2FyZWVyIGd1aWRhbmNlIGZvciBzdHVkZW50cyBhbmQgeW91bmcgcHJvZmVzc2lvbmFscy4nLFxuICAgICAgICBzdGFydF91cmw6ICcvJyxcbiAgICAgICAgc2NvcGU6ICcvJyxcbiAgICAgICAgZGlzcGxheTogJ3N0YW5kYWxvbmUnLFxuICAgICAgICBvcmllbnRhdGlvbjogJ3BvcnRyYWl0JyxcbiAgICAgICAgYmFja2dyb3VuZF9jb2xvcjogJyNmZmZmZmYnLFxuICAgICAgICB0aGVtZV9jb2xvcjogJyNmZmZmZmYnLFxuICAgICAgICBsYW5nOiAnZW4nLFxuICAgICAgICBpY29uczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ2h0dHBzOi8vYnZldnJ1cnF0aWRhZGhmc3VvZWUuc3VwYWJhc2UuY28vc3RvcmFnZS92MS9vYmplY3QvcHVibGljL21lZGlhL2Rjcy13ZWItYXBwLW1hbmlmZXN0LTE5MngxOTIucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnMTkyeDE5MicsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ2h0dHBzOi8vYnZldnJ1cnF0aWRhZGhmc3VvZWUuc3VwYWJhc2UuY28vc3RvcmFnZS92MS9vYmplY3QvcHVibGljL21lZGlhL2Rjcy13ZWItYXBwLW1hbmlmZXN0LTUxMng1MTIucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIHB1cnBvc2U6ICdhbnkgbWFza2FibGUnLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuXG4gICAgICBkZXZPcHRpb25zOiB7XG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICB9LFxuXG4gICAgICB3b3JrYm94OiB7XG4gICAgICAgIGdsb2JQYXR0ZXJuczogWycqKi8qLntqcyxjc3MsaHRtbCxpY28scG5nLHN2ZyxqcGcsd2VicH0nXSxcbiAgICAgICAgcnVudGltZUNhY2hpbmc6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB1cmxQYXR0ZXJuOiAvXmh0dHBzOlxcL1xcL2ZvbnRzXFwuZ29vZ2xlYXBpc1xcLmNvbVxcLy4qL2ksXG4gICAgICAgICAgICBoYW5kbGVyOiAnQ2FjaGVGaXJzdCcsXG4gICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgIGNhY2hlTmFtZTogJ2dvb2dsZS1mb250cy1jYWNoZScsXG4gICAgICAgICAgICAgIGV4cGlyYXRpb246IHtcbiAgICAgICAgICAgICAgICBtYXhFbnRyaWVzOiAxMCxcbiAgICAgICAgICAgICAgICBtYXhBZ2VTZWNvbmRzOiA2MCAqIDYwICogMjQgKiAzNjUsIC8vIDEgeWVhclxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBjYWNoZWFibGVSZXNwb25zZTogeyBzdGF0dXNlczogWzAsIDIwMF0gfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB1cmxQYXR0ZXJuOiAvXmh0dHBzOlxcL1xcL2J2ZXZydXJxdGlkYWRoZnN1b2VlXFwuc3VwYWJhc2VcXC5jb1xcLy4qL2ksXG4gICAgICAgICAgICBoYW5kbGVyOiAnU3RhbGVXaGlsZVJldmFsaWRhdGUnLFxuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICBjYWNoZU5hbWU6ICdzdXBhYmFzZS1tZWRpYS1jYWNoZScsXG4gICAgICAgICAgICAgIGV4cGlyYXRpb246IHtcbiAgICAgICAgICAgICAgICBtYXhFbnRyaWVzOiA1MCxcbiAgICAgICAgICAgICAgICBtYXhBZ2VTZWNvbmRzOiA2MCAqIDYwICogMjQgKiAzMCwgLy8gMzAgZGF5c1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBjYWNoZWFibGVSZXNwb25zZTogeyBzdGF0dXNlczogWzAsIDIwMF0gfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG5cbiAgcHVibGljRGlyOiAncHVibGljJyxcblxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBpbmNsdWRlOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICdyZWFjdC1yb3V0ZXItZG9tJywgJ0BzdXBhYmFzZS9zdXBhYmFzZS1qcyddLFxuICB9LFxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUF5TixTQUFTLG9CQUFvQjtBQUN0UCxPQUFPLFdBQVc7QUFDbEIsU0FBUyxlQUFlO0FBRXhCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNiLFVBQVU7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLGVBQWU7QUFBQSxNQUNqQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQSxVQUNaLGdCQUFnQixDQUFDLFNBQVMsYUFBYSxrQkFBa0I7QUFBQSxVQUN6RCxVQUFVLENBQUMsdUJBQXVCO0FBQUEsVUFDbEMsUUFBUSxDQUFDLGNBQWM7QUFBQSxRQUN6QjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSx1QkFBdUI7QUFBQSxFQUN6QjtBQUFBLEVBRUEsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBRU4sUUFBUTtBQUFBLE1BQ04sY0FBYztBQUFBLE1BQ2QsZ0JBQWdCO0FBQUEsTUFFaEIsVUFBVTtBQUFBLFFBQ1IsTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osYUFDRTtBQUFBLFFBQ0YsV0FBVztBQUFBLFFBQ1gsT0FBTztBQUFBLFFBQ1AsU0FBUztBQUFBLFFBQ1QsYUFBYTtBQUFBLFFBQ2Isa0JBQWtCO0FBQUEsUUFDbEIsYUFBYTtBQUFBLFFBQ2IsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1g7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BRUEsWUFBWTtBQUFBLFFBQ1YsU0FBUztBQUFBLE1BQ1g7QUFBQSxNQUVBLFNBQVM7QUFBQSxRQUNQLGNBQWMsQ0FBQyx5Q0FBeUM7QUFBQSxRQUN4RCxnQkFBZ0I7QUFBQSxVQUNkO0FBQUEsWUFDRSxZQUFZO0FBQUEsWUFDWixTQUFTO0FBQUEsWUFDVCxTQUFTO0FBQUEsY0FDUCxXQUFXO0FBQUEsY0FDWCxZQUFZO0FBQUEsZ0JBQ1YsWUFBWTtBQUFBLGdCQUNaLGVBQWUsS0FBSyxLQUFLLEtBQUs7QUFBQTtBQUFBLGNBQ2hDO0FBQUEsY0FDQSxtQkFBbUIsRUFBRSxVQUFVLENBQUMsR0FBRyxHQUFHLEVBQUU7QUFBQSxZQUMxQztBQUFBLFVBQ0Y7QUFBQSxVQUNBO0FBQUEsWUFDRSxZQUFZO0FBQUEsWUFDWixTQUFTO0FBQUEsWUFDVCxTQUFTO0FBQUEsY0FDUCxXQUFXO0FBQUEsY0FDWCxZQUFZO0FBQUEsZ0JBQ1YsWUFBWTtBQUFBLGdCQUNaLGVBQWUsS0FBSyxLQUFLLEtBQUs7QUFBQTtBQUFBLGNBQ2hDO0FBQUEsY0FDQSxtQkFBbUIsRUFBRSxVQUFVLENBQUMsR0FBRyxHQUFHLEVBQUU7QUFBQSxZQUMxQztBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUVBLFdBQVc7QUFBQSxFQUVYLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyxTQUFTLGFBQWEsb0JBQW9CLHVCQUF1QjtBQUFBLEVBQzdFO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
