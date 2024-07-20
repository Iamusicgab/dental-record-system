import { useEffect, useRef, useState } from "react";
import { Camera } from "react-camera-pro";
import { useNewContext } from "../Hooks/NewUserContext";
import { Header } from "../components/Header";
import cameraSvg from "../assets/camera.svg";

export default function Photo() {
	const { Next, setData, data } = useNewContext();
	const camera = useRef<any>(null);
	const [image, setImage] = useState<string>("");
	const [photoTaken, setPhotoTaken] = useState<boolean>(false);

	useEffect(() => {
		setData((prev: any) => ({ ...prev, picture: image }));
		console.log("Updated image:", image);
	}, [image, setData]);

	useEffect(() => {
		console.log("Updated data:", data);
		if (photoTaken) {
			Next();
			setPhotoTaken(false); // Reset the flag after calling Next()
		}
	}, [data, photoTaken, Next]);

	const handleClick = () => {
		const photo = camera.current.takePhoto();
		setImage(photo);
		setPhotoTaken(true); // Set the flag to true after taking the photo
	};

	return (
		<div className="flex flex-col gap-4">
			<Header name="Photo" backRef="/type" />
			<h1 className="text-2xl font-bold text-neutral">Say cheese!</h1>
			<div className=" flex flex-col items-center gap-4">
				<div className="w-full max-w-72 outline outline-2 outline-offset-4 outline-primary-accent">
					<Camera
						facingMode="environment"
						ref={camera}
						errorMessages={{}}
						aspectRatio={1 / 1}
					/>
				</div>
				<button
					onClick={handleClick}
					className="btn w-fit btn-primary text-base-100 border-2 border-primary-accent"
				>
					<img src={cameraSvg} alt="Camera" className="w-6" />
				</button>
			</div>
		</div>
	);
}
