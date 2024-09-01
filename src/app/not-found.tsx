"use client";

import ContactUsModal from "@/components/ContactUsModal";
import Navbar from "@/components/Home/Navbar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
// import "../styles/sign-in.css";

const NotFound: React.FC = () => {
	const [showContactUsModal, setshowContactUsModal] = useState(false);
	const [showBookADemo, setShowBookDemo] = useState(false);
	const router = useRouter();
	return (
		<>
			<main className="relative flex h-[100dvh] flex-col">
				<Navbar
					isWhite
					showBookADemo={showBookADemo}
					setShowBookDemo={setShowBookDemo}
					showContactUsModal={showContactUsModal}
					setshowContactUsModal={setshowContactUsModal}
				/>
				<div className="clock-background-image flex h-full w-full flex-col items-center justify-center space-y-12 self-stretch px-4">
					<div className="flex flex-col space-y-4 text-center">
						<h1 className="text-[64px] font-semibold leading-[68px] tracking-[-2%] text-[#323539]">
							404
						</h1>
						<p className="text-xl tracking-[-1%] text-[#858C95]">
							Sorry, the requested content is either removed or
							doesn&apos;t exist
						</p>
					</div>
					<div className="flex items-center space-x-4">
						<Button
							onClick={() => router.push("/")}
							className="h-10 max-h-fit max-w-fit whitespace-nowrap bg-[#053969] px-4 py-2.5 text-sm text-white"
							type="button"
						>
							Go Back
						</Button>
						<Button
							onClick={() => setshowContactUsModal(true)}
							disabled={false}
							variant="outline"
							className="h-10 max-h-fit max-w-fit px-4 py-2.5"
						>
							Contact Us
						</Button>
					</div>
				</div>
			</main>
			<ContactUsModal
				show={showContactUsModal}
				setShow={setshowContactUsModal}
			/>
		</>
	);
};

export default NotFound;
