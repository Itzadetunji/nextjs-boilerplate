"use client";

import React from "react";
import {
	PiEqualizer,
	PiMonitorDuotone,
	PiTreeStructureDuotone,
	PiUsersDuotone,
} from "react-icons/pi";
import CoreFeatureCard from "./CoreFeaturesCard";

const CoreFeatures: React.FC = () => {
	return (
		<section
			className="flex w-full items-center justify-center"
			id="features"
		>
			<div className="flex w-full max-w-[1216px] flex-col space-y-8 px-4 py-20 sm:pb-40 md:space-y-[84px]">
				<h3 className="text-center text-[32px] font-bold leading-[40px] tracking-[-1.5%] text-[#323539]">
					Core <span className="text-green-100">Features</span>
				</h3>
				<div className="flex w-full items-center justify-between space-y-8 lg:space-x-14 lg:space-y-0 mlg:flex-col">
					<figure className="relative my-[53px] ml-8 mr-[52px] h-fit w-fit bg-transparent lg:max-w-[50%]">
						<img
							src="/assets/images/core-features.gif"
							alt=""
							className="rounded-lg sm:max-h-[293px]"
							style={{
								boxShadow:
									"0px 3px 35.1px 0px rgba(0, 0, 0, 0.10)",
							}}
						/>
						<figcaption className="absolute bottom-[-18px] left-[-10px] flex h-[36px] w-[150px] items-center justify-center space-x-2.5 rounded-full bg-[#053969]">
							{/* <img src="/images/core-features-powered-by.svg" alt="" /> */}
							<svg
								viewBox="0 0 24 25"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="h-4 w-4 sm:h-5 sm:w-5"
							>
								<path
									d="M10.0698 2.37545C11.2403 1.60165 12.7597 1.60165 13.9302 2.37545L17.5954 4.79855L21.0326 7.53562C22.1302 8.40968 22.5997 9.85477 22.2255 11.2071L21.0536 15.4417L19.5126 19.5564C19.0205 20.8704 17.7913 21.7635 16.3895 21.8255L12 22.0195L7.6105 21.8255C6.20874 21.7635 4.97948 20.8704 4.48738 19.5564L2.94641 15.4417L1.77452 11.2071C1.40028 9.85476 1.86982 8.40968 2.96744 7.53562L6.40457 4.79855L10.0698 2.37545Z"
									fill="#46FF9B"
									stroke="#46FF9B"
								/>
								<path
									d="M13.9385 17.1165H12.84L11.9741 14.7903H7.50276L6.63691 17.1165H5.53845L8.96307 8.07031H10.5138L13.9385 17.1165ZM9.60922 9.16877L7.86461 13.8211H11.6123L9.86768 9.16877H9.60922Z"
									fill="#053969"
								/>
								<path
									d="M16.0112 17.1165H14.9773V8.07031H16.0112V17.1165Z"
									fill="#053969"
								/>
							</svg>
							<p className="font-inter text-sm text-[#DEEBF7]">
								Powered by AI
							</p>
						</figcaption>
					</figure>
					<div className="grid grid-cols-2 lg:max-w-[50%] xl:gap-12 mlg:grid-cols-1 mlg:gap-4">
						{CoreFeatureCards.map((item, i) => (
							<CoreFeatureCard
								key={i}
								icon={item.icon}
								title={item.title}
							>
								{item.children}
							</CoreFeatureCard>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

const CoreFeatureCards = [
	{
		icon: (
			<PiEqualizer className="flex-shrink-0 fill-[#48AA75]" size={32} />
		),
		title: "Operational Insights",
		children:
			"Comprehensive analytics for strategic insights and decision-making for new opportunities.",
	},
	{
		icon: (
			<PiTreeStructureDuotone
				className="flex-shrink-0 fill-[#48AA75]"
				size={32}
			/>
		),
		title: "Process Configuration",
		children:
			"Easily set up workflows and workstations and adapt to your streamlined operations.",
	},
	{
		icon: (
			<PiMonitorDuotone
				className="flex-shrink-0 fill-[#48AA75]"
				size={32}
			/>
		),
		title: "Remote Monitoring",
		children:
			"Monitor operations remotely in real-time, ensuring seamless response and management.",
	},
	{
		icon: (
			<PiUsersDuotone
				className="flex-shrink-0 fill-[#48AA75]"
				size={32}
			/>
		),
		title: "Customer Management",
		children:
			"Optimize customer flow / scheduling to enhance experiences and for better service efficiency.",
	},
];

export default CoreFeatures;
