import { useState } from "react";
import { useExistingContext } from "../Hooks/existingContext";

export default function Procedures() {
	const { data, setData, setPage } = useExistingContext();
	const [procedure, setProcedure] = useState("");
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value);
		setProcedure(e.target.value);
	};
	const handleClick = () => {
		setPage((prev: any) => prev + 1);
		setData({
			...data,
			procedure: procedure,
		});
		console.log(data);
	};
	return (
		<>
			<input
				required
				type="text"
				placeholder="Procedure"
				name="procedureName"
				title="Procedure"
				className="input input-bordered input-md w-full"
				onChange={handleChange}
			/>
			<button onClick={handleClick} className="btn btn-primary">
				Next
			</button>
		</>
	);
}
