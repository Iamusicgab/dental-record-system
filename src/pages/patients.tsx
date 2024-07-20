import { Header } from "../components/Header";
import { db } from "../components/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { AuthContext } from "../Hooks/userContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Back from "../assets/back.svg";
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
		<div className="flex flex-col gap-4">
			<Header name="Patient Database" backRef="/" />
			<div className="flex flex-col gap-2">
				{patients.length == 0 ? (
					<div>No Patients yet</div>
				) : (
					patients.map((patient, index) => (
						<Link key={index} to={`/patients/${patient.id}`}>
							<div className="transition bg-primary hover:bg-primary-accent active:scale-[97%] px-4 py-5 border-2 border-primary-accent rounded-2xl">
								<h1 className="text-white font-semibold truncate">
									{patient.name}
								</h1>
							</div>
						</Link>
					))
				)}
			</div>
		</div>
	);
}

export default Patients;
