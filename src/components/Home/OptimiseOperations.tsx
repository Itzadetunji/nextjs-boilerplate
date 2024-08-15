"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";

const OptimiseOperations: React.FC<{
	setShowBookDemo: Dispatch<SetStateAction<boolean>>;
	setshowContactUsModal: Dispatch<SetStateAction<boolean>>;
}> = ({ setshowContactUsModal, setShowBookDemo }) => {
	// const navigate = useNavigate();

	const [_, setRootElement] = useState<null | HTMLElement>(null);

	useEffect(() => {
		setRootElement(document.getElementById("root"));
	}, []);

	return (
		<>
			<section className="flex w-full items-center justify-center">
				<div className="flex w-full flex-col items-center space-y-4 px-4 pb-16 pt-10 sm:space-y-8 sm:py-20 md:pt-0">
					<div className="flex flex-col space-y-4">
						<h3 className="text-center text-[28px] font-bold leading-[36px] tracking-[-1.5%] text-[#323539] sm:text-[32px] sm:leading-[40px]">
							Ready To Optimize Your{" "}
							<span className="text-green-100">Operations?</span>
						</h3>
						<p className="text-center text-[#22517B]">
							Unlock growth and efficiency with Migranium. <br />
							Take the first step towards operational excellence -
							book a demo or contact us now.
						</p>
					</div>
					<div className="flex space-x-4">
						<Button
							onClick={() => setShowBookDemo(true)}
							className="h-[46px] w-[133px] whitespace-nowrap bg-[#053969] text-white ease-in-out hover:text-[#72F4E8]"
							disabled={false}
						>
							Book a Demo
						</Button>
						<Button
							disabled={false}
							onClick={() => {
								setshowContactUsModal(true);
							}}
							className="h-[46px] w-[133px] border border-[#043B6D] bg-white text-[#043B6D] hover:border-[#3EC9BC] hover:bg-white hover:text-[#3EC9BC]"
						>
							Contact Us
						</Button>
					</div>
				</div>
			</section>
		</>
	);
};

export default OptimiseOperations;
