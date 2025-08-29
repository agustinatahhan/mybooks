import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} = require("./env.json");


const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)