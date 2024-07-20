import ExistingContext from "../Hooks/existingContext";
import Wrapper from "../existing/Wrapper";

function Existing() {
	return (
		<ExistingContext>
			<Wrapper />
		</ExistingContext>
	);
}

export default Existing;
