import React, { useEffect } from "react";
import { User } from "../App";
import { createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export const AuthContext = createContext<User | undefined>({
	name: "",
	email: "",
	prcNumber: 0,
	clinicName: "",
	patients: []
});

function UserContext({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log(user.uid);
			} else {
				console.log("not logged in");
			}
		});
		return unsubscribe;
	}, []);

	const value = undefined;

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default UserContext;
