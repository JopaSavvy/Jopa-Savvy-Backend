// Import the functions you need from the SDKs you need
const {initializeApp} = require("firebase/app")
const {getStorage} = require("firebase/storage")

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxSj7Dje1HMuJcIKNg8UgyIBlacVMJfE0",
  authDomain: "jopa-savvy.firebaseapp.com",
  projectId: "jopa-savvy",
  storageBucket: "jopa-savvy.appspot.com",
  messagingSenderId: "845566925125",
  appId: "1:845566925125:web:b872dcb902ed5dea81c62c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
exports.storage = getStorage(app);
