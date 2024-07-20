import { useEffect, useState } from "react";
import PatientsList from "../existing/PatientsList";
import ExistingContext, {
	useExistingContext,
} from "../components/existingContext";

function Existing() {
	const { data, page, setPage } = useExistingContext();
	useEffect(() => {
		setPage(0);
		console.log(page);
	}, []);
	const pages: any = {
		0: <PatientsList />,
		1: "Procedures",
		2: "Prescriptions",
	};

	return <ExistingContext>{pages[page]}</ExistingContext>;
}

export default Existing;
