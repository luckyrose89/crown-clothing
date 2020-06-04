import firebase from "firebase/app";
import "firebase/firestore"; // for the db
import "firebase/auth"; // for the auth

const config = {
  apiKey: "AIzaSyAf-PIpwtkdsTxDxQsnrnk3SVfMH-32qIE",
  authDomain: "crown-clothing-cee99.firebaseapp.com",
  databaseURL: "https://crown-clothing-cee99.firebaseio.com",
  projectId: "crown-clothing-cee99",
  storageBucket: "crown-clothing-cee99.appspot.com",
  messagingSenderId: "437436751125",
  appId: "1:437436751125:web:4e2ecd0f41fa64703c1d1c",
  measurementId: "G-XPFW19PGFY",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// create instance of google provider object

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" }); //enable pop up for sign in to google
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
