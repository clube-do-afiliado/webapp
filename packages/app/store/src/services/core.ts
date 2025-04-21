import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

import DB from '@cda/services/db';
import UserServices from '@cda/services/user';
import RolesServices from '@cda/services/roles';
import PlansServices from '@cda/services/plans';
import SitesServices from '@cda/services/sites';
import ProductsServices from '@cda/services/products';
import IntegrationsServices from '@cda/services/integrations';

export const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3002';

// VARIABLES
export const url = {
    sso: process.env.SSO_URL,
    site: process.env.SITE_URL,
    admin: process.env.ADMIN_URL,
    store: process.env.STORE_URL,
    backoffice: process.env.BACKOFFICE_URL,
};

export const release = process.env.RELEASE;

export const isLocal = process.env.ENV === 'local';

// FIREBASE
const app = getApps().length === 0 ? initializeApp({
    appId: process.env.APP_ID,
    apiKey: process.env.API_KEY,
    projectId: process.env.PROJECT_ID,
    authDomain: process.env.AUTH_DOMAIN,
    storageBucket: process.env.STORAGE_BUCKET,
    measurementId: process.env.MEASUREMENT_ID,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
}, 'store') : getApps()[0];

// FIREBASE SERVICES
const firestore = getFirestore(app);

const db = new DB(firestore);

if (isLocal) {
    connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
}

// ENTITY SERVICES
export const userServices = new UserServices(db, url.sso);
export const rolesServices = new RolesServices(db);
export const plansServices = new PlansServices(db);
export const sitesServices = new SitesServices(db);
export const productsServices = new ProductsServices(db);
export const integrationsServices = new IntegrationsServices(db);
