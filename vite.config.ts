import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Vite ki basic configuration
  vite: {
    server: {
      host: "::",
      port: 8080,
    },
  },
  // TanStack Start ki configuration
  tanstackStart: {
    server: { 
      entry: "src/server.ts" 
    },
  },
});