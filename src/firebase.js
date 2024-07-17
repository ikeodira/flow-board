// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBY2BMq1c4y1UK4mtqaZHAWU7IltkzvuTY",
  authDomain: "flowboard-4baaa.firebaseapp.com",
  projectId: "flowboard-4baaa",
  storageBucket: "flowboard-4baaa.appspot.com",
  messagingSenderId: "185292366037",
  appId: "1:185292366037:web:eaec838483287ef750c25c",
};

//Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const fbFunctions = getFunctions(app);

//its-ignore
// if (process.env.NODE_ENV === "development") {
//   connectAuthEmulator(auth, "http://localhost:9098");
//   connectFirestoreEmulator(db, "localhost", 8082);
//   connectFunctionsEmulator(fbFunctions, "localhost", 5002);
// }

if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
  connectFunctionsEmulator(fbFunctions, "localhost", 5001);
}
