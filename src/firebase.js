import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyByBGTEobToFYHhWQXfCj4pASa-Wm7SZqA",
  authDomain: "algoblock-4a1c4.firebaseapp.com",
  databaseURL: "https://algoblock-4a1c4-default-rtdb.firebaseio.com",
  projectId: "algoblock-4a1c4",
  storageBucket: "algoblock-4a1c4.appspot.com",
  messagingSenderId: "721820683072",
  appId: "1:721820683072:web:004f6f7bfa4fec8c57c8a5",
  measurementId: "G-BT1SP62652"
};


const app = initializeApp(firebaseConfig);


export const database = getDatabase(app, "https://algoblock-4a1c4-default-rtdb.firebaseio.com/");
export const auth = getAuth(app);
export default app;