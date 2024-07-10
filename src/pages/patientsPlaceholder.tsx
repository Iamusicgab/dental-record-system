import { useParams } from "react-router-dom";
import { db } from "../components/firebase";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";

function PatientsPlaceholder() {
	const { id } = useParams();
	return (
		<div>
			<h1>Patients Placeholder of {id}</h1>
		</div>
	);
}
export default PatientsPlaceholder;
