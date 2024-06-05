import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        include: ["date-fns"]
    },
    build: {
        rollupOptions: {
            external: ["date-fns"]
        }
    }
});
