import { useNewContext } from "../Hooks/NewUserContext";
import { Header } from "../components/Header";
import { BackNext } from "../components/BackNext";

export default function BeforePhoto() {
	const { Prev, Next, Page } = useNewContext();

	return (
		<div className="grid gap-4">
			<Header name="Photo" backRef="/type"></Header>
			<h1 className="text-2xl font-bold text-neutral">
				Nice! Let's take a photo!
			</h1>
			<BackNext Prev={Prev} Next={Next} Page={Page} />
		</div>
	);
}
