"use client";

import useCustomToast from "@/components/CustomToast";
import { UseQueryError } from "@/hooks/useQueryError";
import {
	APIVersion1GetRequest,
	APIVersion1GoogleRegister,
	APIVersion1Register,
} from "@/http/v1";
import { SignUpType, User } from "@/types/signup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export const useRegisterUser = (
	onSuccess: (data: AxiosResponse<User>) => void = () => {
		return;
	},
	onError: (error: Error) => void = () => {
		return;
	}
) => {
	return useMutation<AxiosResponse<User>, Error, SignUpType>({
		mutationFn: APIVersion1Register,
		onSuccess,
		onError,
	});
};

export const useGoogleRegisterUser = (
	onSuccess: (
		data: AxiosResponse<{
			status: boolean;
			message: string;
			user: User;
			token: string;
		}>
	) => void = () => {
		return;
	},
	onError: (error: AxiosError) => void = () => {
		return;
	}
) => {
	const customToast = useCustomToast();

	return useMutation<
		AxiosResponse<{
			status: boolean;
			message: string;
			user: User;
			token: string;
		}>,
		AxiosError<Record<string, string>>,
		{ token: string }
	>({
		mutationFn: APIVersion1GoogleRegister,
		onSuccess,
		onError: (error) => {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response?.data.message
			)
				customToast(error.response?.data.message, {
					id: "google-signup",
					type: "error",
				});

			onError(error);
		},
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
