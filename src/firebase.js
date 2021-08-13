// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCBYR-Iav5xXDEUii8KoRfIzRxGJKFb-nM",
  authDomain: "clone-b6282.firebaseapp.com",
  projectId: "clone-b6282",
  storageBucket: "clone-b6282.appspot.com",
  messagingSenderId: "179416618597",
  appId: "1:179416618597:web:3512e4fffe42f55e04588c",
  measurementId: "G-3MXNXSGMR5"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db,auth};
