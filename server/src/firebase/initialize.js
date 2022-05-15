const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const credential = require('../../credential.json');

const firebaseConfig = {
   credential: cert(credential),
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

module.exports = { auth };
