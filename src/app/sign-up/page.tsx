"use client";

import Navbar from "@/components/Home/Navbar";
import { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
	const [showBookADemo, setShowBookDemo] = useState(false);
	const [showContactUsModal, setshowContactUsModal] = useState(false);
	return (
		<>
			<main className="relative flex flex-col md:h-screen">
				<Navbar
					isWhite
					showBookADemo={showBookADemo}
					setShowBookDemo={setShowBookDemo}
					setshowContactUsModal={setshowContactUsModal}
					showContactUsModal={showContactUsModal}
				/>
				<div className="clock-background-image flex h-full w-full items-center justify-center self-stretch px-4">
					<div className="relative flex w-full max-w-[1216px] items-center gap-12 mmd:flex-col-reverse mmd:py-12">
						{/* <SignUpCard /> */}
						<div className="z-10 flex flex-col space-y-3 md:space-y-6">
							<h1 className="text-2xl font-bold text-[#323539] md:text-[40px] md:font-semibold md:leading-[32px] md:tracking-[-1.5%]">
								Join Migranium Today
							</h1>
							<p className="tracking-[-1%] text-[#858C95] msm:text-lg">
								Create your account for streamlined scheduling,
								enhanced <br className="msm:hidden" />
								customer management and advanced analytics.
							</p>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default Home;
