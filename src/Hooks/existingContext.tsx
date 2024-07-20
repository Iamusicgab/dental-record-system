import { createContext, useContext, useState } from "react";

const Context = createContext<any>({});
export const useExistingContext = () => useContext(Context);

export default function ExistingContext({ children }: any) {
	const [page, setPage] = useState(0);
	const [data, setData] = useState({
		name: "",
		uid: "",
		procedure: "",
		description: "",
	});
	const Next = () => {
		setPage((prev: any) => prev + 1);
	};
	const Prev = () => {
		setPage((prev: any) => prev - 1);
	};
	return (
		<Context.Provider value={{ data, page, setData, setPage, Next, Prev }}>
			{children}
		</Context.Provider>
	);
}
