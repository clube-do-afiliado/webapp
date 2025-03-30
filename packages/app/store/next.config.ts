import type { NextConfig } from 'next';

import path from 'path';

const nextConfig: NextConfig = {
    output: 'standalone',
    env: {
        ENV: process.env.ENV,
        THEME: process.env.THEME,
        RELEASE: process.env.RELEASE,

        API_KEY: process.env.API_KEY,
        AUTH_DOMAIN: process.env.AUTH_DOMAIN,
        PROJECT_ID: process.env.PROJECT_ID,
        STORAGE_BUCKET: process.env.STORAGE_BUCKET,
        MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
        APP_ID: process.env.APP_ID,
        MEASUREMENT_ID: process.env.MEASUREMENT_ID,

        SSO_URL: process.env.SSO_URL,
        ADMIN_URL: process.env.ADMIN_URL,
        STORE_URL: process.env.STORE_URL,
        BACKOFFICE_URL: process.env.BACKOFFICE_URL,
        SITE_URL: process.env.SITE_URL,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.awsli.com.br',
            },
            {
                protocol: 'https',
                hostname: 'a-static.mlcdn.com.br',
            },
            {
                protocol: 'https',
                hostname: 'cdn.clubedoafiliado.com',
            },
        ]
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
        additionalData: `
            @use "@/styles/global.scss" as *;
        `,
    },
};

export default nextConfig;
