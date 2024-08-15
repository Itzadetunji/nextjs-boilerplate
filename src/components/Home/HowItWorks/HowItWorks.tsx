"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../../ui/button";
import HowItWorksCard, { HowItWorksData } from "./HowItWorksCard";

const HowItWorks: React.FC<{
	setShowBookDemo: Dispatch<SetStateAction<boolean>>;
}> = ({ setShowBookDemo }) => {
	const [_, setRootElement] = useState<null | HTMLElement>(null);
	useEffect(() => {
		setRootElement(document.getElementById("root"));
	}, []);

	return (
		<section
			className="flex w-full items-center justify-center"
			id="how-it-works"
		>
			<div className="relative flex w-full max-w-[1216px] flex-col items-center space-y-10 px-4 py-16 sm:py-20 md:space-y-[84px] md:py-36">
				<h3 className="ext-center text-[32px] font-bold leading-[40px] tracking-[-1.5%] text-[#323539]">
					How it <span className="text-green-100"> Works</span>
				</h3>
				<div className="relative w-full">
					<div className="flex w-full max-w-[1161px] flex-col space-y-6">
						<div className="grid grid-cols-1 justify-items-center gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
							{HowItWorksData.map((data, index) => (
								<HowItWorksCard
									step={index + 1}
									title={data.title}
									icon={data.icon}
									desc={data.desc}
									key={index}
								/>
							))}
							<div className="flex min-w-[371px] max-w-[371px] flex-1 flex-col items-center justify-center space-y-2 text-center text-[#858C95] mlg:h-[210px]">
								<Button
									variant="default"
									onClick={() => setShowBookDemo(true)}
									className="z-10 h-[46px] w-fit scale-100 bg-[#053969] font-bold text-white duration-300 ease-in-out hover:bg-[#053969] hover:text-[#72F4E8]"
									disabled={false}
								>
									Book A Demo
								</Button>
								Get started now!
							</div>
						</div>
					</div>
					<img
						src="/assets/icons/how-it-works.svg"
						className="absolute -left-5 bottom-2 z-[0] w-full mlg:hidden"
						alt=""
					/>
				</div>
			</div>
		</section>
	);
};

export default HowItWorks;
