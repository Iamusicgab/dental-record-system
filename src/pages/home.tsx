import { useState, useContext, useEffect } from "react";
import calendarPic from "../assets/calendar.svg";
import rxPic from "../assets/rx.svg";
import addPic from "../assets/add.svg";
import dbPic from "../assets/db.svg";
import settingsPic from "../assets/settings.svg";
import { AuthContext, logout, getDoctorData } from "../Hooks/userContext";
import { useNavigate } from "react-router-dom";

function Home() {
	const currentUser = useContext(AuthContext);
	const setDoctor = async () => {
		const data = await getDoctorData();
		setUser(data as any);
	};
	useEffect(() => {
		if (currentUser) {
			setUser(currentUser);
			console.log(currentUser);
			setDoctor();
			setLoading(false);
		}
	}, []);
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const nav = useNavigate();
	const buttonDesign =
		"transition p-2 md:p-4 py-4 md:h-32 bg-primary active:scale-[97%] hover:bg-primary-accent flex md:flex-col flex-grow justify-center items-center md:items-start md:justify-end gap-2 rounded-2xl border-4 border-primary-accent disabled:bg-gray-200 disabled:cursor-not-allowed disabled:border-gray-300";
	const buttonDesignWarning =
		"transition p-2 md:p-4 py-4 md:h-32 bg-warning active:scale-[97%] hover:bg-warning-accent flex md:flex-col flex-grow justify-center items-center md:items-start md:justify-end gap-2 rounded-2xl border-4 border-warning-accent disabled:bg-gray-200 disabled:cursor-not-allowed disabled:border-gray-300";
	const inButtonDesign = "w-6 md:w-10";
	const inButtonTextDesign = "text-white font-bold text-lg";
	const handleSignOut = async () => {
		await logout();
		window.location.reload();
	};
	const navButton = (link: string) => {
		nav(link);
	};

	return loading ? (
		<>Loading</>
	) : (
		<div>
			<h1 className="text-2xl font-bold text-accent">
				Good day
				<br />
				Doc{" "}
				{(() => {
					if (user) {
						return user.name?.split(" ")[0];
					}
					return "";
				})()}
				!
			</h1>

			{/* <div>
				<span className="font-bold">You have 0 Appointments today</span>
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
			</div> */}

			<div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-screen-xl justify-around gap-2 p-4">
				<button
					disabled
					onClick={() => {
						navButton("/appointment");
					}}
					className={buttonDesign}
				>
					<img className={inButtonDesign} src={calendarPic} alt="Calendar" />
					<span className={inButtonTextDesign}>Set an Appointment</span>
				</button>
				<button
					disabled
					onClick={() => {
						navButton("/prescription");
					}}
					className={buttonDesign}
				>
					<img className={inButtonDesign} src={rxPic} alt="Prescription" />
					<span className={inButtonTextDesign}>Create a Prescription</span>
				</button>
				<button
					onClick={() => {
						navButton("/type");
					}}
					className={buttonDesign}
				>
					<img
						className={inButtonDesign}
						src={addPic}
						alt="Create New Record"
					/>
					<span className={inButtonTextDesign}>New Record</span>
				</button>
				<button
					onClick={() => {
						navButton("/patients");
					}}
					className={buttonDesign}
				>
					<img className={inButtonDesign} src={dbPic} alt="Patient Records" />
					<span className={inButtonTextDesign}>Patient Records</span>
				</button>
				<button onClick={handleSignOut} className={buttonDesignWarning}>
					<img
						className={inButtonDesign}
						src={settingsPic}
						alt="Patient Records"
					/>
					<span className={inButtonTextDesign}>Sign Out</span>
				</button>
			</div>
		</div>
	);
}

export default Home;
