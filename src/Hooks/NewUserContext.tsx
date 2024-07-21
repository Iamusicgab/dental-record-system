import { createContext, useState, useContext, Children } from "react";
import Wrapper from "../new/Wrapper";

export const NewContext = createContext<any>({});

export const useNewContext = () => useContext(NewContext);

export default function NewUserContext({ children }: any) {
	const [page, setPage] = useState(0);
	const [data, setData] = useState({
		name: "",
		dob: "",
		address: "",
		contactNumber: 0,
		picture: "",
		allergies: "",
		medications: "",
		bloodType: "",
		procedure: "",
		description: "",
		teeth: {},
	});
	const Next = () => {
		setPage((prev: any) => prev + 1);
	};
	const Prev = () => {
		setPage((prev: any) => prev - 1);
	};
	return (
		<NewContext.Provider value={{ data, page, setData, setPage, Next, Prev }}>
			{children}
		</NewContext.Provider>
	);
}
