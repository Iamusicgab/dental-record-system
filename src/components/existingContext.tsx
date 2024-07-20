import { createContext, useContext, useState } from "react";

const context = createContext<any>({});
export const useExistingContext = () => useContext(context);

export default function ExistingContext({ children }: any) {
	const [page, setPage] = useState(0);
	const [data, setData] = useState({
		uid: "testiing",
		procedures: [],
	});
	return (
		<context.Provider value={{ data, page, setData, setPage }}>
			{children}
		</context.Provider>
	);
}
