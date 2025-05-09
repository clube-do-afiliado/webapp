import { resolve } from 'path';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        viteStaticCopy({
            targets: [
                {
                    src: 'public/manifest.json',
                    dest: '.',
                }
            ],
        }),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @use "@cda/ui/styles/mixin.scss" as *;
                    @use "@cda/ui/styles/reset.scss" as *;
                    @use "@cda/ui/styles/variables.scss" as *;
                `
            },
        },
    },
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                popup: resolve(__dirname, 'index.html'),
                background: resolve(
                    __dirname,
                    'src',
                    'scripts',
                    'background.ts'
                ),
                content: resolve(
                    __dirname,
                    'src',
                    'scripts',
                    'content.ts'
                ),
            },
            output: {
                entryFileNames: (chunk) => {
                    if (chunk.name === 'popup') {
                        return 'popup.js';
                    }
                    if (chunk.name === 'background') {
                        return 'background.js';
                    }
                    if (chunk.name === 'content') {
                        return 'content.js';
                    }
                    return '[name].js';
                },
            },
        },
    },
});