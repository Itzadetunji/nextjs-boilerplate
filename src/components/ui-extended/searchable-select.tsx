"use client";

import {
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { CommandLoading, Command as CommandPrimitive } from "cmdk";
import React, { type KeyboardEvent } from "react";
import { LuCheck } from "react-icons/lu";

export type SelectOption = Record<"value" | "label", string> &
	Record<string, string>;

type SearchableSelectProps = {
	options: SelectOption[];
	emptyMessage: string;
	value?: SelectOption;
	shouldFilter?: boolean;
	onValueChange?: (option: SelectOption) => void;
	onTypingChange?: (value: string) => void;
	onBlur?: (option: SelectOption) => void;
	isLoading?: boolean;
	disabled?: boolean;
	placeholder?: string;
};

export const SearchableSelect = ({
	options,
	placeholder,
	emptyMessage,
	value,
	onValueChange,
	onTypingChange,
	onBlur,
	disabled,
	shouldFilter,
	isLoading = false,
}: SearchableSelectProps) => {
	const inputRef = React.useRef<HTMLInputElement>(null);

	const [isOpen, setOpen] = React.useState(false);
	const [inputValue, setInputValue] = React.useState<string>(
		value?.label || ""
	);
	const [selected, setSelected] = React.useState<SelectOption>(
		value as SelectOption
	);

	const handleKeyDown = React.useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			const input = inputRef.current;
			if (!input) {
				return;
			}

			// Keep the options displayed when the user is typing
			if (!isOpen) {
				setOpen(true);
			}

			// This is not a default behaviour of the <input /> field
			if (event.key === "Enter" && input.value !== "") {
				const optionToSelect = options.find(
					(option) => option.label === input.value
				);
				if (optionToSelect) {
					setSelected(optionToSelect);
					onValueChange?.(optionToSelect);
				}
			}

			if (event.key === "Escape") {
				input.blur();
			}
		},
		[isOpen, options, onValueChange]
	);

	const handleBlur = React.useCallback(() => {
		setOpen(false);
		setInputValue(selected?.label);

		// Call the onBlur callback
		onBlur?.(selected);
	}, [selected]);

	const handleSelectOption = React.useCallback(
		(selectedOption: SelectOption) => {
			setInputValue(selectedOption.label);

			setSelected(selectedOption);
			onValueChange?.(selectedOption);

			// This is a hack to prevent the input from being focused after the user selects an option
			// We can call this hack: "The next tick"
			setTimeout(() => {
				inputRef?.current?.blur();
			}, 0);
		},
		[onValueChange]
	);

	return (
		<CommandPrimitive onKeyDown={handleKeyDown} shouldFilter={shouldFilter}>
			<CommandInput
				// breaker
				ref={inputRef}
				value={inputValue}
				onBlur={handleBlur}
				disabled={disabled}
				className="border-none text-base"
				containerClassName="rounded-[8px] border h-10 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
				placeholder={placeholder}
				onFocus={() => setOpen(true)}
				onValueChange={
					isLoading
						? undefined
						: (value) => {
								setInputValue(value);
								onTypingChange?.(value);
							}
				}
				showSearchIcon={false}
			/>

			<div className="relative mt-1">
				<div
					className={cn(
						"absolute top-0 z-10 w-full rounded-xl bg-white outline-none animate-in fade-in-0 zoom-in-95",
						isOpen ? "block" : "hidden"
					)}
				>
					<CommandList className="rounded-lg bg-white ring-1 ring-slate-200">
						{isLoading ? (
							<CommandLoading>
								<div className="select-none rounded-sm px-4 py-3 text-left text-sm">
									Loading....
								</div>
							</CommandLoading>
						) : null}

						{options.length > 0 && !isLoading ? (
							<CommandGroup>
								{options.map((option) => {
									const isSelected =
										selected?.value === option.value;

									return (
										<CommandItem
											key={option.value}
											value={option.label}
											onMouseDown={(event) => {
												event.preventDefault();
												event.stopPropagation();
											}}
											onSelect={() =>
												handleSelectOption(option)
											}
											className={cn(
												"flex w-full items-center gap-2",
												!isSelected ? "pl-8" : null
											)}
										>
											{isSelected ? (
												<LuCheck className="w-4" />
											) : null}
											{option.label}
										</CommandItem>
									);
								})}
							</CommandGroup>
						) : null}

						{!isLoading ? (
							<CommandEmpty className="select-none rounded-sm px-2 py-3 text-center text-sm">
								{emptyMessage}
							</CommandEmpty>
						) : null}
					</CommandList>
				</div>
			</div>
		</CommandPrimitive>
	);
};
