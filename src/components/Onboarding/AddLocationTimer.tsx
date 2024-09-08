import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { OperatingHour } from "@/types/onboarding";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { TbTrash } from "react-icons/tb";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

interface AddLocationTimerProps extends OperatingHour {
	index: number;
	slots: OperatingHour[];
	shouldShowDay?: boolean;
	shouldShowPlus?: boolean;
	setSlots: Dispatch<SetStateAction<OperatingHour[]>>;
}

const AddLocationTimer: React.FC<AddLocationTimerProps> = ({
	day,
	day_value,
	is_active,
	time_slots,
	shouldShowDay,
	shouldShowPlus,
	setSlots,
}) => {
	// Initialize the meridians (AM/PM) for all time slots based on their start and end times
	const setAllSlotMeridians = () => {
		return time_slots.map((data) => {
			return {
				start_time: +data?.start_time.split(":")[0] >= 12 ? "PM" : "AM",
				end_time: +data?.end_time.split(":")[0] >= 12 ? "PM" : "AM",
			};
		});
	};

	// State to store the AM/PM values for all time slots
	const [slotMeridians, setSlotMeridians] = useState(() =>
		setAllSlotMeridians()
	);

	// Convert 12-hour format to 24-hour format based on the meridian (AM/PM)
	const convertTo24HourFormat = (hour: string, meridian: "AM" | "PM") => {
		let hourInt = parseInt(hour);
		if (meridian === "PM" && hourInt < 12 && hourInt !== 0) {
			hourInt += 12;
		} else if (meridian === "AM" && hourInt > 12) {
			hourInt -= 12;
		} else if (meridian === "AM" && hourInt === 12) {
			hourInt = 0;
		}

		return hourInt.toString().padStart(2, "0");
	};

	// Handle changes in time (either hour or minute) for a specific time slot
	const handleTimeChange = (
		hour: number | undefined | string,
		minutes: number | undefined,
		index: number,
		select_time: string
	) => {
		setSlots((prevSlots) => {
			return prevSlots.map((slot) => {
				if (slot.day_value === day_value) {
					const updatedTimeSlots = slot.time_slots.map(
						(timeSlot: any, slotIdx) => {
							if (slotIdx === index) {
								const [existingHour, , existingSeconds] =
									timeSlot[select_time].split(":");

								let [, existingMinutes] =
									timeSlot[select_time].split(":");

								const meridian = (slotMeridians as any)[index][
									select_time
								];

								// Convert the hour if a new one is provided, otherwise keep the existing one
								if (hour !== undefined) {
									hour = convertTo24HourFormat(
										hour.toString(),
										meridian
									);
								} else {
									hour = existingHour;
								}

								// Update the minutes if a new one is provided
								if (minutes !== undefined) {
									existingMinutes = minutes;
								}

								return {
									...timeSlot,
									[select_time]: `${hour?.toString().padStart(2, "0")}:${existingMinutes.toString().padStart(2, "0")}:${existingSeconds.toString().padStart(2, "0")}`,
								};
							}
							return timeSlot;
						}
					);

					return {
						...slot,
						time_slots: updatedTimeSlots,
					};
				}
				return slot;
			});
		});
	};

	// Handle changes in meridian (AM/PM) for a specific time slot
	const handleMeridianChange = (
		newMeridian: "PM" | "AM",
		index: number,
		select_time: string
	) => {
		// Update the meridian for the specific time slot in the state
		setSlotMeridians((prevMeridians) => {
			return prevMeridians.map((meridian, idx) => {
				if (idx === index) {
					return {
						...meridian,
						[select_time]: newMeridian,
					};
				}
				return meridian;
			});
		});

		// Update the time in 24-hour format based on the new meridian
		setSlots((prevSlots) => {
			return prevSlots.map((slot) => {
				if (slot.day_value === day_value) {
					const updatedTimeSlots = slot.time_slots.map(
						(timeSlot: any, slotIdx) => {
							if (slotIdx === index) {
								const HourMinuteSeconds =
									timeSlot[select_time].split(":");
								let hour = HourMinuteSeconds[0];
								hour = convertTo24HourFormat(hour, newMeridian);

								const [, minutes, seconds] =
									timeSlot[select_time].split(":");
								hour = convertTo24HourFormat(hour, newMeridian);

								return {
									...timeSlot,
									[select_time]: `${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
								};
							}
							return timeSlot;
						}
					);

					return {
						...slot,
						time_slots: updatedTimeSlots,
					};
				}
				return slot;
			});
		});
	};

	// Handle the deletion of a time slot
	const handleDeleteTimeSlot = (time_slots_index: number) => {
		setSlots((prevData) => {
			const newData = prevData.map((item) => {
				if (item.day_value === day_value) {
					return {
						...item,
						time_slots: item.time_slots.filter(
							(_, i) => i !== time_slots_index
						),
					};
				}
				return item;
			});
			return newData;
		});

		// Update the meridian state to reflect the deletion
		setSlotMeridians((prevData) => {
			return prevData.filter((_, i) => i !== time_slots_index);
		});
	};

	// Handle the addition of a new time slot
	const handleAddTimeSlot = () => {
		setSlots((prevData) => {
			const newData = prevData.map((item) => {
				if (item.day_value === day_value) {
					return {
						...item,
						time_slots: [
							...item.time_slots,
							{
								start_time: "09:00:00",
								end_time: "17:00:00",
							},
						],
					};
				}
				return item;
			});
			return newData;
		});

		// Add default meridian values (AM) for the new time slot
		setSlotMeridians((prevMeridians) => [
			...prevMeridians,
			{ start_time: "AM", end_time: "AM" },
		]);
	};

	// Update meridians state when the time slots change
	useEffect(() => {
		setSlotMeridians(setAllSlotMeridians());
	}, [time_slots]);

	return (
		<div className="flex items-center justify-between space-x-4">
			{shouldShowDay && (
				<div
					className={`flex max-w-[141px] flex-1 items-center space-x-4 ${
						time_slots.length > 2 && "self-start"
					}`}
				>
					{/* Toggle for enabling or disabling the day's slots */}
					<div
						className="inline-flex items-center"
						onClick={() => {
							setSlots((prevData) => {
								return prevData.map((item) => {
									if (item.day_value === day_value) {
										return {
											...item,
											is_active:
												item.is_active === 1 ? 0 : 1,
										};
									}
									return item;
								});
							});
						}}
					>
						<label
							className="relative flex cursor-pointer items-center rounded-full"
							htmlFor="check"
						>
							<input
								type="checkbox"
								className="peer relative h-[17px] w-[17px] cursor-pointer appearance-none rounded-md border border-[#E5E5E7] transition-all checked:border-[#195388] checked:bg-[#195388] hover:before:opacity-10"
								defaultChecked={!!is_active}
							/>
							<span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-[11px] w-[11px]"
									viewBox="0 0 20 20"
									fill="currentColor"
									stroke="currentColor"
									strokeWidth="1"
								>
									<path
										fillRule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clipRule="evenodd"
									></path>
								</svg>
							</span>
						</label>
					</div>

					<label
						className={`font-medium tracking-[-1%] text-[#323539] transition-opacity duration-300 ease-in-out ${!is_active && "opacity-40 hover:opacity-100"}`}
					>
						{day}
					</label>
				</div>
			)}

			<div
				className={`flex flex-1 items-center space-x-4 transition-opacity duration-300 ease-in-out ${!is_active ? "pointer-events-none opacity-40 hover:opacity-100" : ""}`}
			>
				<div
					className={`grid ${
						time_slots.length === 1
							? "grid-cols-1"
							: "grid-cols-1 sm:grid-cols-1"
					} flex-1 content-between gap-3 font-medium`}
				>
					{time_slots.map((time, time_slots_index) => (
						<TooltipProvider key={time_slots_index}>
							<div
								className={`flex flex-1 select-none items-center space-x-1.5 ${
									time_slots.length > 1 ? "m" : ""
								}`}
							>
								<div
									className="flex flex-1 items-center justify-evenly rounded-md border border-[#E5E5E7] px-1.5 py-2"
									key={time_slots_index}
								>
									<div className="flex items-center space-x-1">
										{/* Hour selection for start time */}
										<Tooltip delayDuration={200}>
											<TooltipTrigger asChild>
												<div>
													<Select
														value={
															+time.start_time.split(
																":"
															)[0] > 12
																? (
																		+time.start_time.split(
																			":"
																		)[0] -
																		12
																	)
																		.toString()
																		.padStart(
																			2,
																			"0"
																		)
																: time.start_time.split(
																			":"
																	  )[0] ===
																	  "00"
																	? "00"
																	: time.start_time
																			.split(
																				":"
																			)[0]
																			.padStart(
																				2,
																				"0"
																			)
														}
														onValueChange={(
															value
														) => {
															const hour_time =
																value.startsWith(
																	"0"
																)
																	? value.split(
																			""
																		)[1]
																	: value;

															handleTimeChange(
																+hour_time,
																undefined,
																time_slots_index,
																"start_time"
															);
														}}
													>
														<SelectTrigger
															hasChevron={false}
															className="removeFocus h-fit border-none p-0"
														>
															<SelectValue placeholder="Select" />
														</SelectTrigger>
														<SelectContent>
															{hours.map(
																(item) => (
																	<SelectItem
																		key={
																			item.value
																		}
																		value={
																			item.value
																		}
																	>
																		{
																			item.label
																		}
																	</SelectItem>
																)
															)}
														</SelectContent>
													</Select>
												</div>
											</TooltipTrigger>

											<TooltipContent
												side="top"
												sideOffset={10}
											>
												Hours
											</TooltipContent>
										</Tooltip>

										<p className="-mt-0.5">:</p>
										<div className="item-center flex space-x-1">
											{/* Minute selection for start time */}
											<Tooltip delayDuration={200}>
												<TooltipTrigger asChild>
													<div>
														<Select
															value={
																time.start_time.split(
																	":"
																)[1]
															}
															onValueChange={(
																value
															) => {
																handleTimeChange(
																	undefined,
																	+value,
																	time_slots_index,
																	"start_time"
																);
															}}
														>
															<SelectTrigger
																hasChevron={
																	false
																}
																className="removeFocus h-fit border-none p-0"
															>
																<SelectValue placeholder="Select" />
															</SelectTrigger>
															<SelectContent>
																{minutes.map(
																	(item) => (
																		<SelectItem
																			key={
																				item.value
																			}
																			value={
																				item.value
																			}
																		>
																			{
																				item.label
																			}
																		</SelectItem>
																	)
																)}
															</SelectContent>
														</Select>
													</div>
												</TooltipTrigger>

												<TooltipContent
													side="top"
													sideOffset={10}
												>
													Minutes
												</TooltipContent>
											</Tooltip>

											{/* AM/PM selection for start time */}

											<Select
												value={
													slotMeridians[
														time_slots_index
													]?.start_time
												}
												onValueChange={(value) => {
													handleMeridianChange(
														value as "PM" | "AM",
														time_slots_index,
														"start_time"
													);
												}}
											>
												<SelectTrigger
													hasChevron={false}
													className="removeFocus h-fit border-none p-0"
												>
													<SelectValue placeholder="Select" />
												</SelectTrigger>
												<SelectContent>
													{AmsPms.map((item) => (
														<SelectItem
															key={item.value}
															value={item.value}
														>
															{item.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</div>
									</div>
									-
									<div className="flex space-x-1">
										{/* Hour selection for end time */}
										<Tooltip delayDuration={200}>
											<TooltipTrigger asChild>
												<div>
													<Select
														value={
															+time.end_time.split(
																":"
															)[0] > 12
																? (
																		+time.end_time.split(
																			":"
																		)[0] -
																		12
																	)
																		.toString()
																		.padStart(
																			2,
																			"0"
																		)
																: time.end_time.split(
																			":"
																	  )[0] ===
																	  "00"
																	? "00"
																	: time.end_time
																			.split(
																				":"
																			)[0]
																			.padStart(
																				2,
																				"0"
																			)
														}
														onValueChange={(
															value
														) => {
															const hour_time =
																value.startsWith(
																	"0"
																)
																	? value.split(
																			""
																		)[1]
																	: value;

															handleTimeChange(
																+hour_time,
																undefined,
																time_slots_index,
																"end_time"
															);
														}}
													>
														<SelectTrigger
															hasChevron={false}
															className="removeFocus h-fit border-none p-0"
														>
															<SelectValue placeholder="Select" />
														</SelectTrigger>
														<SelectContent>
															{hours.map(
																(item) => (
																	<SelectItem
																		key={
																			item.value
																		}
																		value={
																			item.value
																		}
																	>
																		{
																			item.label
																		}
																	</SelectItem>
																)
															)}
														</SelectContent>
													</Select>
												</div>
											</TooltipTrigger>

											<TooltipContent
												side="top"
												sideOffset={10}
											>
												Hours
											</TooltipContent>
										</Tooltip>
										<p className="-mt-0.5">:</p>
										<div className="item-center flex space-x-1">
											{/* Minute selection for end time */}
											<Tooltip delayDuration={200}>
												<TooltipTrigger asChild>
													<div>
														<Select
															value={
																time.end_time.split(
																	":"
																)[1]
															}
															onValueChange={(
																value
															) => {
																handleTimeChange(
																	undefined,
																	+value,
																	time_slots_index,
																	"end_time"
																);
															}}
														>
															<SelectTrigger
																hasChevron={
																	false
																}
																className="removeFocus h-fit border-none p-0"
															>
																<SelectValue placeholder="Select" />
															</SelectTrigger>
															<SelectContent>
																{minutes.map(
																	(item) => (
																		<SelectItem
																			key={
																				item.value
																			}
																			value={
																				item.value
																			}
																		>
																			{
																				item.label
																			}
																		</SelectItem>
																	)
																)}
															</SelectContent>
														</Select>
													</div>
												</TooltipTrigger>

												<TooltipContent
													side="top"
													sideOffset={10}
												>
													Minutes
												</TooltipContent>
											</Tooltip>
											{/* AM/PM selection for end time */}
											<Select
												value={
													slotMeridians[
														time_slots_index
													]?.end_time
												}
												onValueChange={(value) => {
													handleMeridianChange(
														value as "PM" | "AM",
														time_slots_index,
														"end_time"
													);
												}}
											>
												<SelectTrigger
													hasChevron={false}
													className="removeFocus h-fit border-none p-0"
												>
													<SelectValue placeholder="Select" />
												</SelectTrigger>
												<SelectContent>
													{AmsPms.map((item) => (
														<SelectItem
															key={item.value}
															value={item.value}
														>
															{item.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</div>
									</div>
								</div>
								{/* Delete button for the time slot */}
								{time_slots.length > 1 && (
									<button
										className="grid size-[30px] cursor-pointer place-content-center rounded-md bg-[#F5F5F5]"
										onClick={() =>
											handleDeleteTimeSlot(
												time_slots_index
											)
										}
									>
										{/* <i className="mgc_delete_2_line text-[14px] before:!text-[#09244B]" /> */}
										<TbTrash size={14} color="#09244B" />
									</button>
								)}
							</div>
						</TooltipProvider>
					))}
				</div>
				{/* Add button for a new time slot */}
				{shouldShowPlus && (
					<GrAdd
						className={`cursor-pointer ${time_slots.length > 2 && "self-end"}`}
						color="#858C95"
						size={16}
						onClick={() => handleAddTimeSlot()}
					/>
				)}
			</div>
		</div>
	);
};

export default AddLocationTimer;

// Options for AM/PM selection
const AmsPms = [
	{
		label: "AM",
		value: "AM",
	},
	{
		label: "PM",
		value: "PM",
	},
];

// Options for minute selection
const minutes = [
	{
		label: "00",
		value: "00",
	},
	{
		label: "30",
		value: "30",
	},
];

// Options for hour selection (1-12, padded)
const hours = Array.from({ length: 12 }, (_, i) => ({
	value: i.toString().padStart(2, "0"),
	label: i.toString().padStart(2, "0"),
}));
