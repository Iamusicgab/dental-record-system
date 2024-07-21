import { useState } from "react";
import { useExistingContext } from "../Hooks/existingContext";
import { addProcedure } from "../Hooks/userContext";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
import TeethPlace from "../components/TeethPlace";

export default function Conclusion() {
	const nav = useNavigate();
	const { data, Prev } = useExistingContext();
	const [dialog, setDialog] = useState(false);
	const [errorDialog, setErrorDialog] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const handleSubmit = async () => {
		try {
			setLoading(true);
			await addProcedure(data.uid, data.procedure, data.description, data.teeth);
			setLoading(false);
			setDialog(true);
		} catch {
			setError("Something went wrong");
			setErrorDialog(true);
		}
	};
	const handleModalClose = () => {
		setDialog(false);
		nav("/");
	};
	return (
		<>
			<div className="flex flex-col gap-4">
				<Header name="Conclusion" backRef="/type" />
				<h1 className="text-2xl font-bold text-neutral">
					Nice! Let's wrap it up!
				</h1>
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-1">
						<span className="text-xs">Patient's Name:</span>
						<span className="font-semibold">{data.name}</span>
					</div>
					<div className="flex flex-col gap-1">
						<span className="text-xs">Procedure:</span>
						<span className="font-semibold">{data.procedure}</span>
					</div>
					<div className="flex flex-col gap-1">
						<span className="text-xs">Description:</span>
						<span className="font-semibold">
							{data.description == "" ? (
								<div>No Description</div>
							) : (
								data.description
							)}
						</span>
					</div>
					<TeethPlace data={data.teeth} />
				</div>
				<div className="flex gap-2">
					<button
						onClick={Prev}
						className="btn btn-primary text-base-100 border-2 border-primary-accent grow"
					>
						Back
					</button>
					<button
						disabled={loading}
						onClick={handleSubmit}
						className="btn btn-secondary text-base-100 border-2 border-secondary-accent grow"
					>
						{loading ? "Loading..." : "Submit"}
					</button>
				</div>
			</div>
			<dialog
				id="my_modal_5"
				open={dialog}
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
						<span>Your record has been added!</span>
					</div>
					<div className="modal-action">
						<form method="dialog">
							{/* if there is a button in form, it will close the modal */}
							<button onClick={handleModalClose} className="btn">
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
		</>
	);
}
