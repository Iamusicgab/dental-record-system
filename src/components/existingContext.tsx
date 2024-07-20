import { createContext, useContext, useState } from "react";

const Context = createContext<any>({});
export const useExistingContext = () => useContext(Context);

export default function ExistingContext({ children }: any) {
	const [page, setPage] = useState(0);
	const [data, setData] = useState({
		uid: "123",
		procedure: "",
	});
	return (
		<Context.Provider value={{ data, page, setData, setPage }}>
			{children}
		</Context.Provider>
	);
}
