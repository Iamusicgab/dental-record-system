import React from "react";
export function BackNext({
	Prev,
	Next,
	Page,
	PrevPlaceholder,
	NextPlaceholder,
}: any) {
	return (
		<div className="flex fixed bottom-0 left-0 p-4 w-screen justify-center">
			<div className="w-full max-w-screen-xl">
				{" "}
				<div className="flex gap-2 w-full">
					{Page !== 0 && (
						<button
							onClick={Prev}
							className="btn btn-primary text-base-100 border-2 border-primary-accent grow"
						>
							{PrevPlaceholder ? PrevPlaceholder : "Back"}
						</button>
					)}
					<button
						onClick={Next}
						type="submit"
						className="btn btn-primary text-base-100 border-2 border-primary-accent grow"
					>
						{NextPlaceholder ? NextPlaceholder : "Next"}
					</button>
				</div>
			</div>
		</div>
	);
}
