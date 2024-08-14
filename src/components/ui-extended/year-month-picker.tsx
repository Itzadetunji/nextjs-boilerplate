"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { getStartOfCurrentMonth } from "@/utils/date";
import { cn } from "@/lib/utils";
import {
	add,
	eachMonthOfInterval,
	endOfYear,
	format,
	isEqual,
	parse,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface MonthPickerProps {
	currentMonth: Date;
	onMonthChange: (newMonth: Date) => void;
	className?: string;
}

const MonthPicker: React.FC<MonthPickerProps> = ({
	currentMonth,
	onMonthChange,
	className,
}) => {
	const [currentYear, setCurrentYear] = React.useState(
		format(currentMonth, "yyyy")
	);
	const [popoverOpen, setPopoverOpen] = React.useState(false);

	const firstDayCurrentYear = parse(currentYear, "yyyy", new Date());

	const months = eachMonthOfInterval({
		start: firstDayCurrentYear,
		end: endOfYear(firstDayCurrentYear),
	});

	const previousYear = () => {
		const firstDayNextYear = add(firstDayCurrentYear, { years: -1 });
		setCurrentYear(format(firstDayNextYear, "yyyy"));
	};

	const nextYear = () => {
		const firstDayNextYear = add(firstDayCurrentYear, { years: 1 });
		setCurrentYear(format(firstDayNextYear, "yyyy"));
	};

	return (
		<Popover onOpenChange={setPopoverOpen} open={popoverOpen}>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-fit justify-start text-left font-normal",
						!currentMonth && "text-muted-foreground",
						className
					)}
				>
					<i className="mgc_calendar_line mr-1 text-[16px]" />
					{currentMonth ? (
						format(currentMonth, "MMMM, yyyy")
					) : (
						<span>Pick a date</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<div className="p-3">
					<div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
						<div className="space-y-4">
							<div className="relative flex items-center justify-center pt-1">
								<div
									className="text-sm font-medium"
									aria-live="polite"
									role="presentation"
									id="month-picker"
								>
									{format(firstDayCurrentYear, "yyyy")}
								</div>
								<div className="flex items-center space-x-1">
									<button
										name="previous-year"
										aria-label="Go to previous year"
										className={cn(
											buttonVariants({
												variant: "outline",
											}),
											"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
											"absolute left-1"
										)}
										type="button"
										onClick={previousYear}
									>
										<ChevronLeft className="h-4 w-4" />
									</button>
									<button
										name="next-year"
										aria-label="Go to next year"
										className={cn(
											buttonVariants({
												variant: "outline",
											}),
											"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
											"absolute right-1 disabled:bg-slate-100"
										)}
										type="button"
										// disabled={isFuture(
										// 	add(firstDayCurrentYear, {
										// 		years: 1,
										// 	})
										// )}
										onClick={nextYear}
									>
										<ChevronRight className="h-4 w-4" />
									</button>
								</div>
							</div>
							<div
								className="grid w-full grid-cols-3 gap-2"
								role="grid"
								aria-labelledby="month-picker"
							>
								{months.map((month) => (
									<div
										key={month.toString()}
										className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md dark:[&:has([aria-selected])]:bg-slate-800"
										role="presentation"
									>
										<button
											name="day"
											className={cn(
												"inline-flex h-9 w-16 items-center justify-center rounded-md p-0 text-sm font-normal ring-offset-white transition-colors hover:bg-slate-100 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-selected:opacity-100 dark:ring-offset-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:focus-visible:ring-slate-800",
												isEqual(month, currentMonth) &&
													"bg-primary text-slate-50 hover:bg-primary hover:text-slate-50 focus:bg-primary focus:text-slate-50 dark:bg-slate-50 dark:text-primary dark:hover:bg-slate-50 dark:hover:text-primary dark:focus:bg-slate-50 dark:focus:text-primary",
												!isEqual(month, currentMonth) &&
													isEqual(
														month,
														getStartOfCurrentMonth()
													) &&
													"bg-slate-100 text-primary dark:bg-slate-800 dark:text-slate-50"
											)}
											// disabled={isFuture(month)}
											role="gridcell"
											tabIndex={-1}
											type="button"
											onClick={() => {
												onMonthChange(month);
												setPopoverOpen(false);
											}}
										>
											<time
												dateTime={format(
													month,
													"yyyy-MM-dd"
												)}
											>
												{format(month, "MMM")}
											</time>
										</button>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default MonthPicker;
