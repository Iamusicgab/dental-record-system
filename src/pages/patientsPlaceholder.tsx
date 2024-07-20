import { useParams } from "react-router-dom";
import { db } from "../components/firebase";
import { useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Hooks/userContext";
import { Link } from "react-router-dom";
import { getPatientData } from "../Hooks/userContext";
import { Header } from "../components/Header";
import samplepic from "../assets/samplepic.jpg";

function PatientsPlaceholder() {
	const [patient, setPatient] = useState<any>();
	const [procedures, setProcedures] = useState<any>([]);
	const [loading, setLoading] = useState(true);
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
		setProcedures(finalData);
	};

	const PatientData = async () => {
		const data = await getPatientData(id ?? "");
		setPatient(data);
		setLoading(false);
	};
	useEffect(() => {
		PatientData();
		getProcedures();
	}, []);
	return (
		<div className="flex flex-col gap-4">
			{loading ? (
				<div>loading</div>
			) : (
				<>
					<Header name="Patient Info" backRef="/patients" />
					<div className="flex justify-between gap-2 bg-secondary border-2 border-secondary-accent rounded-2xl p-4 text-white">
						<div className="flex flex-col gap-2">
							<div className="inline-flex flex-col">
								<span className="text-xs">Name</span>
								<span className="font-semibold">{patient.name}</span>
							</div>
							<div className="inline-flex flex-col">
								<span className="text-xs">Address</span>
								<span className="font-semibold">{patient.address}</span>
							</div>
							<div className="inline-flex flex-col">
								<span className="text-xs">Date of Birth</span>
								<span className="font-semibold">
									{(() => {
										const dob = new Date(patient.dob);
										return dob.toDateString().split(" ").slice(1).join(" ");
									})()}
								</span>
							</div>
							<div className="inline-flex flex-col">
								<span className="text-xs">Age</span>
								<span className="font-semibold">
									{(() => {
										const dob = new Date(patient.dob);
										const age = Math.floor(
											(Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365)
										);
										return age.toString();
									})()}
								</span>
							</div>
							<div className="inline-flex flex-col">
								<span className="text-xs">Allergies</span>
								{!patient.allergies ? (
									<span className="font-semibold">No Allergies</span>
								) : (
									<span className="font-semibold">{patient.allergies}</span>
								)}
							</div>
						</div>
						<div>
							<img
								className="aspect-square max-w-20 object-cover rounded-xl"
								src={samplepic}
								alt="Patient Picture"
							/>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<h1 className="mb-1">Procedures</h1>
						{procedures.map((procedure: any, index: any) => {
							return (
								<Link to={`/patients/${id}/${procedure.id}`} key={index}>
									<div className="flex justify-between gap-2 transition bg-primary hover:bg-primary-accent active:scale-[97%] px-4 py-5 border-2 border-primary-accent rounded-2xl text-white">
										{" "}
										<h1 className="truncate font-semibold">
											{procedure.procedureName}
										</h1>
										<span className="whitespace-nowrap">
											{procedure.date
												.toDate()
												.toDateString()
												.split(" ")
												.slice(1)
												.join(" ")}
										</span>
									</div>
								</Link>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
}
export default PatientsPlaceholder;
