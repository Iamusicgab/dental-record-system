import React from "react";
import { useExistingContext } from "../Hooks/existingContext";
import { addProcedure } from "../Hooks/userContext";

export default function Conclusion() {
	const { data, setData, setPage } = useExistingContext();
	return (
		<>
			<div>Conclusion</div>
			<span>UID: {data.uid}</span>
			<span>Procedure: {data.procedure}</span>
			<button onClick={() => addProcedure(data.uid, data.procedure)}>
				Submit
			</button>
			<button onClick={() => setPage((prev: any) => prev - 1)}>Back</button>
		</>
	);
}
