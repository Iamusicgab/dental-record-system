import { initializeApp } from "@firebase/app";
import { getFirestore, connectFirestoreEmulator } from "@firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";

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
const storage = getStorage(app);

connectFirestoreEmulator(db, "192.168.0.246", 8080);
connectAuthEmulator(auth, "http://192.168.0.246.:9099");
connectStorageEmulator(storage, "127.0.0.1", 9199);

export { app, db, auth, storage };
