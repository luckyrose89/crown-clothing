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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

// Initialize default app
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// create instance of google provider object

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" }); //enable pop up for sign in to google
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
