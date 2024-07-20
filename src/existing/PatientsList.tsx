import { useEffect, useState } from "react";
import { useExistingContext } from "../Hooks/existingContext";
import { getExistingPatients } from "../Hooks/userContext";
import { Header } from "../components/Header";

export default function PatientsList() {
	const [patients, setPatients] = useState<any>([]);
	const [query, setQuery] = useState("");
	const [loading, setLoading] = useState(true);

	const getPatients = async () => {
		const patients = await getExistingPatients();
		console.log(patients);
		setPatients(patients);
		setLoading(false);
	};

	const handleClick = (name: string, id: string) => {
		setPage((prev: any) => prev + 1);
		console.log(page);
		setData({ ...data, name: name, uid: id });
		console.log(data);
	};

	useEffect(() => {
		getPatients();
	}, []);
	const { data, setData, setPage, page } = useExistingContext();
	return (
		<div className="flex flex-col gap-4">
			<Header name="Patient Database" backRef="/type" />
			<h1 className="text-2xl font-bold text-neutral">
				Who are we working on with today?
			</h1>
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
						.filter((patient: any) =>
							patient.name.toLowerCase().includes(query.toLowerCase())
						)
						.map((patient: any, index: any) => {
							return (
								<button
									className="text-left"
									key={index}
									onClick={() => handleClick(patient.name, patient.id)}
								>
									<div className="transition bg-primary hover:bg-primary-accent active:scale-[97%] px-4 py-5 border-2 border-primary-accent rounded-2xl">
										<h1 className="text-white font-semibold truncate">
											{patient.name}
										</h1>
									</div>
								</button>
							);
						})
				)}
			</div>
		</div>
	);
}
