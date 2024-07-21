import { useParams } from "react-router-dom";
import { db } from "../components/firebase";
import { useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { AuthContext, deleteProcedure } from "../Hooks/userContext";
import { Header } from "../components/Header";

function ProcedurePlaceholder() {
	const [loading, setLoading] = useState(true);
	const [successModal, setSuccessModal] = useState(false);
	const [warningDialog, setWarningDialog] = useState(false);
	const [errorDialog, setErrorDialog] = useState(false);
	const [error, setError] = useState("");
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
	const handleDelete = async () => {
		try {
			setLoading(true);
			await deleteProcedure(id, procedureid);
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
		window.history.back();
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
								{!procedures.description ? (
									<div>No Description</div>
								) : (
									procedures.description
								)}
							</span>
						</div>
						<div>
							<button
								disabled={loading}
								className="btn btn-warning text-base-100 border-2 border-warning-content grow"
								onClick={() => setWarningDialog(true)}
							>
								Delete
							</button>
						</div>
					</div>
				</div>
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
						<span>Procedure has been deleted</span>
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
						<span>Are you sure you want to delete this procedure?</span>
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
		</>
	);
}
export default ProcedurePlaceholder;
