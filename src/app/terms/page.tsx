"use client";

import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Footer";
import React, { useState } from "react";
import { PiArrowRightBold } from "react-icons/pi";

const prohibitedUses = [
	"Infringe upon the intellectual property rights of any person or entity",
	"Transmit any viruses, worms, or other malicious code",
	"Interfere with the normal operation of the Software or server on which it is hosted",
	"Interfere with the normal operation of the Software or server on which it is hosted",
];

const TermsOfUse: React.FC = () => {
	const [showBookADemo, setShowBookDemo] = useState(false);
	const [showContactUsModal, setshowContactUsModal] = useState(false);

	return (
		<main className="relative flex flex-col justify-between">
			<Navbar
				setShowBookDemo={setShowBookDemo}
				showBookADemo={showBookADemo}
				showContactUsModal={showContactUsModal}
				setshowContactUsModal={setshowContactUsModal}
			/>
			<div className="flex flex-1 flex-col items-center bg-white">
				<h1 className="w-full bg-[#F8F9FB] pb-[92px] pt-20 text-center text-[60px] font-bold leading-[60px] tracking-[-2%] text-[#323539]">
					Terms Of Use
				</h1>
				<section className="mx-5 flex max-w-[848px] flex-col space-y-12 py-12 leading-[24px] tracking-[-1%] text-[#858C95] msm:py-8">
					<p>
						Welcome to Migranium! By accessing or using our software
						product, you agree to be bound by the following terms
						and conditions (&quot;Terms of Use&quot;). Please read
						these Terms of Use carefully before using our product.
						If you do not agree to these Terms of Use, you may not
						access or use our product.
					</p>
					<div className="flex flex-col space-y-1">
						<p className="font-semibold text-[#323539]">
							License to Use:
						</p>
						<p className="font-normal">
							Subject to these Terms of Use, Company grants User a
							limited, non-exclusive, non-transferable license to
							access and use the Software for personal or business
							purposes. User may not sublicense, assign, or
							transfer this license without the prior written
							consent of Company.
						</p>
					</div>
					<div className="flex flex-col space-y-1">
						<p className="font-semibold text-[#323539]">
							Prohibited Uses:
						</p>
						<p className="font-normal">
							User agrees to use the Software only for lawful
							purposes and in accordance with these Terms of Use.
							User may not use the Software to:
						</p>
						<ul className="mt-4 flex flex-col space-y-4">
							{prohibitedUses.map((item, index) => (
								<li
									key={index}
									className="flex items-center space-x-4"
								>
									<PiArrowRightBold
										width={15.23}
										height={18}
										color="#043B6D"
										stroke="2"
										className="flex-shrink-0"
									/>
									<p>{item}</p>
								</li>
							))}
						</ul>
					</div>
					<div className="flex flex-col space-y-1">
						<p className="font-semibold text-[#323539]">
							Modification of Software:
						</p>
						<p className="font-normal">
							Company reserves the right to modify, update, or
							discontinue the Software at any time without notice
							to User.
						</p>
					</div>
					<div className="flex flex-col space-y-1">
						<p className="font-semibold text-[#323539]">
							Termination of Access:
						</p>
						<p className="font-normal">
							Company reserves the right to terminate or restrict
							User&apos;s access to the Software at any time and
							for any reason, including but not limited to
							violation of these Terms of Use.
						</p>
					</div>
					<div className="flex flex-col space-y-1">
						<p className="font-semibold text-[#323539]">
							Disclaimer of Warranties:
						</p>
						<p className="font-normal">
							The Software is provided &quot;as is&quot; and
							&quot;as available&quot; without warranty of any
							kind, either express or implied. Company does not
							warrant that the Software will meet User&apos;s
							requirements or that it will be uninterrupted or
							error-free.
						</p>
					</div>
					<div className="flex flex-col space-y-1">
						<p className="font-semibold text-[#323539]">
							Limitation of Liability:
						</p>
						<p className="font-normal">
							In no event shall Company be liable for any damages
							whatsoever, including but not limited to direct,
							indirect, incidental, consequential, or punitive
							damages, arising out of or in connection with
							User&apos;s use of or inability to use the Software.
						</p>
					</div>
					<div className="flex flex-col space-y-1">
						<p className="font-semibold text-[#323539]">
							Governing Law:
						</p>
						<p className="font-normal">
							These Terms of Use shall be governed by and
							construed in accordance with the federal laws of
							Canada
						</p>
					</div>
					<div className="flex flex-col space-y-1">
						<p className="font-semibold text-[#323539]">
							Entire Agreement:
						</p>
						<p className="font-normal">
							These Terms of Use constitute the entire agreement
							between User and Company and supersede all prior or
							contemporaneous communications and proposals,
							whether oral or written. If any provision of these
							Terms of Use is found to be invalid or
							unenforceable, that provision shall be enforced to
							the maximum extent possible, and the remaining
							provisions shall remain in full force and effect.
						</p>
					</div>
					<div className="flex flex-col space-y-1">
						<p className="font-semibold text-[#323539]">
							Acceptance of Terms of Use
						</p>
						<p className="font-normal">
							These Terms of Use apply to all visitors, users, and
							others who access or use the Migranium software
							product. By accessing or using the Migranium
							product, you agree to be bound by these Terms of
							Use. If you disagree with any part of the terms,
							then you may not access or use the Migranium
							product.
						</p>
					</div>
					<div className="flex flex-col space-y-1">
						<p className="font-semibold text-[#323539]">
							Use of the Migranium Product.
						</p>
						<p className="font-normal">
							The Migranium product is intended for individuals
							and businesses to schedule appointments and manage
							customer queues. You may use the Migranium product
							for personal or commercial use, as long as you do
							not engage in any unauthorized or unlawful
							activities, including but not limited to hacking,
							spamming, or infringing on the intellectual property
							rights of others.
						</p>
					</div>
					<div className="flex flex-col space-y-1">
						<p className="font-semibold text-[#323539]">
							Account Registration.
						</p>
						<p className="font-normal">
							In order to access certain features of the Migranium
							product, you may be required to create an account.
							When creating an account, you must provide accurate
							and complete information. You are responsible for
							maintaining the confidentiality of your account
							login information and for all activities that occur
							under your account.
						</p>
					</div>
					<div className="flex flex-col space-y-1">
						<p className="font-semibold text-[#323539]">
							Changes to These Terms of Use:
						</p>
						<p className="font-normal">
							Company reserves the right to modify these Terms of
							Use at any time. Any modifications will be effective
							upon posting of the revised Terms of Use on the
							Software. User&apos;s continued use of the Software
							after the posting of any modifications will
							constitute acceptance of those modifications
						</p>
					</div>
				</section>
			</div>
			<Footer />
		</main>
	);
};

export default TermsOfUse;
