"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "@/lib/utils";

interface DatePickerProps {
	date: Date | undefined;
	setDate: (date: Date) => void;
	className?: string;
	toDate?: Date;
}

export function DatePicker({
	className,
	date,
	toDate,
	setDate,
}: DatePickerProps) {
	const [popoverOpen, setPopoverOpen] = React.useState(false);
	return (
		<Popover onOpenChange={setPopoverOpen} open={popoverOpen}>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-fit justify-start text-left font-normal",
						!date && "text-muted-foreground",
						className
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{date ? format(date, "PPP") : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			{/* <PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					selected={date}
					onSelect={(day: Date) => {
						if (day) {
							setDate(day);
							setPopoverOpen(false);
						}
					}}
					// initialFocus
					{...(toDate && { toDate })}
				/>
			</PopoverContent> */}
		</Popover>
	);
}
