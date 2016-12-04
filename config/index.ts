import * as fs from 'fs';

// const appSecretKeyJson = require('../secret-key/app.secret.json');
// const firebaseServiceAccountKeyJson = require('../secret-key/Firebase-as-a-Store-2-fddea9cd9c72.json');
const appSecretKeyJson = JSON.parse(fs.readFileSync('../secret-key/app.secret.json', 'utf8'));
const firebaseServiceAccountKeyJson = JSON.parse(fs.readFileSync('../secret-key/Firebase-as-a-Store-2-fddea9cd9c72.json', 'utf8'));


export const auth0ClientId = appSecretKeyJson.auth0.clientId;
export const auth0ClientSecret = appSecretKeyJson.auth0.clientSecret;
export const auth0Domain = appSecretKeyJson.auth0.domain;

if ([auth0ClientId, auth0ClientSecret, auth0Domain].some(key => !key)) {
  console.error('Auth0 env keys:', { auth0ClientId, auth0ClientSecret, auth0Domain });
  throw new Error('Env keys for Auth0 is not collected.');
}


export const firebaseDatabaseURL = appSecretKeyJson.firebase.databaseUrl;

if ([firebaseDatabaseURL].some(key => !key)) {
  console.error('Firebase env keys:', { firebaseDatabaseURL });
  throw new Error('Env keys for Firebase are not collected.');
}


export { firebaseServiceAccountKeyJson };
