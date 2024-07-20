import React from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";

function Type() {
	return (
		<div className="flex flex-col gap-4">
			<Header name="Select Patient Type" backRef="/" />
			<h1 className="text-2xl font-bold text-neutral">
				Alright, let's get started Doc!
			</h1>
			<div className="flex flex-col gap-2">
				<Link to="/new">
					<div className="transition bg-primary hover:bg-primary-accent active:scale-[97%] px-4 py-5 border-2 border-primary-accent rounded-2xl">
						<h1 className="text-white font-semibold truncate">New Patient</h1>
					</div>
				</Link>
				<Link to="/existing">
					<div className="transition bg-primary hover:bg-primary-accent active:scale-[97%] px-4 py-5 border-2 border-primary-accent rounded-2xl">
						<h1 className="text-white font-semibold truncate">
							Existing Patient
						</h1>
					</div>
				</Link>
			</div>
		</div>
	);
}

export default Type;
