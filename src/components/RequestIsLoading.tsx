import { cn } from "@/lib/utils";
import Loader from "@/components/Loader";
import React from "react";

interface RequestIsLoadingProps {
	isFullpage?: boolean;
	isLoading: boolean;
	size?: number;
	isWhite?: boolean;
}

const RequestIsLoading: React.FC<RequestIsLoadingProps> = ({
	isFullpage,
	isLoading,
	size,
	isWhite,
}) => {
	return (
		<div
			className={cn(
				"inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50",
				{
					fixed: isFullpage,
					absolute: !isFullpage,
					hidden: !isLoading,
				}
			)}
		>
			<Loader isWhite={isWhite} size={size} />
		</div>
	);
};

export default RequestIsLoading;
