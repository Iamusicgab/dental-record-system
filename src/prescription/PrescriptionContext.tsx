import { createContext, useContext, useState } from "react";

export const PrescriptionCont = createContext<any>({});
export const usePrescriptionContext = () => useContext(PrescriptionCont);

export default function PrescriptionContext({ children }: any) {
	const [page, setPage] = useState(0);
	const [data, setData] = useState({
		uid: "testiing",
		procedures: [],
	});
	return (
		<PrescriptionCont.Provider value={{}}>{children}</PrescriptionCont.Provider>
	);
}
