"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Home/Navbar";
import React, { useState } from "react";
import { PiArrowRightBold } from "react-icons/pi";

const howWeUseYourInformation = [
	"Providing customer support and responding to your requests and inquiries.",
	"Analyzing usage and trends to improve Migranium and personalize your experience.",
	"Communicating with you about Migranium, including updates and promotions.",
	"Enforcing our terms of service and preventing misuse of Migranium.",
];

const PrivacyPolicy: React.FC = () => {
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
				<h1 className="mx-4 w-full bg-[#F8F9FB] pb-[96px] pt-[74px] text-center text-[36px] font-bold leading-[44px] tracking-[-2%] text-[#323539] sm:pb-[94px] sm:pt-20 sm:text-[52px] sm:leading-[60px]">
					Privacy Policy
				</h1>
				<section className="mx-4 grid max-w-[1216px] grid-cols-1 gap-y-12 py-12 leading-[24px] tracking-[-1%] text-[#858C95] msm:py-8">
					<div className="flex flex-col sm:grid sm:grid-cols-[minmax(10px,328px)_auto] msm:space-y-2.5">
						<p className="justify-self-start text-[22px] font-medium leading-[30px] tracking-[-1%] text-[#323539]">
							Main Terms
						</p>
						<div className="flex flex-col space-y-8">
							<p>
								At Migranium, we are committed to protecting the
								privacy of our users. This Privacy Policy
								explains how we collect, use, and share
								information about you when you use our website
								and software products, including Migranium.
							</p>

							<p>
								By using Migranium, you agree to the collection,
								use, and sharing of your information as
								described in this Privacy Policy. If you do not
								agree with our policies and practices, do not
								use Migranium.
							</p>
						</div>
					</div>
					<div className="flex flex-col sm:grid sm:grid-cols-[minmax(10px,328px)_auto] msm:space-y-2.5">
						<p className="justify-self-start text-[22px] font-medium leading-[30px] tracking-[-1%] text-[#323539]">
							Information We Collect
						</p>
						<div className="flex flex-col space-y-4">
							<h3 className="text-xl font-semibold tracking-[-1%] text-[#323539]">
								We collect information about you in the
								following ways:
							</h3>
							<div>
								<h4 className="font-semibold leading-[24px] tracking-[-1%] text-[#323539]">
									Information you provide to us:
								</h4>
								<p>
									We may collect information about you when
									you create an account, update your profile,
									or use the features of Migranium. This may
									include your name, email address, phone
									number, and other personal or contact
									information.
								</p>
							</div>
							<div>
								<h4 className="font-semibold leading-[24px] tracking-[-1%] text-[#323539]">
									Information we collect automatically:
								</h4>
								<p>
									When you use Migranium, we may collect
									certain information automatically, such as
									your IP address, browser type, operating
									system, and the pages you visit. We may also
									collect information about your device, such
									as the device&apos;s model and manufacturer.
								</p>
							</div>
							<div>
								<h4 className="font-semibold leading-[24px] tracking-[-1%] text-[#323539]">
									Information from third parties:
								</h4>
								<p>
									We may receive information about you from
									third parties, such as social media
									platforms or other websites that you have
									linked to your Migranium account.
								</p>
							</div>
						</div>
					</div>
					<div className="flex flex-col sm:grid sm:grid-cols-[minmax(10px,328px)_auto] msm:space-y-2.5">
						<p className="justify-self-start text-[22px] font-medium leading-[30px] tracking-[-1%] text-[#323539]">
							How We Use Your Information
						</p>
						<div className="flex flex-col space-y-4">
							<p className="text-[#323539]">
								We use the information we collect about you to
								provide, maintain, and improve Migranium, and to
								develop new products and services. This may
								include:
							</p>
							<ul className="flex flex-col space-y-4">
								{howWeUseYourInformation.map((item, index) => (
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
					</div>
					<div className="flex flex-col sm:grid sm:grid-cols-[minmax(10px,328px)_auto] msm:space-y-2.5">
						<p className="justify-self-start text-[22px] font-medium leading-[30px] tracking-[-1%] text-[#323539]">
							Sharing Your Information
						</p>
						<div className="flex max-w-[602px] flex-col space-y-12">
							<div className="flex flex-col space-y-4">
								<h3 className="text-xl font-semibold tracking-[-1%] text-[#323539]">
									We may share your information with third
									parties in the following situations:
								</h3>
								<div>
									<h4 className="font-semibold leading-[24px] tracking-[-1%] text-[#323539]">
										With service providers:
									</h4>
									<p>
										We may share your information with
										third-party service providers who
										perform services on our behalf, such as
										hosting, data analysis, payment
										processing, and customer support.
									</p>
								</div>
								<div>
									<h4 className="font-semibold leading-[24px] tracking-[-1%] text-[#323539]">
										In response to legal requests:
									</h4>
									<p>
										We may disclose your information in
										response to a subpoena, court order, or
										other legal request.
									</p>
								</div>
								<div>
									<h4 className="font-semibold leading-[24px] tracking-[-1%] text-[#323539]">
										To protect the rights, property, or
										safety of Migranium, our users, or the
										public.
									</h4>
									<p>
										We may share your information with third
										parties when you have given us your
										consent to do so.
									</p>
								</div>
							</div>
							<div className="flex flex-col space-y-4">
								<h3 className="text-xl font-semibold tracking-[-1%] text-[#323539]">
									Users have the following options with
									respect to their information:
								</h3>
								<div>
									<h4 className="font-semibold leading-[24px] tracking-[-1%] text-[#323539]">
										Opting Out of Communications:
									</h4>
									<p>
										Users can opt out of receiving marketing
										communications from us by following the
										unsubscribe instructions included in
										such communications or by contacting us
										directly.
									</p>
								</div>
								<div>
									<h4 className="font-semibold leading-[24px] tracking-[-1%] text-[#323539]">
										Accessing and Updating Personal
										Information:
									</h4>
									<p>
										Users can access and update their
										personal information by logging into
										their account and updating their
										profile.
									</p>
								</div>
								<div>
									<h4 className="font-semibold leading-[24px] tracking-[-1%] text-[#323539]">
										Deactivating or Deleting an Account:
									</h4>
									<p>
										Users can deactivate their account by
										contacting us directly. If a user
										requests that we delete their account,
										we will delete their personal
										information from our systems, subject to
										any legal obligations that require us to
										retain such information.
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col sm:grid sm:grid-cols-[minmax(10px,328px)_auto] msm:space-y-4">
						<p className="justify-self-start text-[22px] font-medium leading-[30px] tracking-[-1%] text-[#323539]">
							Data Retention
						</p>
						<p className="max-w-[602px]">
							We will retain your information for as long as your
							account is active or as needed to provide you with
							Migranium. If you choose to close your account, we
							will delete your information in accordance with our
							data retention policies.
						</p>
					</div>
					<div className="flex flex-col sm:grid sm:grid-cols-[minmax(10px,328px)_auto] msm:space-y-4">
						<p className="justify-self-start text-[22px] font-medium leading-[30px] tracking-[-1%] text-[#323539]">
							Security
						</p>
						<p className="max-w-[602px]">
							We take reasonable measures to protect your
							information from unauthorized access, use, or
							disclosure. However, no website or internet
							transmission is completely secure, and we cannot
							guarantee the security of your information.
						</p>
					</div>
					<div className="flex flex-col sm:grid sm:grid-cols-[minmax(10px,328px)_auto] msm:space-y-4">
						<p className="justify-self-start text-[22px] font-medium leading-[30px] tracking-[-1%] text-[#323539]">
							Children&apos;s Privacy
						</p>
						<p className="max-w-[602px]">
							Migranium is not intended for children under the age
							of 13. We do not knowingly collect personal
							information from children under 13. If we become
							aware that a child under 13 has provided us with
							personal information, we will delete such
							information in accordance with applicable law.
						</p>
					</div>
					<div className="flex flex-col sm:grid sm:grid-cols-[minmax(10px,328px)_auto] msm:space-y-4">
						<p className="justify-self-start text-[22px] font-medium leading-[30px] tracking-[-1%] text-[#323539]">
							Changes to this Privacy Policy
						</p>
						<p className="max-w-[602px]">
							We may update this Privacy Policy from time to time.
							We will notify you of any changes by posting the
							revised Privacy Policy on this page. You are advised
							to review this Privacy Policy periodically for any
							changes.
						</p>
					</div>
					<div className="flex flex-col sm:grid sm:grid-cols-[minmax(10px,328px)_auto] msm:space-y-4">
						<p className="justify-self-start text-[22px] font-medium leading-[30px] tracking-[-1%] text-[#323539]">
							Contact Us
						</p>
						<p className="max-w-[602px]">
							If you have any questions or concerns about this
							Privacy Policy, please contact us at
							[hello@migranium.com].
						</p>
					</div>
				</section>
			</div>
			<Footer />
		</main>
	);
};

export default PrivacyPolicy;
