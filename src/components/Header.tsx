import Back from "../assets/back.svg";
import { Link } from "react-router-dom";

export function Header({ name, backRef }: any) {
	return (
		<header className="flex items-center gap-4 sticky py-2 top-0 bg-base-100">
			<Link to={backRef}>
				<img src={Back} alt="Back Button" />
			</Link>
			<h1 className="text-secondary text-2xl font-bold">{name}</h1>
		</header>
	);
}
