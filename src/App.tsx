import Home from "./pages/home";
import New from "./pages/new";
import Appointment from "./pages/appointment";
import Prescription from "./pages/prescription";
import Patients from "./pages/patients";
import PatientsPlaceholder from "./pages/patientsPlaceholder";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="bg-background p-4">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/new" element={<New />} />
					<Route path="/appointment" element={<Appointment />} />
					<Route path="/prescription" element={<Prescription />} />
					<Route path="/patients" element={<Patients />} />
					<Route path="/patients/:id" element={<PatientsPlaceholder />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
