import { useContext } from "react";
import { AuthContext } from "./userContext";

import { Navigate, Outlet } from "react-router-dom";
export default function PrivateRoute() {
	const user = useContext(AuthContext);
	console.log(user);

	return user ? <Outlet /> : <Navigate to="/login" />;
}
