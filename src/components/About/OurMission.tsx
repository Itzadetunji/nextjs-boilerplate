import React from "react";
import {
	PiThumbsUpDuotone,
	PiTreeStructureDuotone,
	PiTrendUpDuotone,
	PiUsersDuotone,
} from "react-icons/pi";

const OurMission: React.FC = () => {
	return (
		<section className="flex w-full items-center justify-center bg-white">
			<div className="relative flex w-full max-w-[1216px] flex-col items-center space-y-12 px-4 py-16 sm:py-20">
				<div className="flex w-full flex-col items-start gap-3 md:items-center mmd:px-[12.5px]">
					<h3 className="text-center text-[32px] font-bold leading-[40px] tracking-[-1.5%] text-[#323539]">
						Our <span className="text-green-100">Mission</span>
					</h3>
					<p className="md:hidden">
						We&apos;re happy to say that our team is what makes us
						strong and unite.
					</p>
				</div>
				<div className="flex w-full justify-between gap-8 md:items-center md:gap-3 mmd:flex-col">
					{OurMissionData.map((item, index) => (
						<OurMissionCard
							key={index}
							icon={item.icon}
							title={item.title}
							desc={item.desc}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default OurMission;

const OurMissionCard: React.FC<{
	icon: JSX.Element;
	title: string;
	desc: string;
}> = ({ icon, title, desc }) => {
	return (
		<div className="flex max-h-[214px] flex-1 gap-3 px-[17px] md:flex-col md:gap-4 md:px-0.5 md:py-6">
			<figure className="flex-shrink-0">{icon}</figure>
			<div className="flex flex-col gap-2 md:gap-4">
				<p className="text-[19px] font-bold leading-[30px] tracking-[-1%] text-[#323539]">
					{title}
				</p>
				<p className="tracking-[-1%] text-[#858C95] md:max-w-[248px]">
					{desc}
				</p>
			</div>
		</div>
	);
};

const OurMissionData = [
	{
		icon: <PiTreeStructureDuotone className="fill-[#48AA75]" size={32} />,
		title: "Streamline Processes",
		desc: "Empower efficiency, simplify workflows, optimize processes and boost productivity.",
	},
	{
		icon: <PiThumbsUpDuotone className="fill-[#48AA75]" size={32} />,
		title: "Improve work satisfaction",
		desc: "Increase  work satisfaction, reduce stress, and create a productive work environment.",
	},
	{
		icon: <PiTrendUpDuotone className="fill-[#48AA75]" size={32} />,
		title: "Increase Revenue",
		desc: "Amplify financial growth and unlock new revenue opportunities through enhanced efficiency.",
	},
	{
		icon: <PiUsersDuotone className="fill-[#48AA75]" size={32} />,
		title: "Enhance Customer Experience",
		desc: "Elevate client interactions, ensuring memorable and seamless experiences.",
	},
];
