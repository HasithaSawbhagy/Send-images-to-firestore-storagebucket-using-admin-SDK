var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");




admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'storageBucket URL'
});


 //read data collection from firebase
const db = admin.firestore();
var bucket = admin.storage().bucket();


const file = './03a760e6c95e183caff8d9660f8888fe.jpg';
const fileName = 'ID.jpg';
const fileUpload = bucket.file(fileName);
const stream = fileUpload.createWriteStream({
  metadata: {
    contentType: 'image/jpeg'
  }
});

stream.on('error', (err) => {
  console.log(`Error uploading image: ${err}`);
});

stream.on('finish', () => {
  console.log(`Image uploaded to: ${fileUpload.name}`);
});

stream.end(require('fs').readFileSync(file));