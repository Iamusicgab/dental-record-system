import React from "react";
import { Link } from "react-router-dom";

function Type() {
	return (
		<>
			<Link to="/new">
				<button className="btn btn-primary">New Patient</button>
			</Link>
			<Link to="/existing">
				<button className="btn btn-primary">Existing Patient</button>
			</Link>
		</>
	);
}

export default Type;
