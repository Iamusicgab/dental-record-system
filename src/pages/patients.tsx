import { db } from "../components/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { AuthContext } from "../components/userContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
function Patients() {
	const currentUser = useContext(AuthContext);
	const [patients, setPatients] = useState<Array<Patient>>([]);
	const patientsdb = collection(db, "doctors", currentUser.uid, "patients");
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
				<Link key={index} to={`/patients/${patient.id}`}>
					<h1>{patient.name}</h1>
				</Link>
			))}
		</div>
	);
}

export default Patients;
