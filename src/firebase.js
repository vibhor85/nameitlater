// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBy-zUSDRCtLxDiA9s2p9qbgL3FbzWvCw",
  authDomain: "chat-bbb4a.firebaseapp.com",
  projectId: "chat-bbb4a",
  storageBucket: "chat-bbb4a.appspot.com",
  messagingSenderId: "62204789435",
  appId: "1:62204789435:web:0b90916f0ad306321edf9e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
