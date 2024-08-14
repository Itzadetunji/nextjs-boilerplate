"use client";

import Checkbox from "@/components/ui-extended/checkbox";
import { Badge } from "@/components/ui/badge";
import {
	Command,
	CommandGroup,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Command as CommandPrimitive } from "cmdk";
import { X } from "lucide-react";
import React, { KeyboardEvent } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export type Option = {
	label: string;
	value: string;
	disabled?: boolean;
	metadata?: any;
};

interface MultiSelectProps {
	options: Option[];
	placeholder: string;
	selected: Option[];
	onSelect: (option: Option[]) => void;
	onUnselect: (option: Option) => void;
	maxSelections?: number;
	checkBoxed?: boolean;
	error?:
		| FieldError
		| Merge<FieldError, FieldErrorsImpl<any>>
		| undefined
		| "";
}
const MultiSelect: React.FC<MultiSelectProps> = ({
	options,
	placeholder,
	selected,
	onSelect,
	onUnselect,
	maxSelections,
	error,
	checkBoxed = true,
}) => {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const [open, setOpen] = React.useState(false);
	const [inputValue, setInputValue] = React.useState("");
	const handleUnselect = React.useCallback(
		(option: Option) => onUnselect(option),
		[]
	);
	const handleKeyDown = React.useCallback(
		(e: KeyboardEvent<HTMLDivElement>) => {
			const input = inputRef.current;
			if (input) {
				if (e.key === "Delete" || e.key === "Backspace") {
					if (input.value === "") {
						const newSelected = [...selected];
						newSelected.pop();
						onSelect(newSelected);
					}
				}
				if (e.key === "Escape") {
					input.blur();
				}
			}
		},
		[]
	);
	const selectables =
		[
			...options,
			{ label: "Disabled", value: "Disabled", disabled: true },
		].filter((option) => !selected.some((s) => s.value === option.value)) ??
		[];

	const optionsToMap = checkBoxed ? options : selectables;

	return (
		<div>
			<Command
				onKeyDown={handleKeyDown}
				className="relative overflow-visible bg-transparent"
			>
				<div className="group flex min-h-10 flex-col justify-center rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
					<div className="flex flex-wrap gap-[5px]">
						{selected.map((option) => (
							<Badge
								key={option.value}
								variant="outline"
								className="cursor-pointer rounded-sm border-[#E5E5E7] px-1.5 text-[#323539]"
								onClick={() => handleUnselect(option)}
							>
								{option.label}
								<button
									className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											handleUnselect(option);
										}
									}}
									onMouseDown={(e) => {
										e.preventDefault();
										e.stopPropagation();
									}}
								>
									<X className="h-3 w-3 text-[#323539] duration-200 ease-in-out hover:text-muted-foreground" />
								</button>
							</Badge>
						))}
						<CommandPrimitive.Input
							ref={inputRef}
							value={inputValue}
							onValueChange={setInputValue}
							onBlur={() => setOpen(false)}
							onFocus={() => setOpen(true)}
							placeholder={
								maxSelections === selected.length
									? ""
									: placeholder
							}
							className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
						/>
					</div>
				</div>
				{open && selectables.length > 0 ? (
					<div className="relative mt-2">
						<div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
							<CommandList>
								<CommandGroup className="h-full overflow-auto">
									{selectables.length > 1 ? (
										optionsToMap.map((option) => {
											const onCommandSelect = () => {
												if (
													selected.find(
														(item) =>
															item.value ===
															option.value
													)
												)
													return handleUnselect(
														option
													);
												const newSelected = [
													...selected,
													option,
												];
												onSelect(newSelected);
												setInputValue("");
											};
											return (
												<CommandItem
													key={option.value}
													onMouseDown={(e) => {
														e.preventDefault();
														e.stopPropagation();
													}}
													disabled={option.disabled}
													onSelect={onCommandSelect}
													className={cn(
														"cursor-pointer",
														{
															hidden: option.disabled,
														}
													)}
												>
													<span className="hidden">
														{option.value}
													</span>
													<div className="flex items-center gap-x-3">
														{checkBoxed && (
															<Checkbox
																handleCheckboxChange={
																	onCommandSelect
																}
																isChecked={
																	!!selected.find(
																		(
																			item
																		) =>
																			item.value ===
																			option.value
																	)
																}
																id={
																	option.label +
																	option.value
																}
																className="size-4 rounded-[2px] border-[2.5px]"
															/>
														)}

														<p>{option.label}</p>
													</div>
												</CommandItem>
											);
										})
									) : (
										<CommandItem disabled>
											No options available
										</CommandItem>
									)}
								</CommandGroup>
							</CommandList>
						</div>
					</div>
				) : null}
			</Command>
			{error && (
				<small className="mt-1 text-xs text-red-500">
					{(error.message || error.type)?.toString()}
				</small>
			)}
		</div>
	);
};
export default MultiSelect;
