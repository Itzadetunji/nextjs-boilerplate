import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
// import ContactUsModal from "../home/ContactUsModal/ContactUsModal";

const GetStarted: React.FC<{
	setShowBookDemo: Dispatch<SetStateAction<boolean>>;
}> = ({ setShowBookDemo }) => {
	const [showContactUsModal, setshowContactUsModal] = useState(false);
	const [, setRootElement] = useState<null | HTMLElement>(null);

	useEffect(() => {
		setRootElement(document.getElementById("root"));
	}, []);

	return (
		<>
			<section className="flex w-full items-center justify-center bg-white">
				<div className="relative flex w-full max-w-[1216px] items-center justify-between gap-9 px-4 py-[94px] mmd:flex-col">
					<img
						src="/assets/images/about-get-started.png"
						alt="Get started image"
					/>
					<div className="flex max-w-[742px] flex-1 flex-col gap-y-9">
						<div className="flex max-w-[622px] flex-col items-start gap-4">
							<h3 className="text-center text-[32px] font-bold leading-[40px] tracking-[-1.5%] text-[#323539] msm:hidden">
								Get{" "}
								<span className="text-green-100">Started</span>
							</h3>
							<h3 className="text-center text-[32px] font-bold leading-[40px] tracking-[-1.5%] text-[#323539] sm:hidden">
								Join <span className="text-green-100">Us</span>
							</h3>
							<p className="text-[18px] font-medium leading-[28px] text-[#858C95]">
								Discover how we can make a difference for you.
								Book a demo or contact us to learn more about
								our innovative approach. We&apos;re here to
								assist and answer any questions you might
								have.eq
							</p>
						</div>
						<div className="flex items-center space-x-4">
							<Button
								onClick={() => setShowBookDemo(true)}
								className="h-[46px] w-[133px] whitespace-nowrap bg-[#053969] text-base font-semibold text-white ease-in-out hover:text-[#72F4E8]"
								disabled={false}
							>
								Book A Demo
							</Button>
							<Button
								disabled={false}
								onClick={() => {
									setshowContactUsModal(true);
									alert("fw");
								}}
								className="h-[46px] w-[133px] border border-[#053969] bg-white text-base font-semibold text-[#323539] hover:border-[#3EC9BC] hover:text-[#3EC9BC]"
							>
								Contact Us
							</Button>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default GetStarted;
