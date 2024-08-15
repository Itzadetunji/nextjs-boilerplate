import React from "react";
import {
	PiDesktopTowerDuotone,
	PiMonitorDuotone,
	PiTreeStructureDuotone,
	PiUserCirclePlusDuotone,
	PiUsersDuotone,
} from "react-icons/pi";

interface HowItWorksCardProps {
	step: number;
	title: string;
	icon: JSX.Element;
	desc: string;
}

const HowItWorksCard: React.FC<HowItWorksCardProps> = ({
	step,
	title,
	icon,
	desc,
}) => {
	return (
		<div
			className="z-10 flex max-w-fit flex-col space-y-4 self-stretch rounded-xl bg-[#F1F5FA] p-4 duration-200 ease-in-out hover:scale-105 sm:px-8 sm:py-6"
			style={{
				boxShadow:
					"0px 4px 6px -1px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.10)",
			}}
		>
			<div className="flex justify-between">
				<div className="flex flex-col space-y-2">
					<p className="w-[67px] rounded-full bg-white text-center font-medium text-[#060D25]">
						Step {step}
					</p>
					<h4 className="text-[22px] font-bold leading-[30px] tracking-[-1%] text-[#323539]">
						{title}
					</h4>
				</div>
				{icon}
			</div>
			<p className="max-w-[307px] tracking-[-1%] text-[#858C95]">
				{desc}
			</p>
		</div>
	);
};

export default HowItWorksCard;

export const HowItWorksData = [
	{
		title: "Create Account",
		icon: (
			<figure className="h-fit w-fit rounded-full border border-[#BCDAF8] bg-white p-1.5">
				<PiUserCirclePlusDuotone className="fill-[#195388]" size={32} />
			</figure>
		),
		desc: "Sign up and receive a unique URL for direct customer access. Streamline your entry into a world of efficient management and enhanced user experience.",
	},
	{
		title: "Configure Workflow",
		icon: (
			<figure className="h-fit w-fit rounded-full border border-[#BCDAF8] bg-white p-1.5">
				<PiTreeStructureDuotone className="fill-[#195388]" size={32} />
			</figure>
		),
		desc: "Tailor your workflows for maximum efficiency. Set up processes that fit your unique business needs, ensuring smooth and effective operations.",
	},
	{
		title: "Set-Up Workstations",
		icon: (
			<figure className="h-fit w-fit rounded-full border border-[#BCDAF8] bg-white p-1.5">
				<PiDesktopTowerDuotone className="fill-[#195388]" size={32} />
			</figure>
		),
		desc: "Optimize your workstations to align with your operating schedule. Enhance productivity and operational effectiveness with customized configurations.",
	},
	{
		title: "Manage Customers",
		icon: (
			<figure className="h-fit w-fit rounded-full border border-[#BCDAF8] bg-white p-1.5">
				<PiUsersDuotone className="fill-[#195388]" size={32} />
			</figure>
		),
		desc: "Efficiently manage customer interactions, schedules, and flow. Utilize tools for seamless communication and engagement, boosting satisfaction..",
	},
	{
		title: "Monitor Operations",
		icon: (
			<figure className="h-fit w-fit rounded-full border border-[#BCDAF8] bg-white p-1.5">
				<PiMonitorDuotone className="fill-[#195388]" size={32} />
			</figure>
		),
		desc: "Track your operations in real time with detailed analytics. Gain valuable insights for informed decision-making and strategic business improvements.",
	},
];
