"use client";

import { cn } from "@/lib/utils";
import React from "react";

export interface ICustomCheckboxProps {
	handleCheckboxChange: () => void;
	isChecked: boolean;
	id: string;
	backgroundColor?: string;
	borderColor?: string;
	containerClassName?: string;
	className?: string;
	hasText?: boolean;
	textBefore?: string;
	textAfter?: string;
}

const Checkbox: React.FC<ICustomCheckboxProps> = ({
	handleCheckboxChange,
	isChecked,
	id,
	className,
	containerClassName,
	hasText,
	textBefore,
	textAfter,
}) => {
	return (
		<button
			className={cn("inline-flex items-center", containerClassName)}
			onClick={handleCheckboxChange}
		>
			{textBefore && <p>{textBefore}</p>}
			<label
				className="relative flex cursor-pointer items-center rounded-full"
				htmlFor="check"
			>
				<input
					id={id}
					type="checkbox"
					className={cn(
						"peer relative h-[17px] w-[17px] cursor-pointer appearance-none rounded-md border border-[#E5E5E7] bg-white transition-all checked:border-primary checked:bg-primary hover:before:opacity-10",
						className
					)}
					checked={isChecked}
					readOnly
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
			{hasText && (
				<span className="ml-1 text-gray-400">
					{isChecked ? "Yes" : "No"}
				</span>
			)}
			{textAfter && <p className="ml-1">{textAfter}</p>}
		</button>
	);
};

export default Checkbox;
