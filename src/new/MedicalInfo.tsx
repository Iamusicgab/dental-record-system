import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { useNewContext } from "../Hooks/NewUserContext";

export default function MedicalInfo() {
	const { Prev, Next, data, setData } = useNewContext();
	useEffect(() => {
		setData((prev: any) => ({ ...prev }));
		console.log(data);
	}, [setData]);
	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setData((prev: any) => ({ ...prev, [name]: value }));
		console.log(data);
	};
	return (
		<div className="grid gap-2">
			<Header name="Medical Info" backRef="/type"></Header>
			<h1 className="text-2xl font-bold text-neutral">
				Alright, let's get some medical information!
			</h1>
			<form className="grid gap-2" onSubmit={Next}>
				<select
					required
					name="bloodType"
					title="Blood Type"
					className="input input-bordered input-md w-full"
					value={data.bloodType || ""}
					onChange={handleChange}
				>
					<option hidden disabled value="">
						Patient's Blood Type
					</option>
					<option>Unknown</option>
					<option>A+</option>
					<option>A-</option>
					<option>B+</option>
					<option>A-</option>
					<option>O+</option>
					<option>O-</option>
					<option>AB+</option>
					<option>AB-</option>
				</select>
				<input
					type="text"
					placeholder="Allergies (Optional)"
					name="allergies"
					title="Allergies"
					className="input input-bordered input-md w-full"
					value={data.allergies || ""}
					onChange={handleChange}
				/>
				<input
					type="text"
					placeholder="Medications (Optional)"
					name="medications"
					title="Medications"
					className="input input-bordered input-md w-full"
					value={data.medications || ""}
					onChange={handleChange}
				/>
				<div className="flex gap-2">
					<button
						onClick={Prev}
						className="btn btn-primary text-base-100 border-2 border-primary-accent grow"
					>
						Back
					</button>
					<button
						type="submit"
						className="btn btn-primary text-base-100 border-2 border-primary-accent grow"
					>
						Next
					</button>
				</div>
			</form>
		</div>
	);
}
