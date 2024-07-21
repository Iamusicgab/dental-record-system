import { useState, useContext } from "react";
import calendarPic from "../assets/calendar.svg";
import rxPic from "../assets/rx.svg";
import addPic from "../assets/add.svg";
import dbPic from "../assets/db.svg";
import settingsPic from "../assets/settings.svg";
import { AuthContext } from "../Hooks/userContext";
import { useNavigate } from "react-router-dom";
import { settings } from "firebase/analytics";

function Home() {
	const currentUser = useContext(AuthContext);
	const [doctorFirstname, setDoctorFirstname] = useState("n/a");
	const [activeAppointmentsToday, setActiveAppointmentsToday] = useState(2);
	const [isSignedIn, setIsSignedIn] = useState(false);
	const nav = useNavigate();
	const navButton = (link: string) => {
		nav(link);
	};

	return (
		<div>
			<h1 className="text-2xl font-bold">
				Good day
				<br />
				Doc {doctorFirstname}!
			</h1>

			<div>
				<span className="font-bold">
					You have
					{activeAppointmentsToday === 0
						? " no "
						: ` ${activeAppointmentsToday} `}
					Appointments today
				</span>
				<div className="bg-secondary p-4 rounded-3xl border-4 border-secondary-accent">
					<div className="flex gap-2">
						<span className="w-20">1:30PM</span>
						<span className="flex-grow truncate text-right">
							Mr. Gabriel Alexis F. Gonzales
						</span>
					</div>
					<div className="flex gap-2">
						<span>44:44AM</span>
						<span className="flex-grow truncate text-right">
							Meeting with Gabriel Alexis F. Gonzales
						</span>
					</div>
				</div>
			</div>

			<nav className="fixed md:inline left-0 bottom-0 w-full max-w-3xl p-4">
				<div className="flex md:grid grid-cols-2 w-full justify-around gap-2">
					<button
						onClick={() => {
							navButton("/appointment");
						}}
						className=" transition p-2 bg-primary active:scale-[97%] hover:bg-primary-accent flex flex-grow justify-center items-center md:justify-start rounded-2xl border-4 border-primary-accent"
					>
						<img className="w-fit" src={calendarPic} alt="Calendar" />
						<span className="hidden md:inline">Set an Appointment</span>
					</button>
					<button
						onClick={() => {
							navButton("/prescription");
						}}
						className=" transition p-2 bg-primary active:scale-[97%] hover:bg-primary-accent flex flex-grow justify-center items-center md:justify-start rounded-2xl border-4 border-primary-accent"
					>
						<img className="w-fit" src={rxPic} alt="Prescription" />
						<span className="hidden md:inline">Create a Prescription</span>
					</button>
					<button
						onClick={() => {
							navButton("/type");
						}}
						className=" transition p-2 bg-primary active:scale-[97%] hover:bg-primary-accent flex flex-grow justify-center items-center md:justify-start rounded-2xl border-4 border-primary-accent"
					>
						<img className="w-fit" src={addPic} alt="Create New Record" />
						<span className="hidden md:inline">New Record</span>
					</button>
					<button
						onClick={() => {
							navButton("/patients");
						}}
						className=" transition p-2 bg-primary active:scale-[97%] hover:bg-primary-accent flex flex-grow justify-center items-center md:justify-start rounded-2xl border-4 border-primary-accent"
					>
						<img className="w-fit" src={dbPic} alt="Patient Records" />
						<span className="hidden md:inline">Patient Records</span>
					</button>
					<button
						onClick={() => {
							navButton("/settings");
						}}
						className=" transition p-2 min-w-9 bg-primary active:scale-[97%] hover:bg-primary-accent flex flex-grow justify-center items-center md:justify-start rounded-2xl border-4 border-primary-accent"
					>
						<img className="w-fit" src={settingsPic} alt="Patient Records" />
						<span className="hidden md:inline">Patient Records</span>
					</button>
				</div>
			</nav>
		</div>
	);
}

export default Home;
