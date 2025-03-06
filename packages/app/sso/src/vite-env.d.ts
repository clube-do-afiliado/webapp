/// <reference types="vite/client" />

interface ImportMetaEnv {
    // ENV
    readonly VITE_ENV: string;
    readonly VITE_RELEASE: string;

    // FIREBASE
    readonly VITE_APP_ID: string;
    readonly VITE_API_KEY: string;
    readonly VITE_AUTH_DOMAIN: string;
    readonly VITE_PROJECT_ID: string;
    readonly VITE_STORAGE_BUCKET: string;
    readonly VITE_MEASUREMENT_ID: string;
    readonly VITE_MESSAGING_SENDER_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}