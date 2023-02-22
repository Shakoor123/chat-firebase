// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCwSjwzb896V64MIz8IKnPcyg3GOHTrJMA",
//   authDomain: "chat-726a2.firebaseapp.com",
//   projectId: "chat-726a2",
//   storageBucket: "chat-726a2.appspot.com",
//   messagingSenderId: "655570286482",
//   appId: "1:655570286482:web:ffc7239c5eaf407fc6f34b",
//   measurementId: "G-K3GPL0SCBY",
// };
const firebaseConfig = {
  apiKey: "AIzaSyBqyfAqavT7uHtMmcPPnTgCMt8wHjzwWDU",
  authDomain: "new-chat-48704.firebaseapp.com",
  projectId: "new-chat-48704",
  storageBucket: "new-chat-48704.appspot.com",
  messagingSenderId: "712682319686",
  appId: "1:712682319686:web:f149752bb1312b3765ff47",
  measurementId: "G-PHQB3ZCGS4",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();
