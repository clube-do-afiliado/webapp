declare namespace NodeJS {
    export interface ProcessEnv {
        // ENV
        ENV: string;
        RELEASE: string;

        // FIREBASE
        APP_ID: string;
        API_KEY: string;
        AUTH_DOMAIN: string;
        PROJECT_ID: string;
        STORAGE_BUCKET: string;
        MEASUREMENT_ID: string;
        MESSAGING_SENDER_ID: string;

        // URLS
        SSO_URL: string;
        ADMIN_URL: string;
        STORE_URL: string;
        BACKOFFICE_URL: string;
    }
}