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
		setPage((prev: any) => prev + 1);
		console.log(page);
	};

	useEffect(() => {
		setData({ uid: "nigger", procedures: [] });
		getPatients();
	}, []);
	const { data, setData, setPage, page } = useExistingContext();
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
