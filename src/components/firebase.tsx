import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCtBM7pAMfftdH_yQdjI6LLrON481_ErtM",
	authDomain: "dental-record-system.firebaseapp.com",
	projectId: "dental-record-system",
	storageBucket: "dental-record-system.appspot.com",
	messagingSenderId: "368775360295",
	appId: "1:368775360295:web:c145047a35ab0356388302",
	measurementId: "G-R9N88F4WZR",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
