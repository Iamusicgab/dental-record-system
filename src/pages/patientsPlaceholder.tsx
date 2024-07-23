import { useParams } from "react-router-dom";
import { db } from "../components/firebase";
import { useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { AuthContext, deletePatient } from "../Hooks/userContext";
import { Link } from "react-router-dom";
import { getPatientData } from "../Hooks/userContext";
import { Header } from "../components/Header";
import deletePic from "../assets/trash.svg";
import { useNavigate } from "react-router-dom";

function PatientsPlaceholder() {
	const nav = useNavigate();
	const [patient, setPatient] = useState<any>();
	const [error, setError] = useState("");
	const [successModal, setSuccessModal] = useState(false);
	const [warningDialog, setWarningDialog] = useState(false);
	const [errorDialog, setErrorDialog] = useState(false);
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

	const handleDelete = async () => {
		try {
			setLoading(true);
			await deletePatient(id);
			setLoading(false);
			setSuccessModal(true);
		} catch {
			console.log("error");
			setError("Error deleting procedure");
			setErrorDialog(true);
		}
	};
	const handleSuccessModalClose = () => {
		setSuccessModal(false);
		nav("/patients");
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
								<span className="text-xs">Contact Number</span>
								<span className="font-semibold">{patient.phoneNumber}</span>
							</div>
							<div className="inline-flex flex-col">
								<span className="text-xs">Address</span>
								<span className="font-semibold">{patient.address}</span>
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
								<span className="text-xs">Date of Birth</span>
								<span className="font-semibold">
									{(() => {
										const dob = new Date(patient.dob);
										return dob.toDateString().split(" ").slice(1).join(" ");
									})()}
								</span>
							</div>
							<div className="inline-flex flex-col">
								<span className="text-xs">Blood Type</span>
								<span className="font-semibold">{patient.bloodType}</span>
							</div>
							<div className="inline-flex flex-col">
								<span className="text-xs">Medications</span>
								{!patient.medications ? (
									<span className="font-semibold">No Medications</span>
								) : (
									<span className="font-semibold">{patient.medications}</span>
								)}
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
						<div className="flex flex-col justify-between items-end">
							<div>
								<img
									className="aspect-square max-w-20 object-cover rounded-xl"
									src={patient.picture || ""}
									alt="Patient Picture"
								/>
							</div>
							<button
								disabled={loading}
								onClick={() => setWarningDialog(true)}
								className="btn w-12 h-12 bg-warning p-[12px] rounded-md border-warning-content"
							>
								<img src={deletePic} alt="Delete" />
							</button>
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
			<dialog
				id="my_modal_5"
				open={successModal}
				className="modal modal-bottom sm:modal-middle"
			>
				<div className="modal-box">
					<div role="alert" className="alert alert-success">
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
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span>Patient has been deleted</span>
					</div>
					<div className="modal-action">
						<form method="dialog">
							{/* if there is a button in form, it will close the modal */}
							<button onClick={handleSuccessModalClose} className="btn">
								Close
							</button>
						</form>
					</div>
				</div>
			</dialog>
			<dialog
				id="my_modal_5"
				open={errorDialog}
				className="modal modal-bottom sm:modal-middle"
			>
				<div className="modal-box">
					<div role="alert" className="alert alert-warning">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 shrink-0 stroke-current"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span>{error}</span>
					</div>
					<div className="modal-action">
						<form method="dialog">
							{/* if there is a button in form, it will close the modal */}
							<button onClick={() => setErrorDialog(false)} className="btn">
								Close
							</button>
						</form>
					</div>
				</div>
			</dialog>
			<dialog
				id="my_modal_5"
				open={warningDialog}
				className="modal modal-bottom sm:modal-middle"
			>
				<div className="modal-box">
					<div role="alert" className="alert alert-error">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 shrink-0 stroke-current"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
						<span>Are you sure you want to delete this patient?</span>
					</div>
					<div className="modal-action ">
						<form method="dialog" className="grid grid-flow-col gap-2">
							<button onClick={() => setWarningDialog(false)} className="btn">
								Back
							</button>
							{/* if there is a button in form, it will close the modal */}
							<button onClick={handleDelete} className="btn btn-warning">
								Delete
							</button>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	);
}
export default PatientsPlaceholder;
