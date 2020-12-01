import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
};

firebase.initializeApp(config);
firebase
  .firestore()
  .enablePersistence()
  .then(() => {
    console.log("firebase persistence enabled");
  })
  .catch(function (err) {
    if (err.code === "failed-precondition") {
      console.log("multiple tabs open, no persistence");
    } else if (err.code === "unimplemented") {
      console.log("current browser does not support persistence");
    } else {
      console.log("other firebase persistence error");
    }
  });

export const auth = firebase.auth();
export const db = firebase.firestore();
