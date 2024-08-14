"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { InputProps as BaseInputProps } from "../ui/input";

interface InputProps extends BaseInputProps {
	outerClassName?: string;
	icon?: string;
	position?: "left" | "right";
	iconClick?: () => void;
}

const InputIcon = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			position = "left",
			outerClassName,
			icon,
			iconClick,
			type,
			...props
		},
		ref
	) => {
		return (
			<div
				className={cn(
					"flex items-center space-x-2 rounded-md border border-input bg-background px-3 py-2 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
					outerClassName
				)}
			>
				{position === "left" && (
					<i
						className={icon + " before:!text-[#858C95]"}
						onClick={iconClick}
					/>
				)}
				<input
					type={type}
					className={cn(
						"flex w-full text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
						className
					)}
					ref={ref}
					{...props}
				/>
				{position === "right" && (
					<i
						className={icon + " before:!text-[#858C95]"}
						onClick={iconClick}
					/>
				)}
			</div>
		);
	}
);

InputIcon.displayName = "Search-Input";

export default InputIcon;
