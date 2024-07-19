import { useParams } from "react-router-dom";
import { db } from "../components/firebase";
import { useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { AuthContext } from "../components/userContext";

function ProcedurePlaceholder() {
	const [loading, setLoading] = useState(true);
	const [procedures, setProcedures] = useState<any>([]);
	const { id, procedureid } = useParams();
	const currentUser = useContext(AuthContext);
	const url = id || "";
	const url2 = procedureid || "";
	const patientsdb = doc(
		db,
		"doctors",
		currentUser.uid,
		"patients",
		url,
		"procedures",
		url2
	);
	const getProcedures = async () => {
		const data = await getDoc(patientsdb);
		const finalData = data.data();
		setProcedures(finalData);
		console.log(finalData);
		setLoading(false);
	};
	useEffect(() => {
		getProcedures();
	}, []);
	return (
		<>
			{loading ? (
				<h1>Loading...</h1>
			) : (
				<div>
					<h1>Procedure Placeholder of {procedureid}</h1>
					<h1>{procedures.procedureName}</h1>
					<p>
						<span>{procedures.date.toDate().toLocaleString()}</span>
					</p>
				</div>
			)}
		</>
	);
}
export default ProcedurePlaceholder;
