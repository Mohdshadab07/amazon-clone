// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgZQoOpmFVVx8ppfIfRPp70e99CJZwqS8",
  authDomain: "challenge-723ea.firebaseapp.com",
  projectId: "challenge-723ea",
  storageBucket: "challenge-723ea.appspot.com",
  messagingSenderId: "699460519156",
  appId: "1:699460519156:web:88b68cca11c41103a48aa1",
  measurementId: "G-E0BXGGN4KT"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db,auth};
