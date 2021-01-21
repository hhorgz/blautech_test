const admin = require('firebase-admin');

let serviceAccount = require('../config/blautech-ca297-dc87c42510c7.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

exports.firestoredb = admin.firestore();