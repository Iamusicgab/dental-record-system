import { useState, useEffect } from "react";
import { useExistingContext } from "../components/existingContext";
import PatientsList from "../existing/PatientsList";
import Procedures from "../existing/Procedures";
import Conclusion from "./Conclusion";

export default function Wrapper() {
	const { data, page, setPage } = useExistingContext();
	useEffect(() => {
		console.log(page);
	}, []);
	const pages: any = {
		0: <PatientsList />,
		1: <Procedures />,
		2: <Conclusion />,
	};
	return <div>{pages[page]}</div>;
}
