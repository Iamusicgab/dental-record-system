import { useState, useContext } from "react";
import { useNewContext } from "../Hooks/NewUserContext";
import { Header } from "../components/Header";

export default function PersonalInfo() {
	const { data, setData, Next } = useNewContext();
	const [user, setUser] = useState({});
	const handleChange = (e: any) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};
	return (
		<div className="grid gap-4">
			<Header name="New Patient" backRef="/type"></Header>
			<h1 className="text-2xl font-bold text-neutral">
				Nice! Let's get some personal information
			</h1>
			<form className="grid gap-2" onSubmit={Next}>
				<input
					required
					type="text"
					placeholder="Patient's Full Name"
					autoCapitalize="words"
					autoComplete="name"
					name="name"
					title="name"
					className="input input-bordered input-md w-full"
					value={data.name || ""}
					onChange={handleChange}
				/>
				<input
					required
					type="dob"
					placeholder="Date of Birth"
					name="dob"
					onFocus={(e) => {
						e.currentTarget.type = "date";
						e.target.click();
					}}
					title="dob"
					className="input input-bordered input-md w-full"
					value={data.dob || ""}
					onChange={handleChange}
				/>
				<input
					required
					type="number"
					placeholder="Phone Number"
					autoComplete="tel"
					name="phoneNumber"
					title="Phone Number"
					className="input input-bordered input-md w-full"
					value={data.phoneNumber || ""}
					onChange={handleChange}
				/>
				<input
					required
					type="text"
					placeholder="Address"
					autoComplete="address-level1"
					name="address"
					title="Address"
					className="input input-bordered input-md w-full"
					value={data.address || ""}
					onChange={handleChange}
				/>
				<div className="flex gap-2">
					<button
						type="submit"
						className="btn btn-primary text-base-100 border-2 border-primary-accent grow"
					>
						Next
					</button>
				</div>
			</form>
		</div>
	);
}
