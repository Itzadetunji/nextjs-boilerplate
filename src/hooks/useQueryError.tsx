import { useEffect } from "react";

interface useQueryErrorProps {
	isError: boolean;
	onError: () => void;
}

export const UseQueryError = ({ isError, onError }: useQueryErrorProps) => {
	useEffect(() => {
		if (isError) onError();
	}, [isError, onError]);
};
