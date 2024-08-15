"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Home/Navbar";
import { NextPage } from "next";
import React, { useState } from "react";

const PaymentTerms: NextPage = () => {
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
					Payment Terms
				</h1>
				<section className="mx-5 flex max-w-[1107px] flex-col space-y-12 py-12 leading-[24px] tracking-[-1%] text-[#858C95] msm:py-8">
					<div className="flex flex-col space-y-1">
						<p className="text-[22px] font-semibold text-[#323539]">
							Subscription Plans
						</p>
						<p className="font-normal">
							Migranium offers several subscription plans, each
							with its own set of services and corresponding
							prices. Details of the available plans and their
							pricing will be provided on our platform or as
							communicated to users. The chosen subscription will
							determine the services accessible by the user.
						</p>
					</div>
					<div className="flex flex-col space-y-1">
						<p className="text-[22px] font-semibold leading-[30px] text-[#323539]">
							Custom Rates
						</p>
						<p className="font-normal">
							Some users may be provided with custom rates based
							on negotiated agreements or special promotions.
							These rates will be communicated directly to the
							user and may differ from standard subscription
							pricing.
						</p>
					</div>
					<div className="flex flex-col space-y-5">
						<div className="flex flex-col space-y-1">
							<p className="text-[22px] font-semibold leading-[30px] text-[#323539]">
								Payment Methods
							</p>
							<p className="font-normal">
								Migranium accepts payments through the following
								methods:
							</p>
						</div>
						<ul className="flex flex-col space-y-4">
							<li className="flex flex-col space-y-1">
								<p className="font-semibold text-[#323539]">
									Credit/Debit Cards
								</p>
								<p>
									We support major credit and debit cards.
									Users should ensure their card details are
									up-to-date to avoid any service
									interruption. All card transactions are
									securely processed.
								</p>
							</li>
							<li className="flex flex-col space-y-1">
								<p className="font-semibold text-[#323539]">
									Stripe
								</p>
								<p>
									Users can also make payments through Stripe,
									a renowned and secure payment gateway. If
									you choose to pay via Stripe, you will be
									directed to the Stripe platform to complete
									the payment. Ensure you follow the on-screen
									instructions and provide the necessary
									information for a successful transaction.
								</p>
							</li>
							<li className="font-semibold text-[#323539]">
								Users are responsible for ensuring that their
								selected payment method remains valid and has
								sufficient funds to cover the subscription
								costs.
							</li>
						</ul>
					</div>
					<div className="flex flex-col space-y-1">
						<p className="text-[22px] font-semibold leading-[30px] text-[#323539]">
							Billing Cycle
						</p>
						<p className="font-normal">
							Subscriptions will be billed on a recurring basis,
							which may be monthly, annually, or another
							agreed-upon cycle. The specific billing date will be
							communicated to the user upon subscription
							activation.
						</p>
					</div>
					<div className="flex flex-col space-y-1">
						<p className="text-[22px] font-semibold leading-[30px] text-[#323539]">
							Taxes
						</p>
						<p className="font-normal">
							All prices are exclusive of taxes unless otherwise
							stated. Users are responsible for any applicable
							state, local, or other governmental taxes or fees
							associated with their subscription.
						</p>
					</div>
					<div className="flex flex-col space-y-1">
						<p className="text-[22px] font-semibold leading-[30px] text-[#323539]">
							Refunds and Cancellations
						</p>
						<p className="font-normal">
							Users can cancel their subscription at any time
							through their account settings. Upon cancellation,
							the user will not be billed for the subsequent
							billing cycle. However, no refunds will be given for
							partially used periods or for previous payments.
						</p>
					</div>
					<div className="flex flex-col space-y-1">
						<p className="text-[22px] font-semibold leading-[30px] text-[#323539]">
							Failed or Late Payments
						</p>
						<p className="font-normal">
							If a payment fails or is declined, we may suspend or
							terminate the user&apos;s access to the Migranium
							product. Users may incur additional fees or interest
							for late payments.
						</p>
					</div>
					<div className="flex flex-col space-y-1">
						<p className="text-[22px] font-semibold leading-[30px] text-[#323539]">
							Governing Law
						</p>
						<p className="font-normal">
							These Terms of Use shall be governed by and
							construed in accordance with the federal laws of
							Canada
						</p>
					</div>
					<div className="flex flex-col space-y-1">
						<p className="text-[22px] font-semibold leading-[30px] text-[#323539]">
							Price Changes
						</p>
						<p className="font-normal">
							The Company reserves the right to modify
							subscription prices. Existing subscribers will be
							informed of any price changes at least 30 days
							before they take effect. Continued use of the
							Migranium product after the price change becomes
							effective constitutes the user&apos;s agreement to
							pay the adjusted amount.
						</p>
					</div>
					<div className="flex flex-col space-y-1">
						<p className="text-[22px] font-semibold leading-[30px] text-[#323539]">
							Disputes
						</p>
						<p className="font-normal">
							Any billing or payment disputes should be reported
							to the Company within 30 days of the transaction in
							question. Users agree to work with the Company in
							good faith to resolve any disputes.
						</p>
					</div>
				</section>
			</div>
			<Footer />
		</main>
	);
};

export default PaymentTerms;
