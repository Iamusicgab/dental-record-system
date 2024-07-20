import ExistingContext from "../components/existingContext";
import Wrapper from "../existing/Wrapper";

function Existing() {
	return (
		<ExistingContext>
			<Wrapper />
		</ExistingContext>
	);
}

export default Existing;
