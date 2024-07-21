import PersonalInfo from "./PersonalInfo";
import MedicalInfo from "./MedicalInfo";
import Photo from "./Photo";
import Procedures from "./Procedures";
import Conclusion from "./Conclusion";
import { useNewContext } from "../Hooks/NewUserContext";
import BeforePhoto from "./BeforePhoto";
import AfterPhoto from "./AfterPhoto";
import Teeth from "./Teeth";

export default function Wrapper() {
	const { page } = useNewContext();
	const pages: any = {
		0: <PersonalInfo />,
		1: <BeforePhoto />,
		2: <Photo />,
		3: <AfterPhoto />,
		4: <MedicalInfo />,
		5: <Procedures />,
		6: <Teeth />,
		7: <Conclusion />,
	};
	return <div>{pages[page]}</div>;
}
