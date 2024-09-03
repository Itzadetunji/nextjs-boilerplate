"use client";

import useCustomToast from "@/components/CustomToast";
import { useHandleLoginSuccess } from "@/hooks/useLoginSuccess";
import { UseQueryError } from "@/hooks/useQueryError";
import {
	APIVersion1GetBusinessInformation,
	APIVersion1GetSubscriptionPlans,
	APIVersion1GetUserInformation,
	APIVersion1GoogleRegister,
	APIVersion1Register,
} from "@/http/v1";
import { AddLocationType } from "@/types/onboarding";
import { SignUpType, User } from "@/types/signup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import useUserStore from "../useUserStore";

export const useRegisterUser = (
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
	onError: (
		error: AxiosError<{ errors: Record<string, string> }>
	) => void = () => {
		return;
	}
) => {
	const handleLoginSuccess = useHandleLoginSuccess();
	return useMutation<
		AxiosResponse<{
			status: boolean;
			message: string;
			user: User;
			token: string;
		}>,
		AxiosError<{ errors: Record<string, string> }>,
		SignUpType
	>({
		mutationFn: APIVersion1Register,
		onSuccess: (data) => {
			handleLoginSuccess(data.data);
			onSuccess(data);
		},
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

export const useGetUserInformation = (
	isEnabled: boolean = true,
	onError?: (error: AxiosError | null) => void
) => {
	const handleLoginSuccess = useHandleLoginSuccess();
	const getUserInformation = useQuery<AxiosResponse<User>, AxiosError>({
		enabled: isEnabled,
		queryKey: ["user-info"],
		queryFn: APIVersion1GetUserInformation,
		retry: 3,
	});

	useEffect(() => {
		if (getUserInformation?.data?.data)
			handleLoginSuccess({ user: getUserInformation?.data.data });
	}, [getUserInformation.isSuccess]);

	UseQueryError({
		isError: getUserInformation.isError,
		onError: () => onError?.(getUserInformation.error),
	});

	return getUserInformation;
};

export const useGetUserInformationMutation = (
	onSuccess?: (data: AxiosResponse | null) => void,
	onError?: (error: AxiosError | null) => void
) => {
	const handleLoginSuccess = useHandleLoginSuccess();
	return useMutation<AxiosResponse<User>, AxiosError>({
		mutationFn: APIVersion1GetUserInformation,
		onSuccess: (data) => {
			handleLoginSuccess({ user: data.data });
			onSuccess?.(data);
		},
		onError,
	});
};
