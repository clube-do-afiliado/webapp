import { resolve } from 'path';
import { copyFileSync } from 'fs';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

import react from '@vitejs/plugin-react';

// Ambientes válidos: 'dev', 'hmg', 'prod'
const env = process.env.VITE_ENV || 'dev';

// Copia o manifest correto para `public/manifest.json`
copyFileSync(
    resolve(__dirname, `public/manifest.${env}.json`),
    resolve(__dirname, 'public/manifest.json')
);

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