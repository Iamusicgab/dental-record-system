import { createContext, useContext, useState } from "react";

const context = createContext({});
export const useExistingContext = () => useContext(context);

export default function ExistingContext({ children }: any) {
	const [data, setData] = useState({
		uid: "testiing",
		procedures: [],
	});
	return (
		<context.Provider value={{ data, setData }}>{children}</context.Provider>
	);
}
