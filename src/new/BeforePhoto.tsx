import { useNewContext } from "../Hooks/NewUserContext";
import { useContext } from "react";
import { Header } from "../components/Header";

export default function BeforePhoto() {
	const { Prev, Next } = useNewContext();

	return (
		<div className="grid gap-4">
			<Header name="Photo" backRef="/type"></Header>
			<h1 className="text-2xl font-bold text-neutral">
				Nice! Let's take a photo!
			</h1>
			<div className="flex gap-2">
				<button
					onClick={Prev}
					className="btn btn-primary text-base-100 border-2 border-primary-accent grow"
				>
					Back
				</button>
				<button
					onClick={Next}
					className="btn btn-primary text-base-100 border-2 border-primary-accent grow"
				>
					Next
				</button>
			</div>
		</div>
	);
}
