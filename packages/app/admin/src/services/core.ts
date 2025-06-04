import { initializeApp } from 'firebase/app';
import { getAuth, signOut, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';

import DB from '@cda/services/db';
import Storage from '@cda/services/storage';
import AuthServices from '@cda/services/auth';
import UserServices from '@cda/services/user';
import RolesServices from '@cda/services/roles';
import PlansServices from '@cda/services/plans';
import SitesServices from '@cda/services/sites';
import EventsServices from '@cda/services/events';
import SignatureServices from '@cda/services/signatures';
import ServerFunctions from '@cda/services/serverFunctions';
import IntegrationsServices from '@cda/services/integrations';
import ProductsServices, { type ProductInfo } from '@cda/services/products';

// VARIABLES
export const url = {
    sso: import.meta.env.VITE_SSO_URL,
    admin: import.meta.env.VITE_ADMIN_URL,
    store: import.meta.env.VITE_STORE_URL,
    promo: import.meta.env.VITE_PROMO_URL,
    backoffice: import.meta.env.VITE_BACKOFFICE_URL,
};

export const release = import.meta.env.VITE_RELEASE;

export const isLocal = import.meta.env.VITE_ENV === 'local';

// FIREBASE
const app = initializeApp({
    appId: import.meta.env.VITE_APP_ID,
    apiKey: import.meta.env.VITE_API_KEY,
    projectId: import.meta.env.VITE_PROJECT_ID,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
}, 'sso');

// FIREBASE SERVICES
const firebaseAuth = getAuth(app);
const firestore = getFirestore(app);
const functions = getFunctions(app, 'us-central1');
const firebaseStorage = getStorage(app);

export const authServices = new AuthServices({
    signOut: () => signOut(firebaseAuth),
});

export const db = new DB(firestore);
export const storage = new Storage(firebaseStorage);

if (isLocal) {
    connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
    connectAuthEmulator(firebaseAuth, 'http://127.0.0.1:9099');
    connectFunctionsEmulator(functions, '127.0.0.1', 5001);
    connectStorageEmulator(firebaseStorage, 'localhost', 9199);
}

// ENTITY SERVICES
export const userServices = new UserServices(db);
export const rolesServices = new RolesServices(db);
export const plansServices = new PlansServices(db);
export const sitesServices = new SitesServices(db);
export const eventsServices = new EventsServices(db);
export const productsServices = new ProductsServices(db);
export const signatureServices = new SignatureServices(db);
export const integrationsServices = new IntegrationsServices(db);

export const serverFunctions = new ServerFunctions({
    'getInfo': httpsCallable<{ url: string }, ProductInfo>(functions, 'getInfo'),
    'shortUrl': httpsCallable<{ storeId: string; originalUrl?: string }, { hash: string }>(functions, 'shortUrl'),
});
