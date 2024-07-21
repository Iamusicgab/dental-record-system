import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, storage } from "../components/firebase";
import {
	addDoc,
	setDoc,
	collection,
	doc,
	Timestamp,
	getDocs,
	getDoc,
	query,
	orderBy,
	deleteDoc,
} from "@firebase/firestore";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

export const AuthContext = createContext<any>(null);

const signIn = async (email: string, password: string) => {
	return await signInWithEmailAndPassword(auth, email, password);
};

const signUp = async (
	email: string,
	password: string,
	name: string,
	clinicName: string,
	prcNumber: number
) => {
	return await createUserWithEmailAndPassword(auth, email, password).then(
		(userCredential) => {
			const user = userCredential.user;
			setDoc(doc(db, "doctors", user.uid), {
				email,
				name,
				clinicName,
				prcNumber,
			});
		}
	);
};

const addNewPatient = async (data: any) => {
	const userId = auth.currentUser?.uid || "";
	try {
		const add = await addDoc(collection(db, "doctors", userId, "patients"), {
			name: data.name,
			dob: data.dob,
			phoneNumber: data.phoneNumber,
			address: data.address,
			bloodType: data.bloodType,
			allergies: data.allergies,
			medications: data.medications,
		});

		await addDoc(
			collection(db, "doctors", userId, "patients", add.id, "procedures"),
			{
				procedureName: data.procedure,

				date: Timestamp.now(),
			}
		);

		const storageRef = ref(
			storage,
			`doctors/${userId}/patients/${add.id}/picture.jpg`
		);
		const imageBlob = await fetch(data.picture).then((response) =>
			response.blob()
		);
		console.log(imageBlob);
		await uploadBytes(storageRef, imageBlob);

		return add;
	} catch (err) {
		console.log(err);
		throw new Error("Error adding patient");
	}
};

const getExistingPatients = async () => {
	const userId = auth.currentUser?.uid || "";
	const patients = query(
		collection(db, "doctors", userId, "patients"),
		orderBy("name", "asc")
	);
	const data = await getDocs(patients);

	return data.docs.map((doc) => {
		return {
			id: doc.id,
			...doc.data(),
		};
	});
};

const getPatientData = async (patientId: string) => {
	const userId = auth.currentUser?.uid || "";
	const patient = doc(db, "doctors", userId, "patients", patientId);
	const pictureRef = ref(
		storage,
		`doctors/${userId}/patients/${patientId}/picture.jpg`
	);
	const picture = await getDownloadURL(pictureRef);
	const data = await getDoc(patient);
	return {
		id: data.id,
		...data.data(),
		picture,
	};
};

const addProcedure = async (
	patientId: string,
	procedure: string,
	description: string
) => {
	const userId = auth.currentUser?.uid || "";
	try {
		const add = await addDoc(
			collection(db, "doctors", userId, "patients", patientId, "procedures"),
			{
				procedureName: procedure,
				description,
				date: Timestamp.now(),
			}
		);
		return add;
	} catch {
		console.log("error");
	}
};

const deletePatient = async (patientId: any) => {
	const userId = auth.currentUser?.uid || "";

	try {
		const data = doc(db, "doctors", userId, "patients", patientId);
		await deleteDoc(data);
	} catch {
		throw new Error("Error deleting patient");
	}
};

const deleteProcedure = async (patientId: any, docId: any) => {
	const userId = auth.currentUser?.uid || "";

	try {
		const data = doc(
			db,
			"doctors",
			userId,
			"patients",
			patientId,
			"procedures",
			docId
		);
		await deleteDoc(data);
	} catch {
		throw new Error("Error deleting patient");
	}
};

function UserContext({ children }: { children: React.ReactNode }) {
	const [currentUser, setCurrentUser] = useState<any>();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setLoading(false);
			if (user) {
				console.log(user);
				setCurrentUser(user);
			} else {
				console.log("not logged in");
			}
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider value={currentUser}>
			{!loading && children}
		</AuthContext.Provider>
	);
}

export default UserContext;
export {
	signIn,
	signUp,
	addNewPatient,
	getExistingPatients,
	addProcedure,
	getPatientData,
	deletePatient,
	deleteProcedure,
};
