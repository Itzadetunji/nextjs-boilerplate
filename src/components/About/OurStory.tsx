import React from "react";

const OurStory: React.FC = () => {
	return (
		<section className="flex w-full items-center justify-center bg-[#043B6D]">
			<div className="relative flex w-full max-w-[1216px] items-center justify-between gap-9 px-4 py-10 lg:py-24 mlg:flex-col">
				<div className="flex max-w-[622px] flex-col items-start space-y-12 pl-[22px] pr-[11px] md:pl-[38px] md:pr-10">
					<div className="flex flex-col items-start space-y-4">
						<h3 className="text-center text-[32px] font-bold leading-[40px] tracking-[-1.5%] text-white">
							Our <span className="text-[#72F4E8]">Story</span>
						</h3>
						<div className="relative text-[20px] font-medium tracking-[-1%] text-[#E5E5E7]">
							<div className="absolute -left-4 h-full w-1.5 rounded-full bg-[#72F4E8] md:-left-8" />
							<p>
								Born from a moment of frustration in a
								clinic&apos;s waiting room, Migranium is on a
								mission to redefine operational efficiency and
								enhance customer experiences.
							</p>
						</div>
					</div>
					<p className="leading-[26px] tracking-[-1%] text-[#E5E5E7]">
						Migranium has continued to optimize operational
						efficiencies and simplify workflows through our
						innovative, technology-driven solutions for
						institutions. We&apos;ve significantly streamlined
						processes, resulting in over 30,000 + hours saved for
						our users to date.
					</p>
				</div>
				<img
					src="/assets/images/about-story.png"
					className="h-[367px] w-full max-w-[467px] rounded-[4px] rounded-br-[64px] rounded-tl-[64px] object-cover msm:px-6"
					alt="Our Story image"
				/>
			</div>
		</section>
	);
};

export default OurStory;
