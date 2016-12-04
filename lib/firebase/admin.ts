import * as admin from 'firebase-admin';
const uuid = require('uuid');

import { firebaseDatabaseURL, firebaseServiceAccountKeyJson } from '../../config';


let firebaseApp: any;

export function getFirebaseApp(): any {
  const name = uuid();
  if (!firebaseApp) {
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(firebaseServiceAccountKeyJson),
      databaseURL: firebaseDatabaseURL,
    }, name);
  }
  return firebaseApp;
}
