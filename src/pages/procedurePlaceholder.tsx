import { useParams } from "react-router-dom";
import { db } from "../components/firebase";
import { useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Hooks/userContext";
import { Header } from "../components/Header";

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
			<Header name="Procedure Info" backRef={`/patients/${id}`} />
			{loading ? (
				<h1>Loading...</h1>
			) : (
				<div>
					<div className="flex flex-col gap-4 mt-4">
						<div className="flex flex-col gap-1">
							<span className="text-xs">Procedure:</span>
							<span className="font-semibold">{procedures.procedureName}</span>
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-xs">Date:</span>

							<span className="font-semibold">
								{procedures.date.toDate().toDateString()} at{" "}
								{procedures.date.toDate().toLocaleTimeString()}
							</span>
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-xs">Description:</span>
							<span className="font-semibold">
								{procedures.description == "" ? (
									<div>No Description</div>
								) : (
									procedures.description
								)}
							</span>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
export default ProcedurePlaceholder;
