import { db } from "../components/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
function Patients() {
	const [patients, setPatients] = useState<Array<Patient>>([]);
	const patientsdb = collection(db, "doctors", "docGab", "patients");
	interface Patient {
		id: string;
		name: string;
		dob: string;
		address: string;
		procedures: Array<{ procedure: string; date: string }>;
	}
	const getPatients = async () => {
		const data = await getDocs(patientsdb);

		const finalData = data.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		})) as Patient[];
		setPatients(finalData);
	};

	useEffect(() => {
		getPatients();
	}, []);
	return (
		<div>
			{patients.map((patient, index) => (
				<h1 key={index}>{patient.name}</h1>
			))}
		</div>
	);
}

export default Patients;
