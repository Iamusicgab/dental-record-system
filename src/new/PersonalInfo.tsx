import { useNewContext } from "../Hooks/NewUserContext";
import { BackNext } from "../components/BackNext";
import { Header } from "../components/Header";

export default function PersonalInfo() {
	const { data, setData, Next, page } = useNewContext();
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
				<BackNext Next={null} Page={page} />
			</form>
		</div>
	);
}
