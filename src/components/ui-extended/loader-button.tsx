import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import * as React from "react";
import { buttonVariants } from "../ui/button";

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	loading?: boolean;
	loaderSize?: number;
}

const LoaderButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			asChild = false,
			children,
			loaderSize,
			loading,
			...props
		},
		ref
	) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(
					buttonVariants({ variant, size, className }),
					"relative"
				)}
				ref={ref}
				{...props}
			>
				{loading && (
					<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden">
						<Loader size={loaderSize} />
					</div>
				)}
				<div
					className={`flex items-center justify-center ${loading ? "invisible" : ""}`}
				>
					{children}
				</div>
			</Comp>
		);
	}
);
LoaderButton.displayName = "LoaderButton";

export { buttonVariants, LoaderButton };
