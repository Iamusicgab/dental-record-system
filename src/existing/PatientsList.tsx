import { useEffect, useState } from "react";
import { useExistingContext } from "../components/existingContext";
import { getExistingPatients } from "../components/userContext";

export default function PatientsList() {
	const [patients, setPatients] = useState<any>([]);
	const [loading, setLoading] = useState(true);

	const getPatients = async () => {
		const patients = await getExistingPatients();
		console.log(patients);
		setPatients(patients);
		setLoading(false);
	};

	const handleClick = (id: string) => {
		setPage((prev: any) => prev + 1);
		console.log(page);
		setData({ ...data, uid: id });
		console.log(data);
	};

	useEffect(() => {
		getPatients();
	}, []);
	const { data, setData, setPage, page } = useExistingContext();
	return (
		<div>
			{loading ? (
				<div>loading</div>
			) : (
				patients.map((patient: any, index: number) => {
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
