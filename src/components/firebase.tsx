import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_VERCEL_APIKEY,
	authDomain: import.meta.env.VITE_VERCEL_AUTHDOMAIN,
	projectId: import.meta.env.VITE_VERCEL_PROJECTID,
	storageBucket: import.meta.env.VITE_VERCEL_STORAGEBUCKET,
	messagingSenderId: import.meta.env.VITE_VERCEL_MESSAGINGSENDERID,
	appId: import.meta.env.VITE_VERCEL_APPID,
	measurementId: import.meta.env.VITE_VERCEL_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// import firebaseEmulator from "./firebaseEmulator";
// firebaseEmulator();

export { app, db, auth, storage };
