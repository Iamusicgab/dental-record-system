import { addNewPatient } from "../Hooks/userContext";
import { useState } from "react";

function New() {
	const [newPatientData, setNewPatientData] = useState({
		name: "",
		dob: "",
		address: "",
		procedureName: "",
	});
	const [error, setError] = useState("");
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await addNewPatient(
			newPatientData.name,
			newPatientData.dob,
			newPatientData.address,
			newPatientData.procedureName
		);
		console.log("Submitted");
		console.log(newPatientData);
	};
	const handleChange = (e: any) => {
		setNewPatientData({ ...newPatientData, [e.target.name]: e.target.value });
	};
	return (
		<form
			className="bg-teal-500"
			onSubmit={handleSubmit}
			onInvalid={() => {
				setError("Please fill out all fields.");
			}}
		>
			<input
				required
				type="text"
				name="name"
				placeholder="Patient's Full Name"
				title="Name"
				autoCorrect="off"
				autoCapitalize="words"
				autoComplete="name"
				className="input input-bordered input-md w-full"
				onChange={handleChange}
			/>
			<input
				required
				type="date"
				name="dob"
				placeholder="DD-MM-YYYY"
				title="Birthday"
				className="input input-bordered input-md w-full"
				onChange={handleChange}
			/>
			<input
				required
				type="text"
				name="address"
				placeholder="Address"
				title="Address"
				autoCorrect="off"
				autoCapitalize="words"
				autoComplete="address-level1"
				className="input input-bordered input-md w-full"
				onChange={handleChange}
			/>
			<input
				required
				type="text"
				placeholder="Procedure"
				name="procedureName"
				title="Procedure"
				className="input input-bordered input-md w-full"
				onChange={handleChange}
			/>
			<input
				type="submit"
				placeholder="Submit"
				title="Procedure"
				className="btn btn-primary flex w-full justify-center items-center rounded-2xl border-4 border-primary-accent"
			/>
			{error && (
				<div role="alert" className="alert alert-warning">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 shrink-0 stroke-current"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>{error}</span>
				</div>
			)}
		</form>
	);
}

export default New;
