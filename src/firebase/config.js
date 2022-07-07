import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAKVfy8AtnJ3zfyobIAHXhyhUDtfKddxps",
    authDomain: "instagram-clone-5c289.firebaseapp.com",
    projectId: "instagram-clone-5c289",
    storageBucket: "instagram-clone-5c289.appspot.com",
    messagingSenderId: "627516746882",
    appId: "1:627516746882:web:efc5be909896388c09589b",
    measurementId: "G-P8NE92W2ZZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
