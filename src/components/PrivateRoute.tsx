import { useContext } from "react";
import { AuthContext } from "../Hooks/userContext";

import { Navigate, Outlet } from "react-router-dom";
export default function PrivateRoute() {
	const currentUser = useContext(AuthContext);
	console.log(currentUser);

	return currentUser == undefined ? <Navigate to="/login" /> : <Outlet />;
}
