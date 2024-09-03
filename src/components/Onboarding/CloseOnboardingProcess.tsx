"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { LuX } from "react-icons/lu";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";

const CloseOnboardingProcess: React.FC<{
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ show, setShow }) => {
	const router = useRouter();

	return (
		<Dialog open={show} onOpenChange={setShow}>
			<DialogContent className="max-w-[397px]">
				<div className="flex flex-col justify-between space-y-8">
					<DialogTitle className="flex justify-between">
						<h1 className="text-left text-[22px] font-semibold leading-[30px] -tracking-[1%] text-main-1">
							Are you sure you want to exit?
						</h1>
						<LuX
							color="#858C95"
							size={20}
							className="cursor-pointer self-center"
							onClick={() => {
								setShow(false);
							}}
						/>
					</DialogTitle>
					<p className="text-base -tracking-[0.1px] text-[#323539]">
						Once you exit, your onboarding information might be
						lost. Continue to next steps to save your progress.
					</p>
					<DialogFooter className="mt-6 flex w-full space-x-1 self-end">
						<Button
							variant="ghost"
							className="max-w-[130px] flex-1 py-3 text-[15px] font-semibold leading-[22px]"
							onClick={(e) => {
								e.preventDefault();
								router.push("/sign-in");
							}}
						>
							Yes
						</Button>
						<Button
							className="max-w-[130px] flex-1 py-3 text-[15px] font-semibold leading-[22px] text-white"
							onClick={(e) => {
								e.preventDefault();
								setShow(false);
							}}
						>
							Cancel
						</Button>
					</DialogFooter>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default CloseOnboardingProcess;
