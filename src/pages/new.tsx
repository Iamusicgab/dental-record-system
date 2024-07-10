import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../components/firebase";
import { useState } from "react";

function New() {
	const [newPatientData, setNewPatientData] = useState({
		name: "",
		dob: "",
		address: "",
		procedures: [
			{
				procedureName: "",
				date: "",
			},
		],
	});
	const [error, setError] = useState("");
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		addDoc(collection(db, "doctors", "docGab", "patients"), {
			...newPatientData,
			procedures: [
				{
					...newPatientData.procedures[0],
					date: Timestamp.now(),
				},
			],
		});
		console.log("Submitted");
		console.log(newPatientData);
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
				placeholder="Patient's Full Name"
				title="Name"
				autoCorrect="off"
				autoCapitalize="words"
				autoComplete="name"
				className="input input-bordered input-md w-full"
				onChange={(e) => {
					setNewPatientData({ ...newPatientData, name: e.target.value });
				}}
			/>
			<input
				required
				type="date"
				placeholder="DD-MM-YYYY"
				title="Birthday"
				className="input input-bordered input-md w-full"
				onChange={(e) => {
					setNewPatientData({ ...newPatientData, dob: e.target.value });
				}}
			/>
			<input
				required
				type="text"
				placeholder="Address"
				title="Address"
				autoCorrect="off"
				autoCapitalize="words"
				autoComplete="address-level1"
				className="input input-bordered input-md w-full"
				onChange={(e) => {
					setNewPatientData({ ...newPatientData, address: e.target.value });
				}}
			/>
			<input
				required
				type="text"
				placeholder="Procedure"
				title="Procedure"
				className="input input-bordered input-md w-full"
				onChange={(e) => {
					setNewPatientData({
						...newPatientData,
						procedures: [
							{
								...newPatientData.procedures[0],
								procedureName: e.target.value,
							},
						],
					});
				}}
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
