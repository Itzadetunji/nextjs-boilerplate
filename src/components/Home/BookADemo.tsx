import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { InlineWidget } from "react-calendly";
import { IoClose } from "react-icons/io5";
import { Dialog, DialogContent } from "../ui/dialog";

const BookADemo: React.FC<{
	showBookADemo: boolean;
	setShowBookDemo: Dispatch<SetStateAction<boolean>>;
}> = ({ showBookADemo, setShowBookDemo }) => {
	const modalRef = useRef<any>(null);
	useEffect(() => {
		if (showBookADemo) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "visible";
		}

		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				setShowBookDemo(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showBookADemo]);
	return (
		<>
			<Dialog open={showBookADemo} onOpenChange={setShowBookDemo}>
				<DialogContent
					className="max-w-full border-none bg-transparent p-0 shadow-none sm:max-w-full"
					showCloseIcon={false}
				>
					<div className="relative flex h-full w-full flex-col items-center justify-center space-y-10">
						<div className="w-full self-stretch">
							<InlineWidget url="https://calendly.com/migranium/30min?hide_landing_page_details=1&back=1&month=2024-01" />
						</div>
						<button
							className="absolute right-[5%] top-0 cursor-pointer rounded-full p-2 duration-300 ease-in-out hover:bg-white hover:bg-opacity-40 mlg:hidden"
							onClick={() => setShowBookDemo(false)}
						>
							<IoClose className="fill-white" size={24} />
						</button>
						<button
							className="cursor-pointer rounded-full p-2 duration-300 ease-in-out hover:bg-white hover:bg-opacity-40 lg:hidden"
							onClick={() => setShowBookDemo(false)}
						>
							<IoClose className="fill-white" size={32} />
						</button>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default BookADemo;
