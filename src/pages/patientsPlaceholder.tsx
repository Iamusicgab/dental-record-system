import { useParams } from "react-router-dom";
import { db } from "../components/firebase";
import { useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { AuthContext } from "../components/userContext";
import { Link } from "react-router-dom";

function PatientsPlaceholder() {
	const [procedures, setProcedures] = useState<any>([]);
	const { id } = useParams();
	const currentUser = useContext(AuthContext);
	const url = id || "";
	const patientsdb = collection(
		db,
		"doctors",
		currentUser.uid,
		"patients",
		url,
		"procedures"
	);
	const getProcedures = async () => {
		const data = await getDocs(patientsdb);
		const finalData = data.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		console.log(finalData);
		setProcedures(finalData);
	};
	useEffect(() => {
		getProcedures();
	}, []);
	return (
		<div>
			<h1>Patients Placeholder of {id}</h1>
			{procedures.map((procedure: any, index: any) => (
				<Link to={`/patients/${id}/${procedure.id}`} key={index}>
					<h1>{procedure.procedureName}</h1>
					<p>
						<span>{procedure.date.toDate().toLocaleString()}</span>
					</p>
				</Link>
			))}
		</div>
	);
}
export default PatientsPlaceholder;
