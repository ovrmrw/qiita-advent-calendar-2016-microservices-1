import * as fs from 'fs';
import * as path from 'path';

const SECRET_KEY = path.join(__dirname, '..', 'secret-key');

const appSecretJsonPath = path.join(SECRET_KEY, 'app.secret.json');
const firebaseServiceAccountKeyJsonPath = path.join(SECRET_KEY, 'Firebase-as-a-Store-2-fddea9cd9c72.json');


// const appSecretKeyJson = require('../secret-key/app.secret.json');
// const firebaseServiceAccountKeyJson = require('../secret-key/Firebase-as-a-Store-2-fddea9cd9c72.json');
const appSecretKeyJson = JSON.parse(fs.readFileSync(appSecretJsonPath, 'utf8'));
const firebaseServiceAccountKeyJson = JSON.parse(fs.readFileSync(firebaseServiceAccountKeyJsonPath, 'utf8'));

[appSecretKeyJson, firebaseServiceAccountKeyJson].forEach(json => {
    if (!json['___WARNING___']) {
        throw new Error('Json file for config is incorrect.');
    }
});


export const auth0ClientId = appSecretKeyJson.auth0.clientId;
export const auth0ClientSecret = appSecretKeyJson.auth0.clientSecret;
export const auth0Domain = appSecretKeyJson.auth0.domain;

if ([auth0ClientId, auth0ClientSecret, auth0Domain].some(key => !key)) {
    console.error('Auth0 env keys:', { auth0ClientId, auth0ClientSecret, auth0Domain });
    throw new Error('Env keys for Auth0 is not corrected.');
}


export const firebaseDatabaseURL = appSecretKeyJson.firebase.databaseUrl;

if ([firebaseDatabaseURL].some(key => !key)) {
    console.error('Firebase env keys:', { firebaseDatabaseURL });
    throw new Error('Env keys for Firebase are not corrected.');
}


export { firebaseServiceAccountKeyJson };
