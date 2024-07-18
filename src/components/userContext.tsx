import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export const AuthContext = createContext<any>(null);

function UserContext({ children }: { children: React.ReactNode }) {
	const [currentUser, setCurrentUser] = useState<any>();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		console.log("render");
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setLoading(false);
			if (user) {
				console.log(user);
				setCurrentUser(user);
			} else {
				console.log("not logged in");
			}
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider value={currentUser}>
			{!loading && children}
		</AuthContext.Provider>
	);
}

export default UserContext;
