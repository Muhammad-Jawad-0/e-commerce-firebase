import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth,createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDUrCJ3ecQENNJM6gRoYz0R1PnxarrC00E",
  authDomain: "blogging-app-bc70f.firebaseapp.com",
  databaseURL: "https://blogging-app-bc70f-default-rtdb.firebaseio.com",
  projectId: "blogging-app-bc70f",
  storageBucket: "blogging-app-bc70f.appspot.com",
  messagingSenderId: "449581361582",
  appId: "1:449581361582:web:b3a08dee7bd1bac511403f",
  measurementId: "G-D3YM2YSLXW",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth ,createUserWithEmailAndPassword}