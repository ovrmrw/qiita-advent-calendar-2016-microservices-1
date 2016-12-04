const appSecretKeyJson = require('../../secret-key/app.secret.json');
const firebaseServiceAccountKeyJson = require('../../secret-key/Firebase-as-a-Store-2-fddea9cd9c72.json');


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
