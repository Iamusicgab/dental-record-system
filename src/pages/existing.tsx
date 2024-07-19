import PatientsList from "../existing/PatientsList";
import ExistingContext, {
	useExistingContext,
} from "../components/existingContext";

function Existing() {
	return (
		<ExistingContext>
			<PatientsList />
		</ExistingContext>
	);
}

export default Existing;
