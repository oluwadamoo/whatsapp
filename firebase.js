import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDRIIZ72_A778QFPE6nEJjNR9R4JFFnt-8",
  authDomain: "whatsapp-53b07.firebaseapp.com",
  projectId: "whatsapp-53b07",
  storageBucket: "whatsapp-53b07.appspot.com",
  messagingSenderId: "219089466082",
  appId: "1:219089466082:web:f3a9394ae6b047ba0b64bb",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export function signIn(email, password) {
  try {
    return signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    return `Error ${e}`;
  }
}
export function signUp(email, password) {
  try {
    return createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    return `Error ${e}`;
  }
}

export async function logout() {
  try {
    let out = await signOut(auth);
    // console.log(out);
  } catch (e) {
    console.log(e);
  }
}
