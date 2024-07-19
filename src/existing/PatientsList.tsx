import { useEffect, useState } from "react";
import { useExistingContext } from "../components/existingContext";
import { getExistingPatients } from "../components/userContext";

export default function PatientsList() {
	const [patients, setPatients] = useState([]);
	const [loading, setLoading] = useState(true);

	const getPatients = async () => {
		const patients = await getExistingPatients();
		console.log(patients);
		setPatients(patients);
		setLoading(false);
	};

	const handleClick = (id: string) => {
		console.log(id);
	};

	useEffect(() => {
		setData({ uid: "nigger", procedures: [] });
		getPatients();
	}, []);
	const { data, setData } = useExistingContext();
	return (
		<div>
			{loading ? (
				<div>loading</div>
			) : (
				patients.map((patient, index) => {
					return (
						<button
							onClick={() => {
								handleClick(patient.id);
							}}
							key={index}
						>
							{patient.name} with ID {patient.id}
						</button>
					);
				})
			)}
		</div>
	);
}
