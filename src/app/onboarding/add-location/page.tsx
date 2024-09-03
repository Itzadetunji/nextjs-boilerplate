"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment-timezone";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
	useAddBusinessLocation,
	useUpdateBusinessLocation,
	useUpdateSpacesOperatingHours,
} from "@/store/slices/onboarding";
import useUserStore from "@/store/useUserStore";
import { AddLocationType, AddLocationSchema } from "../../../types/onboarding";
import { oldDefaultTimeSlots } from "@/utils/constants";
import { convertSchedule, scheduleBlockOptions } from "@/utils/general";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import DefaultOperatingHoursModal from "@/components/Onboarding/DefaultOperatingHoursModal";
import { OperatingHour } from "@/types/onboarding";
import { LoaderButton } from "@/components/ui-extended/loader-button";
import { convertColumnTimeToMinutesOrSeconds } from "@/utils/general";
import { TimeZoneCustomSelect } from "@/components/Onboarding/TimeZoneSelect";
import AddLocationTimer from "@/components/Onboarding/AddLocationTimer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const AddLocation: React.FC = () => {
	const onboardingLocationInfo = useUserStore(
		(s) => s.onboardingLocationInfo
	);
	const user = useUserStore((s) => s.user);

	const [slots, setSlots] = useState<OperatingHour[]>(
		onboardingLocationInfo
			? onboardingLocationInfo.time_slots
			: oldDefaultTimeSlots
	);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors, isValid },
	} = useForm<AddLocationType>({
		resolver: zodResolver(AddLocationSchema),
		defaultValues: {
			name: user?.business?.name ?? "",
			state: user?.business?.state ?? "",
			address: user?.business?.address ?? "",
			city: user?.business?.city ?? "",
			country: user?.business?.country ?? "",
			approximate_waiting_time: onboardingLocationInfo
				? convertColumnTimeToMinutesOrSeconds(
						onboardingLocationInfo.approximate_waiting_time,
						"minutes"
					).toString()
				: "15",
			schedule_block_in_min: onboardingLocationInfo
				? onboardingLocationInfo.schedule_block_in_min
				: 15,
			time_zone: onboardingLocationInfo
				? onboardingLocationInfo?.time_zone?.length > 0
					? onboardingLocationInfo?.time_zone
					: "UTC"
				: moment.tz.guess(),
			day_time_slots: slots,
		},
	});

	const addBusinessLocationMutation = useAddBusinessLocation(
		undefined,
		undefined,
		slots
	);

	const updateBusinessLocationMutation = useUpdateBusinessLocation(
		undefined,
		undefined,
		slots
	);

	const updateSpacesOperatingHoursMutation = useUpdateSpacesOperatingHours(
		undefined,
		undefined
		// slots
	);

	const handleAddLocationForm: SubmitHandler<AddLocationType> = async (
		data
	) => {
		if (isTimeOverlapping(slots)) return;
		if (data.approximate_waiting_time.length <= 0)
			data.approximate_waiting_time = "15";

		const hours = Math.floor(+data.approximate_waiting_time / 60);
		const minutes = +data.approximate_waiting_time % 60;

		const body: AddLocationType = {
			name: data.name,
			state: data.state,
			address: data.address,
			city: data.city,
			country: data.country,
			approximate_waiting_time: `${String(hours).padStart(2, "0")}:${String(
				data.approximate_waiting_time ? minutes : 30
			).padStart(2, "0")}:00`,
			time_zone: data.time_zone,
			day_time_slots: slots as any,
			schedule_block_in_min: data.schedule_block_in_min
				? data.schedule_block_in_min
				: 15,
		};
		// console.log(user?.business.locations[0].id)
		if (
			user?.business.products &&
			user?.business.products.find(
				(item) => item.product_type === "room_booking"
			)
		) {
			const spacesOperatingHoursTimeSlots = convertSchedule(slots);
			const spacesOperatingHoursFormData = {
				update_all_rooms: 1,
				rooms_to_update: [],
				data: spacesOperatingHoursTimeSlots,
			};
			updateSpacesOperatingHoursMutation.mutate(
				spacesOperatingHoursFormData
			);
			return;
		}
		if (onboardingLocationInfo) updateBusinessLocationMutation.mutate(body);
		else addBusinessLocationMutation.mutate(body);
	};

	return (
		<>
			<form
				className="relative mb-5 flex h-fit max-h-fit w-full max-w-[656px] flex-col space-y-4 rounded-[10px] bg-white shadow-[0px_20px_25px_-5px_rgba(16,24,40,0.10),0px_8px_10px_-6px_rgba(16,24,40,0.10)]"
				onSubmit={handleSubmit(handleAddLocationForm)}
			>
				<div className="px-8 py-3">
					<h2 className="text-[22px] font-semibold text-[#323539]">
						Add your operating hours
					</h2>
					<h3 className="text-[#858C95]">
						You can customize this information later.
					</h3>
				</div>
				<div className="flex max-h-[372px] flex-col space-y-3 overflow-scroll px-8">
					{slots.map((slot, i) => (
						<AddLocationTimer
							{...slot}
							key={i}
							index={i}
							slots={slots}
							shouldShowDay
							shouldShowPlus
							setSlots={setSlots}
						/>
					))}
				</div>
				<div className="flex flex-col space-y-6 rounded-b-[10px] bg-[#FAFBFC] px-8 py-4">
					<div className="flex flex-col space-y-3">
						<div className="flex w-full flex-col space-y-1.5">
							<div className="flex items-center space-x-4">
								<Label className="max-w-[141px] flex-1 text-base font-medium tracking-[-0.1px] text-[#323539]">
									Est. Wait Time
									<span className="text-red-500">*</span>
								</Label>
								<div className="flex max-w-[320px] flex-1 items-center space-x-2 rounded-md border border-[#E5E5E7] bg-white px-3 py-2">
									<Input
										{...register(
											"approximate_waiting_time"
										)}
										inputMode="numeric"
										className="h-[22px] border-none px-0 font-semibold shadow-none"
									/>
									<div className="flex h-[18px] min-w-[62px] items-center border-l border-l-[#B7B7B7] pl-2">
										<p className="rounded-full text-[15px] leading-[22px] text-[#323539]">
											minutes
										</p>
									</div>
								</div>
								{errors.name?.message && (
									<small className="mt-1.5 text-sm text-red-500">
										{errors.name?.message}
									</small>
								)}
							</div>
							{errors.approximate_waiting_time?.message && (
								<small className="text-sm text-red-500">
									{errors.approximate_waiting_time?.message}
								</small>
							)}
						</div>

						<div className="flex flex-col space-y-1.5">
							<div className="flex items-center space-x-4">
								<TooltipProvider>
									<Tooltip delayDuration={0}>
										<TooltipTrigger asChild>
											<div className="flex max-w-[141px] flex-1 items-center space-x-2">
												<label className="block flex-1 text-base font-medium tracking-[-0.1px] text-[#323539]">
													Schedule Block
												</label>

												<i className="mgc_information_line schedule-time-block-icon before-text-dark text-[14px]" />
											</div>
										</TooltipTrigger>

										<TooltipContent
											side="top"
											sideOffset={10}
										>
											This is the default time for each
											appointment
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
								<div className="flex flex-1 flex-col space-y-1.5">
									<div className="flex max-w-[320px] flex-1 items-center justify-between rounded-md border border-[#E5E5E7] bg-white px-3 py-2 text-[#323539]">
										<Select
											value={watch(
												"schedule_block_in_min"
											).toString()}
											onValueChange={(value) =>
												setValue(
													"schedule_block_in_min",
													+value
												)
											}
										>
											<SelectTrigger className="removeFocus h-3 border-none px-0 pr-1">
												<SelectValue
													placeholder="15"
													className="!w-full text-[#858C95]"
												/>
											</SelectTrigger>
											<SelectContent className="!z-[9999]">
												{scheduleBlockOptions.map(
													(option, mainIndex) => {
														return (
															<SelectGroup
																key={mainIndex}
															>
																<SelectItem
																	value={
																		option.value
																	}
																>
																	{
																		option.label
																	}
																</SelectItem>
															</SelectGroup>
														);
													}
												)}
											</SelectContent>
										</Select>
										<div className="flex min-w-[62px] items-center space-x-2">
											<div className="h-[18px] w-[1px] rounded-full bg-[#B7B7B7]" />
											<p className="rounded-full text-[15px] leading-[22px] text-[#323539]">
												minutes
											</p>
										</div>
									</div>
								</div>
							</div>
							{errors.schedule_block_in_min?.message && (
								<small className="text-sm text-red-500">
									{errors.schedule_block_in_min?.message}
								</small>
							)}
						</div>

						<div className="flex w-full flex-col space-y-1.5">
							<div className="flex items-center space-x-4">
								<label className="max-w-[141px] flex-1 text-base font-medium tracking-[-0.1px] text-[#323539]">
									Time Zone
								</label>
								<div className="flex flex-1 flex-col space-y-1.5">
									<TimeZoneCustomSelect
										onChange={(value) => {
											setValue("time_zone", value);
										}}
									/>
									{errors.time_zone?.message && (
										<p
											className={`text-sm tracking-[-0.1px] text-red-500`}
										>
											Kindly select time zone
										</p>
									)}
								</div>
							</div>
							{errors.time_zone?.message && (
								<small className="text-sm text-red-500">
									{errors.time_zone?.message}
								</small>
							)}
						</div>
					</div>
					<div className="flex items-center justify-end space-x-6">
						{/* <Button
						disabled={false}
						className="max-w-[95px] bg-transparent  font-semibold leading-[22px] text-[#323539] hover:border-transparent hover:bg-transparent"
						onClick={() => navigate("/about-business/upgrade-plan")}
					>
						Skip for now
					</Button> */}
						<LoaderButton
							disabled={
								addBusinessLocationMutation.isPending ||
								updateBusinessLocationMutation.isPending ||
								updateSpacesOperatingHoursMutation.isPending
							}
							loading={
								addBusinessLocationMutation.isPending ||
								updateBusinessLocationMutation.isPending ||
								updateSpacesOperatingHoursMutation.isPending
							}
							className={cn(
								"h-10 w-full max-w-[95px] self-end px-0 font-semibold leading-[22px] text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)] hover:border-transparent",
								{
									"bg-[#195388] text-white": isValid,
									"bg-[#E5E5E7] text-[#858C95]": !isValid,
								}
							)}
							type="submit"
							loaderSize={20}
						>
							Next
						</LoaderButton>
					</div>
				</div>
			</form>
			<DefaultOperatingHoursModal setDefaultSlots={setSlots} />
		</>
	);
};

/** 
Function to check if the time slots are overlapping
 * @param {OperatingHour[]} time_slots - Array of time slots
 * @param slots.start - Start time of the time slot
 * @param slots.end - End time of the time slot
 * @returns {boolean} - Returns true if the time slots are overlapping
 */

const isTimeOverlapping = (time_slots: OperatingHour[]): boolean => {
	for (let h = 0; h < time_slots.length; h++) {
		const slots = time_slots[h].time_slots.map((slot) => ({
			start: convertColumnTimeToMinutesOrSeconds(
				slot.start_time,
				"minutes"
			),
			end: convertColumnTimeToMinutesOrSeconds(slot.end_time, "minutes"),
			day_value: time_slots[h].day_value,
		}));
		for (let i = 0; i < slots.length; i++) {
			for (let j = i + 1; j < slots.length; j++) {
				if (
					(slots[i].start < slots[j].end &&
						slots[i].end > slots[j].start) ||
					(slots[j].start < slots[i].end &&
						slots[j].end > slots[i].start)
				) {
					toast.error(
						`${time_slots[h].day}'s times are overlapping`,
						{
							id: "add-location-form",
						}
					);
					return true;
				}
			}
		}
	}

	return false;
};

export default AddLocation;
