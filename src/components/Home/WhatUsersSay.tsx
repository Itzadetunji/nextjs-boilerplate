import React from "react";

const WhatUsersSay: React.FC = () => {
	return (
		<section className="flex w-full items-center justify-center">
			<div className="flex w-full max-w-[1216px] flex-col items-center space-y-10 px-4 py-16 sm:py-20 md:space-y-[84px] md:py-36">
				<h3 className="ext-center text-[32px] font-bold leading-[40px] tracking-[-1.5%] text-[#323539]">
					What Our <span className="text-green-100"> Users Say</span>
				</h3>
				<div className="flex lg:space-x-12 mlg:flex-col mlg:space-y-12">
					<WhatUsersSayCard
						title={"The analytics are invaluable for planning"}
						desc={
							<p className="font-inter leading-[28px] tracking-[-1.5%] text-[#323539] text-opacity-80">
								As a doctor managing numerous patients,
								I&apos;ve finally found the solution in
								Migranium. It&apos;s streamlined our patient
								management and the{" "}
								<span className="font-bold">
									analytics are invaluable for resource
									planning
								</span>{" "}
								and enhancing care efficiency.
							</p>
						}
						personImg={"/assets/images/what-users-say/1.png"}
						name={"Majlessi K."}
						position={"Doctor"}
						locationImg={
							"/assets/images/what-users-say/northyork-medicals.png"
						}
					/>
					<WhatUsersSayCard
						title={"We now work more efficiently!"}
						desc={
							<p className="font-inter leading-[28px] tracking-[-1.5%] text-[#323539] text-opacity-80">
								Migranium has streamlined our busy clinic&apos;s
								workflow. With over 70 patients daily, reducing
								wait times was crucial. Now,{" "}
								<span className="font-bold">
									{" "}
									our patients are happier,
								</span>{" "}
								and{" "}
								<span className="font-bold">
									we can work more efficiently.
								</span>{" "}
								It&apos;s been a real game-changer!
							</p>
						}
						personImg={"/assets/images/what-users-say/2.png"}
						name={"Shirleyann J."}
						position={"Admin Staff"}
						locationImg={
							"/assets/images/what-users-say/northyork-medicals.png"
						}
					/>
					<WhatUsersSayCard
						title={"Significantly improved experience"}
						desc={
							<p className="font-inter leading-[28px] tracking-[-1.5%] text-[#323539] text-opacity-80">
								Migranium has{" "}
								<span className="font-bold">
									significantly improved my clinic visits
									experience.
								</span>{" "}
								Before, I faced long, uncertain waits; now, I
								can see exactly when it&apos;s my turn and can
								use{" "}
								<span className="font-bold">
									my time productively.
								</span>{" "}
								I&apos;m very happy with this!
							</p>
						}
						personImg={"/assets/images/what-users-say/3.png"}
						name={"Ghazela Amran"}
						position={"Patient"}
						locationImg={""}
					/>
				</div>
			</div>
		</section>
	);
};

interface WhatUsersSayCardProps {
	title: string;
	desc: JSX.Element;
	personImg: string;
	name: string;
	position: string;
	locationImg: string;
}

const WhatUsersSayCard: React.FC<WhatUsersSayCardProps> = ({
	title,
	desc,
	personImg,
	name,
	position,
	locationImg,
}) => {
	return (
		<div
			className="flex flex-col space-y-8 rounded-xl bg-[#F1F5FA] p-7 duration-200 ease-in-out hover:scale-105"
			style={{
				boxShadow:
					"0px 10px 15px -3px rgba(16, 24, 40, 0.10), 0px 4px 6px -4px rgba(16, 24, 40, 0.10)",
			}}
		>
			<div className="flex flex-1 flex-col space-y-4">
				<h3 className="font-inter text-2xl font-semibold text-[#053969] sm:text-[28px] sm:leading-[38px]">
					{title}
				</h3>
				<div className="max-h-[198px] flex-1 overflow-scroll">
					{desc}
				</div>
			</div>
			<div className="flex items-center justify-between">
				<figure className="flex items-center space-x-2.5">
					<img
						src={personImg}
						alt={name}
						className="h-10 w-10 rounded-full bg-white object-cover text-xs"
					/>
					<figcaption>
						<span className="block font-semibold text-[#323539] msm:text-[15px]">
							{name}
						</span>
						<span className="block font-medium text-[#858C95] msm:text-sm">
							{position}
						</span>
					</figcaption>
				</figure>
				{locationImg && (
					<img
						src={locationImg}
						alt={`${name} | ${position}`}
						className="text-xs"
					/>
				)}
			</div>
		</div>
	);
};

export default WhatUsersSay;
