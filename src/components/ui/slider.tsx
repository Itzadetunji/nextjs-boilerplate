"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
		className?: string;
		beforeThumbClassName?: string;
		afterThumbClassName?: string;
		thumbClassName?: string;
	}
>(
	(
		{
			className,
			beforeThumbClassName,
			afterThumbClassName,
			thumbClassName,
			...props
		},
		ref
	) => (
		<SliderPrimitive.Root
			ref={ref}
			className={cn(
				"relative flex w-full touch-none select-none items-center",
				className
			)}
			{...props}
		>
			<SliderPrimitive.Track
				className={cn(
					"relative h-1 w-full grow overflow-hidden rounded-full bg-secondary",
					afterThumbClassName
				)}
			>
				<SliderPrimitive.Range
					className={cn(
						"absolute h-full bg-primary",
						beforeThumbClassName
					)}
				/>
			</SliderPrimitive.Track>
			<SliderPrimitive.Thumb
				className={cn(
					"block h-3 w-3 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
					thumbClassName
				)}
			/>
		</SliderPrimitive.Root>
	)
);
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
