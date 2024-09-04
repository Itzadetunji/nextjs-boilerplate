"use client";

import CloseOnboardingProcess from "@/components/Onboarding/CloseOnboardingProcess";
import RequestIsLoading from "@/components/RequestIsLoading";
import {
	useGetBusinessInformation,
	useGetSubscriptionPlans,
} from "@/store/slices/onboarding";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useState } from "react";
import { IoClose } from "react-icons/io5";
import { RxChevronLeft } from "react-icons/rx";
import useUserStore from "../../store/useUserStore";
import RequireAuth from "@/hooks/useRequireAuth";
import { useGetBusinessCategories } from "@/store/slices/onboarding";
import { useQueryClient } from "@tanstack/react-query";

const OnboardingLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
	const pathname = usePathname();
	const queryClient = useQueryClient();

	const [showCloseOnboardingProcess, setShowCloseOnboardingProcess] =
		useState(false);
	const router = useRouter();
	const setOnboardingState = useUserStore((s) => s.setOnboardingState);

	const completed = () => {
		if (pathname.includes("/onboarding/add-payment-method")) return 3;
		if (pathname.includes("/onboarding/add-location")) return 2;
		return 1;
	};

	const whichBack = () => {
		let result: string = "";
		if (pathname.includes("/onboarding/add-payment-method")) {
			result = "/onboarding/add-location";
			setOnboardingState(1);
		} else if (pathname.includes("/onboarding/add-location")) {
			result = "/onboarding/about-business";
			setOnboardingState(0);
		}
		return result;
	};

	const getBusinessInfoQuery = useGetBusinessInformation(
		!pathname.includes("/onboarding/about-business")
	);
	const getSusbscriptionPlans = useGetSubscriptionPlans();

	const getBusinessCategories = useGetBusinessCategories();

	return (
		<>
			<RequireAuth />
			<main className="relative flex min-h-screen flex-col">
				<nav className="flex w-full justify-center bg-white">
					<div className="mx-4 flex w-full max-w-[1244px] items-center justify-between">
						<RxChevronLeft
							size={24}
							fill="#323539"
							className={`${
								pathname.includes("/onboarding/about-business")
									? "invisible"
									: "cursor-pointer"
							}`}
							onClick={() => {
								if (
									!pathname.includes(
										"/onboarding/about-business"
									)
								)
									router.push(whichBack());
							}}
						/>

						<div className="flex max-w-[656px] flex-1 justify-between pb-3 pt-2">
							<OnboardingItem
								isCompleted={
									completed() === 1
										? "in-progress"
										: completed() > 1
											? "yes"
											: "no"
								}
								title={"Add Business"}
							/>
							<OnboardingItem
								isCompleted={
									completed() === 2
										? "in-progress"
										: completed() > 2
											? "yes"
											: "no"
								}
								title={"Add Schedule"}
							/>
							<OnboardingItem
								isCompleted={
									completed() === 3 ? "in-progress" : "no"
								}
								title={"Add Payment"}
							/>
						</div>

						<IoClose
							size={24}
							fill="#323539"
							className="cursor-pointer"
							onClick={() => setShowCloseOnboardingProcess(true)}
						/>
					</div>
				</nav>
				<div className="clock-background-image flex h-full w-full flex-1 justify-center self-stretch px-4 pb-4 pt-[16px]">
					{children}
				</div>
			</main>
			<RequestIsLoading
				isWhite
				isLoading={
					getBusinessInfoQuery.isLoading ||
					getSusbscriptionPlans.isLoading ||
					getBusinessCategories.isLoading
				}
				size={24}
			/>
			<CloseOnboardingProcess
				show={showCloseOnboardingProcess}
				setShow={setShowCloseOnboardingProcess}
			/>
		</>
	);
};

const OnboardingItem: React.FC<{
	isCompleted: "yes" | "no" | "in-progress";
	title: string;
}> = ({ isCompleted, title }) => {
	return (
		<li
			className={`flex max-w-[220px] flex-1 items-center space-x-2 py-2.5 leading-[22px] ${
				isCompleted === "in-progress" || isCompleted === "yes"
					? "border-b-2 border-b-[#053969] font-semibold text-[#195388]"
					: "border-b-2 border-b-[#E5E5E7] font-medium text-[#858C95]"
			}`}
		>
			{/* <PiCheckCircleLight
				fill="#195388"
				className={`${isCompleted !== "in-progress" && "hidden"}`}
			/> */}
			{isCompleted === "in-progress" && (
				<i className="mgc_check_circle_line before:!text-[#195388]" />
			)}

			{/* <PiCheckCircleFill
				fill="#195388"
				className={`${isCompleted !== "yes" && "hidden"}`}
			/> */}
			{isCompleted === "yes" && (
				<i className="mgc_check_circle_fill before:!text-[#195388]" />
			)}
			<p>{title}</p>
		</li>
	);
};

export default OnboardingLayout;
