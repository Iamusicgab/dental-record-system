import { BackNext } from "../components/BackNext";
import { Header } from "../components/Header";
import { useNewContext } from "../Hooks/NewUserContext";

export default function Procedures() {
	const { data, setData, Prev, Next, page } = useNewContext();
	const handleChange = (e: any) => {
		setData({ ...data, [e.target.name]: e.target.value });
		console.log(data);
	};

	return (
		<>
			<form className="flex flex-col gap-4" onSubmit={Next}>
				<Header name="Procedure" backRef="/type" />
				<h1 className="text-2xl font-bold text-neutral">
					Alright, what procedure are we doing today?
				</h1>
				<div className="flex flex-col gap-2">
					<input
						required
						type="text"
						placeholder="Procedure"
						name="procedure"
						title="Procedure"
						className="input input-bordered input-md w-full"
						value={data.procedure || ""}
						onChange={handleChange}
					/>
					<textarea
						placeholder="Description (Optional)"
						name="description"
						title="Description"
						className="textarea-md border-2 focus:outline-offset-2 bg-base-100 rounded-md w-full h-48"
						value={data.description || ""}
						onChange={handleChange}
					/>
				</div>
				<BackNext Prev={Prev} Next={null} Page={page} />
			</form>
		</>
	);
}
