import { useEffect } from "react";
import { useNewContext } from "../Hooks/NewUserContext";
import { Header } from "../components/Header";

export default function AfterPhoto() {
	useEffect(() => {
		setData((prev: any) => ({ ...prev }));
		console.log(data);
	}, []);
	const { data, setData, Prev, Next } = useNewContext();
	return (
		<div className="flex flex-col gap-4">
			<Header name="Photo" backRef="/type"></Header>
			<h1 className="text-2xl font-bold text-neutral">
				Captured! Let's take a look!
			</h1>
			<div className="flex flex-col gap-2">
				{" "}
				<div className="flex justify-center">
					<img
						className="rounded-2xl w-full max-w-96"
						src={data.picture}
						alt="After"
					/>
				</div>
				<div className="flex gap-2">
					<button
						onClick={Prev}
						className="btn btn-primary text-base-100 border-2 border-primary-accent grow"
					>
						Take Again
					</button>
					<button
						onClick={Next}
						className="btn btn-primary text-base-100 border-2 border-primary-accent grow"
					>
						Proceed
					</button>
				</div>
			</div>
		</div>
	);
}
