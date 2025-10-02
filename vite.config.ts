import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/casa-itaca/' : '/',
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/ical-proxy-1': {
        target: 'https://ical.booking.com/v1/export?t=6a508e72-47b8-441e-ab73-221ae38f7f5b',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ical-proxy-1/, ''),
      },
      '/ical-proxy-2': {
        target: 'https://ical.booking.com/v1/export?t=434277a1-8068-4518-b3d6-4699fcb96435',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ical-proxy-2/, ''),
      },
    }
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
