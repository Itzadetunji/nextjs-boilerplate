import { UseQueryError } from "@/hooks/useQueryError";
import { APIVersion1GetRequest, APIVersion1Register } from "@/http/v1";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const RegisterUserSlice = (
	onSuccess: (data: AxiosResponse<Record<string, string>>) => void = () => {
		return;
	},
	onError: (error: Error) => void = () => {
		return;
	}
) => {
	return useMutation<
		AxiosResponse<Record<string, string>>,
		Error,
		Record<string, string>
	>({
		mutationFn: APIVersion1Register,
		onSuccess,
		onError,
	});
};

export const GetRequestSlice = (
	onError: (error: Error | null) => void = () => {
		return;
	}
) => {
	const getRequestQuery = useQuery<
		AxiosResponse<Record<string, string>>,
		Error
	>({
		queryKey: ["query-key"],
		queryFn: APIVersion1GetRequest,
	});

	UseQueryError({
		isError: getRequestQuery.isError,
		onError: () => onError?.(getRequestQuery.error),
	});

	return getRequestQuery;
};
