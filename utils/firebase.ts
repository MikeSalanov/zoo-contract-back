import admin from 'firebase-admin';
import serviceAccount from '../keyForFirebase/zoo-contract-firebase-adminsdk-rf2nt-5018a40ca3.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: 'zoo-contract.appspot.com',
});

const bucket = admin.storage().bucket();

export { admin, bucket };
