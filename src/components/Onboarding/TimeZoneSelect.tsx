import { newTimeZonesData } from "@/utils/general";
import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import useUserStore from "../../store/useUserStore";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

export type Option = {
	label: string;
	value: string;
};

/**
 * Custom select component for choosing a time zone.
 * This component fetches time zone data and presents it in a dropdown menu.
 * Users can select their preferred time zone, which updates the parent component state.
 *
 * @component
 * @param {Function} onChange - Callback function that updates the parent state with the selected time zone.
 *
 * @returns {React.FC} A functional React component that renders a select dropdown for time zones.
 *
 * Example usage:
 * ```jsx
 * <TimeZoneCustomSelect onChange={handleTimeZoneChange} />
 * ```
 */

interface TimeZoneCustomSelectProps {
	onChange: (value: string) => void;
}
export const TimeZoneCustomSelect: React.FC<TimeZoneCustomSelectProps> = ({
	onChange,
}) => {
	const newTimeZones = newTimeZonesData();
	const onboardingLocationInfo = useUserStore(
		(s) => s.onboardingLocationInfo
	);
	const [timeZone, setTimeZone] = useState(
		onboardingLocationInfo
			? onboardingLocationInfo?.time_zone?.length > 0
				? onboardingLocationInfo?.time_zone
				: "UTC"
			: moment.tz.guess()
	);

	return (
		<div className="spcae-y-1.5 flex flex-1 flex-col">
			<div className="flex max-w-[320px] flex-1 items-center justify-between rounded-md border border-[#E5E5E7] bg-white px-3 py-2 text-[#323539]">
				<Select
					value={timeZone}
					onValueChange={(value) => {
						setTimeZone(value);
						onChange(value);
					}}
				>
					<SelectTrigger className="removeFocus h-3 border-none px-0 pr-1">
						<SelectValue
							placeholder={"Select"}
							className="!w-full text-[#858C95]"
						/>
					</SelectTrigger>
					<SelectContent className="!z-[9999] min-w-[320px]">
						{newTimeZones.map((option, mainIndex: number) => {
							return (
								<SelectGroup
									key={mainIndex}
									className="min-w-[320px]"
								>
									<SelectLabel>
										{option.continent}
									</SelectLabel>
									<SingleItemTime option={option} />
								</SelectGroup>
							);
						})}
					</SelectContent>
				</Select>
				<div className="flex min-w-[62px] items-center space-x-2">
					<div className="h-[18px] w-[1px] rounded-full bg-[#B7B7B7]" />
					<SideCurrentTime timeZone={timeZone} />
				</div>
			</div>
		</div>
	);
};

/**
 * Displays the current time for a given time zone.
 * The time is updated every 15 seconds to keep it current.
 *
 * @component
 * @param {string} timeZone - The IANA time zone string (e.g., "America/New_York") used to display the time.
 *
 * @returns {React.FC} A functional component that renders the current time adjusted to the specified time zone.
 *
 * Example usage:
 * ```jsx
 * <SideCurrentTime timeZone="Europe/London" />
 * ```
 */

const SideCurrentTime: React.FC<{ timeZone: string }> = ({ timeZone }) => {
	const [currentTimeInZone, setCurrentTimeInZone] = useState(
		moment.tz(timeZone).format("h:mm a")
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTimeInZone(moment.tz(timeZone).format("h:mm a"));
		}, 15000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	useEffect(() => {
		setCurrentTimeInZone(moment.tz(timeZone).format("h:mm a"));
	}, [timeZone]);

	return (
		<p className="rounded-full text-xs leading-[22px] text-[#323539]">
			{currentTimeInZone}
		</p>
	);
};

/**
 * Renders a list of time zone items for a specific continent as part of a larger select component.
 * Each time zone item displays the current local time upon rendering, formatted as "h:mm a".
 *
 * @component
 * @param {Object} option - Contains data for rendering time zones.
 * @param {string} option.continent - The name of the continent.
 * @param {Array} option.times - An array of time zone details.
 * @param {string} option.times[].id - The IANA identifier for the time zone.
 * @param {string} option.times[].country - The country name associated with the time zone.
 * @param {number} option.times[].offsetHours - The UTC offset in hours for the time zone.
 *
 * @returns {React.FC} A functional component that renders time zone items for selection.
 *
 * Example usage:
 * ```jsx
 * <SingleItemTime option={{ continent: "Europe", times: [{ id: "Europe/London", country: "UK", offsetHours: 0 }] }} mainIndex={0} />
 * ```
 */

interface TimeZoneDetail {
	id: string;
	country: string;
	offsetHours: number;
}

interface SingleItemTimeProps {
	option: {
		continent: string;
		times: TimeZoneDetail[];
	};
}

const SingleItemTime: React.FC<SingleItemTimeProps> = ({ option }) => {
	const getRightTime = (id: string) => moment.tz(id).format("h:mm a");

	return (
		<>
			{option.times.map((item, index) => {
				return (
					<SelectItem
						key={index}
						value={item.id}
						className="w-full"
						hasRight={getRightTime(item.id)}
						truncate="truncate-time-zone"
					>
						{item.id.includes("/")
							? item.id.split("/")[1].replace("_", " ")
							: item.id.replace("_", " ")}
					</SelectItem>
				);
			})}
		</>
	);
};
