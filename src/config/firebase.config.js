const {initializeApp} = require("firebase/app")
const {getStorage} = require("firebase/storage")
const {
  FIREBASE_APIKEY,
  FIREBASE_AUTHDOMAIN,
  FIREBASE_PROJECTID,
  FIREBASE_STORAGEBUCKET,
  FIREBASE_MESSAGESENDERID,
  FIREBASE_APPID,
} = require("../helpers/secrets");

// Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_APIKEY,
  authDomain: FIREBASE_AUTHDOMAIN,
  projectId: FIREBASE_PROJECTID,
  storageBucket: FIREBASE_STORAGEBUCKET,
  messagingSenderId: FIREBASE_MESSAGESENDERID,
  appId: FIREBASE_APPID
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
// initializing storege
exports.storage = getStorage(app);
