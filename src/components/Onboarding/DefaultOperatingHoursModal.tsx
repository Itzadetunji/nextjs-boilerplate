import { OperatingHour } from "@/types/onboarding";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";
import { LuX } from "react-icons/lu";
import useUserStore from "../../store/useUserStore";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import AddLocationTimer from "./AddLocationTimer";

const DefaultOperatingHoursModal: React.FC<{
	setDefaultSlots: Dispatch<SetStateAction<OperatingHour[]>>;
}> = ({ setDefaultSlots }) => {
	const onboardingLocationInfo = useUserStore(
		(s) => s.onboardingLocationInfo
	);
	const [show, setShow] = useState(onboardingLocationInfo ? false : true);
	const router = useRouter();

	const [slots, setSlots] = useState<OperatingHour[]>([
		{
			day: "Monday",
			day_value: 1,
			is_active: 1,
			time_slots: [{ start_time: "09:00:00", end_time: "17:00:00" }],
		},
	]);

	const updateSlots = () => {
		setDefaultSlots((prevSlots) => {
			const updatedSlots = prevSlots.map((item) => ({
				...item,
				time_slots: slots[0].time_slots,
			}));
			return updatedSlots;
		});
		setTimeout(() => {
			setShow(false);
		}, 300);
	};

	return (
		<Dialog open={show} onOpenChange={setShow}>
			<DialogContent className="max-w-[447px]">
				<div className="flex flex-col justify-between space-y-8">
					<div className="flex items-center justify-between">
						<h1 className="text-left text-[22px] font-medium leading-[30px] -tracking-[1%] text-main-1">
							Operating Hours
						</h1>
						<LuX
							color="#858C95"
							size={20}
							className="cursor-pointer self-center"
							onClick={() => {
								setShow(false);
							}}
						/>
					</div>
					<p className="leading-[20px] -tracking-[0.1px] text-[#323539]">
						What are your regular operating hours?
					</p>
					<AddLocationTimer
						{...slots[0]}
						index={0}
						slots={slots}
						setSlots={setSlots}
					/>
					<DialogFooter className="mt-6 flex w-full space-x-1 self-end">
						<Button
							variant="ghost"
							className="h-[46px] w-[130px]"
							onClick={() => setShow(false)}
						>
							Skip for now
						</Button>
						<Button
							className="h-[46px] w-[130px] text-white"
							onClick={(e) => {
								e.preventDefault();
								updateSlots();
							}}
						>
							Next
						</Button>
					</DialogFooter>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default DefaultOperatingHoursModal;
