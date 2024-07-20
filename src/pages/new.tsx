import NewUserContext from "../Hooks/NewUserContext";
import Wrapper from "../new/Wrapper";

function New() {
	return (
		<NewUserContext>
			<Wrapper />
		</NewUserContext>
	);
}

export default New;
