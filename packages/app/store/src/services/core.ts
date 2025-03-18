import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

import DB from '@cda/services/db';
import UserServices from '@cda/services/user';
import RolesServices from '@cda/services/roles';
import PlansServices from '@cda/services/plans';
import SitesServices from '@cda/services/sites';
import IntegrationsServices from '@cda/services/integrations';

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
const app = initializeApp({
    appId: process.env.APP_ID,
    apiKey: process.env.API_KEY,
    projectId: process.env.PROJECT_ID,
    authDomain: process.env.AUTH_DOMAIN,
    storageBucket: process.env.STORAGE_BUCKET,
    measurementId: process.env.MEASUREMENT_ID,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
}, 'store');

// FIREBASE SERVICES
const firestore = getFirestore(app);

export const db = new DB(firestore);

if (isLocal) {
    connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
}

// ENTITY SERVICES
export const userServices = new UserServices(db, url.sso);
export const rolesServices = new RolesServices(db);
export const plansServices = new PlansServices(db);
export const sitesServices = new SitesServices(db);
export const integrationsServices = new IntegrationsServices(db);
