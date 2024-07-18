import { initializeApp } from "@firebase/app";
import { getFirestore, connectFirestoreEmulator } from "@firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCs4HaxjCCcZ3pWEh0e78hL1q3ikC3RVnI",
	authDomain: "dental-record-system-c0695.firebaseapp.com",
	projectId: "dental-record-system-c0695",
	storageBucket: "dental-record-system-c0695.appspot.com",
	messagingSenderId: "446706234689",
	appId: "1:446706234689:web:bf0ba66243dc8568ee5dc0",
	measurementId: "G-8PHMT0LBN7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

connectFirestoreEmulator(db, "localhost", 8080);
connectAuthEmulator(auth, "http://localhost:9099");

export { app, db, auth };
