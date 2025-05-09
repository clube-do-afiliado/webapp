import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import {
    getAuth,
    signOut,
    connectAuthEmulator,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from 'firebase/auth';

import DB from '@cda/services/db';
import AuthServices from '@cda/services/auth';
import UserServices from '@cda/services/user';
import SiteServices from '@cda/services/sites';
import ProductServices from '@cda/services/products';

// VARIABLES
export const url = {
    sso: import.meta.env.VITE_SSO_URL,
    admin: import.meta.env.VITE_ADMIN_URL,
    store: import.meta.env.VITE_STORE_URL,
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
}, 'extension');

// FIREBASE SERVICES
const firebaseAuth = getAuth(app);
const firestore = getFirestore(app);

export const authServices = new AuthServices({
    signOut: () => signOut(firebaseAuth),
    signInWithPassword: (email, password) => signInWithEmailAndPassword(firebaseAuth, email, password),
    sendPasswordResetEmail: (email) => sendPasswordResetEmail(
        firebaseAuth,
        email,
        { url: `${url.sso}/signin?email=${email}`, handleCodeInApp: true }
    ),
    createUserWithEmailAndPassword: (email, password) => createUserWithEmailAndPassword(firebaseAuth, email, password),
}, url.sso);

export const db = new DB(firestore);

if (isLocal) {
    connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
    connectAuthEmulator(firebaseAuth, 'http://127.0.0.1:9099');
}

// ENTITY SERVICES
export const userServices = new UserServices(db, url.sso);
export const siteServices = new SiteServices(db);
export const productServices = new ProductServices(db);
