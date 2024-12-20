import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig(
{
  plugins:
  [
    react(),
    tsconfigPaths(),
    TanStackRouterVite(),
  ],

  resolve:
  {
    alias:
    {
      // Without this, initial loads would take FOREVER: https://gyazo.com/90d81cfc214872856d3607724ddbff22
      // https://github.com/tabler/tabler-icons/issues/1233#issuecomment-2428245119
      // /esm/icons/index.mjs only exports the icons statically, so no separate chunks are created
      "@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs",
    },
  },
});