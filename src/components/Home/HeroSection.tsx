import { AnimatePresence, motion } from "framer-motion";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const HeroSection: React.FC<{
	setShowBookDemo: Dispatch<SetStateAction<boolean>>;
}> = ({ setShowBookDemo }) => {
	const [currentTextIndex, setCurrentTextIndex] = useState(0);
	const [_, setRootElement] = useState<null | HTMLElement>(null);

	useEffect(() => {
		setRootElement(document.getElementById("root"));
		const interval = setInterval(() => {
			setCurrentTextIndex((prevIndex) =>
				prevIndex === texts.length - 1 ? 0 : prevIndex + 1
			);
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<section
				className="flex w-full items-center justify-center bg-[#043B6D]"
				id="hero"
			>
				<div className="flex w-full max-w-[1440px] flex-row items-center justify-between py-24 sm:py-32 md:pb-[140px] md:pt-[120px] lg:max-h-[900px] lg:space-x-10 mlg:flex-col mlg:space-y-14">
					<div className="flex flex-col space-y-11 px-4 lg:pl-[112px] mxs:px-8">
						<div className="flex max-w-[717px] flex-col space-y-9">
							<div className="font-bold leading-[60px] tracking-[-0.96px]">
								<h1 className="text-[28px] leading-[1.1] text-white sm:!text-[42px] xl:whitespace-nowrap xs:text-[32px]">
									Optimizing Operational Efficiency{" "}
									<br className="mxl:hidden" /> for{" "}
									<AnimatePresence mode="wait">
										<motion.span
											key={texts[currentTextIndex]}
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											transition={{
												duration: 0.8,
												delay: 0,
											}}
											className="text-[#72F4E8]"
										>
											{texts[currentTextIndex]}
										</motion.span>
									</AnimatePresence>
								</h1>
							</div>
							<p className="flex w-fit items-center justify-center rounded-lg bg-[#D6E7F6] bg-opacity-5 p-1 font-inter leading-[26px] tracking-[0px] text-[#B8D5F0] sm:text-[17.5px] xl:whitespace-nowrap mxs:text-xs">
								The all-in-one solution for Intelligent
								Scheduling, Intuitive Customer Flow{" "}
								<br className="mxl:hidden" /> Management,
								Adaptable Configuration, Streamlined Processes
								and Analytics.
							</p>
						</div>
						<div className="flex space-x-2.5 mlg:hidden">
							<Button
								onClick={() => setShowBookDemo(true)}
								className="h-10 w-[133px] rounded-[6px] bg-white text-base font-semibold text-[#043B6D] hover:border-[#34D3C4] hover:bg-[#34D3C4] hover:text-[#053969]"
								disabled={false}
							>
								Book A Demo
							</Button>
							<Link href="/sign-up">
								<Button className="h-10 w-[133px] rounded-[6px] border border-[#E5E5E7] bg-[#043B6D] text-base font-semibold text-white hover:border-[#34D3C4] hover:text-[#34D3C4]">
									Sign Up
								</Button>
							</Link>
						</div>
					</div>
					<figure className="flex flex-col items-center mlg:space-y-[74px]">
						<img
							src="/assets/images/hero-section.svg"
							alt="Hero section img"
							className="px-4"
						/>

						<figcaption className="flex space-x-2.5 lg:hidden">
							<Button
								onClick={() =>
									window.open(
										"https://calendly.com/migranium?primary_color=043b6d"
									)
								}
								className="h-12 w-[138px] rounded-[6px] bg-white text-base font-semibold text-[#043B6D] hover:border-[#34D3C4] hover:bg-[#34D3C4] hover:text-[#053969]"
								disabled={false}
							>
								Book A Demo
							</Button>
							<Link href="/sign-up">
								<Button className="h-12 w-[138px] rounded-[6px] border border-[#E5E5E7] bg-[#043B6D] text-base font-semibold text-white hover:border-[#34D3C4] hover:text-[#34D3C4]">
									Sign Up
								</Button>
							</Link>
						</figcaption>
					</figure>
				</div>
			</section>
			<p className="fixed left-[2000px] cursor-default select-none text-transparent">
				Title: Enhance Operational Efficiency with Migranium: Premier
				Solution for Healthcare and Business Sectors Meta Description:
				Maximize efficiency with Migranium&apos;s all-in-one scheduling
				and process management software, tailored for clinics,
				hospitals, and businesses. Adapt to the future with smart
				solutions. H1: Migranium - Redefining Operational Excellence for
				Healthcare and Business Operations Introduction: In the
				competitive realms of healthcare and business, operational
				efficiency isn&apos;t just a goal—it&apos;s a necessity.
				Migranium is at the forefront of this transformation, offering a
				suite of intelligent tools designed to streamline processes,
				improve customer management, and unlock actionable insights.
				Embrace the power of efficiency with Migranium&apos;s
				sophisticated, all-encompassing operational solutions. H2:
				Unparalleled Operational Insights for Strategic Growth Gain a
				competitive edge with Migranium&apos;s Operational Insights. Our
				advanced analytics dive deep into your data, providing clarity
				on performance metrics and revealing opportunities for growth.
				With Migranium, you harness the power of information to make
				strategic decisions that propel your organization forward. H2:
				Adaptive Process Configuration for Dynamic Environments
				Migranium&apos;s Process Configuration adapts to the pulse of
				your operations. Whether you&apos;re managing a bustling clinic
				or a growing business, our software offers customizable
				workflows that evolve with your needs. Ensure your operations
				are responsive and resilient, no matter the challenge. H2:
				Remote Monitoring for Real-Time Operational Control Stay
				connected to every facet of your operations with
				Migranium&apos;s Remote Monitoring. Oversee and manage your
				workflows from anywhere, ensuring continuity and efficiency. Our
				real-time monitoring capabilities mean you&apos;re always in
				command, with the power to respond proactively to any situation.
				H2: Streamlined Customer Management for Peak Satisfaction
				Elevate the customer experience with Migranium&apos;s Customer
				Management system. By optimizing scheduling and customer flow,
				we help you deliver service that&apos;s not just efficient, but
				memorable. Happy customers lead to a thriving business, and with
				Migranium, satisfaction is always part of the equation. H3:
				Choose Migranium for: Data-Driven Decision Making: Empower your
				strategy with comprehensive analytics. Customizable Workflows:
				Tailor your processes to fit your unique operational needs.
				Real-Time Monitoring: Stay ahead with 24/7 oversight of your
				business operations. Enhanced Customer Experience: Deliver
				exceptional service that drives repeat business. Conclusion:
				Migranium isn&apos;t just a tool—it&apos;s a strategic ally in
				your quest for operational mastery. Our commitment to
				innovation, efficiency, and customer satisfaction makes us the
				ideal partner for any clinic, hospital, or business ready to
				scale new heights. Step into the future with Migranium, where
				superior operations are the standard. Call to Action: Ready to
				revolutionize your operations? Contact us now to schedule a demo
				and see how Migranium can elevate your efficiency and customer
				service to the next level.
			</p>
		</>
	);
};

const texts = ["Hospitals", "Pharmacies", "Clinics"];

export default HeroSection;
