import { Header } from "../components/Header";
import { db } from "../components/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { AuthContext, getExistingPatients } from "../Hooks/userContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Back from "../assets/back.svg";
function Patients() {
	const currentUser = useContext(AuthContext);
	const [patients, setPatients] = useState<Array<Patient>>([]);
	const [query, setQuery] = useState("");
	const patientsdb = collection(db, "doctors", currentUser.uid, "patients");
	interface Patient {
		id: string;
		name: string;
		dob: string;
		address: string;
		procedures: Array<{ procedure: string; date: string }>;
	}
	const getPatients = async () => {
		const data = await getExistingPatients();
		setPatients(data);
	};

	useEffect(() => {
		getPatients();
	}, []);
	return (
		<div className="flex flex-col gap-4">
			<Header name="Patient Database" backRef="/" />
			<div className="flex flex-col gap-2">
				<label className="input input-bordered flex items-center gap-2">
					<input
						onChange={(e) => setQuery(e.target.value)}
						type="text"
						className="grow"
						placeholder="Search"
					/>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						fill="currentColor"
						className="h-4 w-4 opacity-70"
					>
						<path
							fillRule="evenodd"
							d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
							clipRule="evenodd"
						/>
					</svg>
				</label>
				{patients.length == 0 ? (
					<div>No Patients yet</div>
				) : (
					patients
						.filter((patient) =>
							patient.name.toLowerCase().includes(query.toLowerCase())
						)
						.map((patient, index) => {
							return (
								<Link key={index} to={`/patients/${patient.id}`}>
									<div className="transition bg-primary hover:bg-primary-accent active:scale-[97%] px-4 py-5 border-2 border-primary-accent rounded-2xl">
										<h1 className="text-white font-semibold truncate">
											{patient.name}
										</h1>
									</div>
								</Link>
							);
						})
				)}
			</div>
		</div>
	);
}

export default Patients;
