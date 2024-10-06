import useCustomToast from "@/components/CustomToast";
import { UseQueryError } from "@/hooks/useQueryError";
import {
	APIVersion1AddBusinessCard,
	APIVersion1AddBusinessDetails,
	APIVersion1AddBusinessLocation,
	APIVersion1GetBusinessCategories,
	APIVersion1GetBusinessInformation,
	APIVersion1GetSubscriptionPlans,
	APIVersion1UpdateBusinessDetails,
	APIVersion1UpdateBusinessLocation,
	APIVersion1UpdateSpacesBusinessLocation,
} from "@/http/v1";
import {
	AddBusinessCardData,
	AddLocationType,
	OperatingHour,
	UpdateBusinessCardData,
} from "@/types/onboarding";
import { BusinessCategory, User } from "@/types/signup";
import {
	useMutation,
	UseMutationResult,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import { Location } from "../../types/signup";
import useUserStore from "../useUserStore";
import { APIVersion2AddLocation } from "@/http/v2";
import { AddBusinessLocationResponseType } from "@/types/location";
import { ErrorResponse } from "@/types";

export const useGetBusinessInformation = (
	isEnabled: boolean,
	onError?: (error: AxiosError | null) => void
) => {
	const getBusinessInformation = useQuery<
		AxiosResponse<Record<string, string>>,
		AxiosError
	>({
		enabled: isEnabled,
		queryKey: ["business-info"],
		queryFn: APIVersion1GetBusinessInformation,
	});

	UseQueryError({
		isError: getBusinessInformation.isError,
		onError: () => onError?.(getBusinessInformation.error),
	});

	return getBusinessInformation;
};

export const useGetBusinessCategories = (
	onError?: (error: AxiosError | null) => void
) => {
	const getBusinessCategories = useQuery<
		AxiosResponse<BusinessCategory[]>,
		AxiosError
	>({
		queryKey: ["business-categories"],
		queryFn: APIVersion1GetBusinessCategories,
	});

	UseQueryError({
		isError: getBusinessCategories.isError,
		onError: () => onError?.(getBusinessCategories.error),
	});

	return getBusinessCategories;
};

export const useGetSubscriptionPlans = (
	onError?: (error: AxiosError | null) => void
) => {
	const getSusbscriptionPlans = useQuery<
		AxiosResponse<Record<string, string>>,
		AxiosError
	>({
		queryKey: ["subscription-plans"],
		queryFn: APIVersion1GetSubscriptionPlans,
	});

	UseQueryError({
		isError: getSusbscriptionPlans.isError,
		onError: () => onError?.(getSusbscriptionPlans.error),
	});

	return getSusbscriptionPlans;
};

export const useAddBusiness = (
	onSuccess: (data: AxiosResponse) => void = () => {
		return;
	},
	onError: (error: AxiosError) => void = () => {
		return;
	}
) => {
	const router = useRouter();
	const setOnboardingState = useUserStore((s) => s.setOnboardingState);
	const setUser = useUserStore((s) => s.setUser);
	const customToast = useCustomToast();

	return useMutation<
		AxiosResponse<FieldValues>,
		AxiosError<FieldValues>,
		FieldValues
	>({
		mutationFn: APIVersion1AddBusinessDetails,
		onSuccess: (data) => {
			onSuccess(data);
			setUser({ business: data.data } as User);
			setOnboardingState(1);
			router.push("/onboarding/add-location");
		},
		onError: (error) => {
			onError(error);

			if (
				error.response?.data?.message ===
				"Business related to this account already exists"
			) {
				customToast("Business related to this account already exists", {
					id: "reset-password",
					type: "success",
				});
				toast.success(
					"Business related to this account already exists",
					{
						duration: 3000,
					}
				);
				router.push("/onboarding/add-location");
			}
		},
	});
};

export const useUpdateBusiness = (
	onSuccess: (data: AxiosResponse<FieldValues>) => void = () => {
		return;
	},
	onError: (error: AxiosError<FieldValues>) => void = () => {
		return;
	}
) => {
	const router = useRouter();
	const setOnboardingState = useUserStore((s) => s.setOnboardingState);
	const setUser = useUserStore((s) => s.setUser);
	// const apiClient = new APIClient<{ data: User }, FormData>(
	// 	"/my-business/update"
	// );

	return useMutation<
		AxiosResponse<FieldValues>,
		AxiosError<FieldValues>,
		FieldValues
	>({
		mutationFn: APIVersion1UpdateBusinessDetails,
		onSuccess: (data) => {
			onSuccess(data);
			setUser({ business: data.data } as User);
			setOnboardingState(1);
			router.push("/onboarding/add-location");
		},
		onError: (error) => {
			onError(error);

			if (error.response?.data?.message) {
				toast.success(error.response?.data?.message, {
					duration: 3000,
				});
				router.push("/onboarding/add-location");
			}
		},
	});
};

export const AddBusinessLocationSlice = (
	onSuccess?: (data: AddBusinessLocationResponseType) => void,
	onError?: (error: AxiosError) => void
): UseMutationResult<AddBusinessLocationResponseType, AxiosError, FormData> => {
	const queryClient = useQueryClient();
	const customToast = useCustomToast();

	return useMutation<
		AddBusinessLocationResponseType,
		AxiosError<ErrorResponse>,
		FormData
	>({
		mutationFn: APIVersion2AddLocation,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["get-locations"] });
			onSuccess?.(data);
			customToast(data?.message || "Location added successfully", {
				id: "add-location",
				type: "success",
			});
		},

		onError: (error: AxiosError<ErrorResponse>) => {
			customToast("An error occured", {
				id: "add-location",
				type: "error",
			});
			// displayErrorsWithTimeout(error.response.data, customToast, {

			onError?.(error);
		},
	});
};

export const useAddBusinessLocation = (
	onSuccess: (data: { location: Location }) => void = () => {
		return;
	},
	onError: (error: AxiosError) => void = () => {
		return;
	},
	slots: OperatingHour[]
) => {
	const router = useRouter();
	const customToast = useCustomToast();
	const setOnboardingState = useUserStore((s) => s.setOnboardingState);
	const setOnboardingLocationInfo = useUserStore(
		(s) => s.setOnboardingLocationInfo
	);

	return useMutation<
		{ location: Location },
		AxiosError<any>,
		AddLocationType
	>({
		mutationFn: APIVersion1AddBusinessLocation,
		onSuccess: (data: { location: Location }) => {
			onSuccess(data);

			setOnboardingLocationInfo({
				id: data.location.id,
				approximate_waiting_time:
					data.location.approximate_waiting_time ?? "00:15:00",
				schedule_block_in_min:
					data.location.schedule_block_in_min ?? 15,
				time_zone: data.location.time_zone ?? "",
				time_slots: slots,
			});
			setOnboardingState(2);
			setTimeout(() => {
				router.push("/onboarding/add-payment-method");
			}, 1000);
		},
		onError: (error) => {
			if (error.status === 403) {
				customToast("Session expired", {
					id: "onboarding",
					type: "error",
				});
				router.replace("/sign-up");
				return;
			}

			if (error.response?.data?.errors.name[0]) {
				customToast(error.response?.data?.errors.name[0], {
					id: "update-business-schedule",
					type: "error",
				});

				setOnboardingState(2);
				setTimeout(() => {
					router.push("/onboarding/add-payment-method");
				}, 1000);
				return;
			}
			toast.error("An error occured kindly try again");
			onError(error);
		},
	});
};

export const useUpdateBusinessLocation = (
	onSuccess: (data: AxiosResponse<{ location: Location }>) => void = () => {
		return;
	},
	onError: (error: AxiosError) => void = () => {
		return;
	},
	slots: OperatingHour[]
) => {
	const router = useRouter();
	const customToast = useCustomToast();
	const setOnboardingState = useUserStore((s) => s.setOnboardingState);
	const setOnboardingLocationInfo = useUserStore(
		(s) => s.setOnboardingLocationInfo
	);
	const onboardingLocationInfo = useUserStore(
		(s) => s.onboardingLocationInfo
	);

	return useMutation<any, AxiosError<any>, any>({
		mutationFn: (data) =>
			APIVersion1UpdateBusinessLocation(
				data,
				"/my-business/locations/" +
					onboardingLocationInfo?.id +
					"/update"
			),
		onSuccess: (data: any) => {
			onSuccess(data);
			setOnboardingLocationInfo({
				id: data.location.id,
				approximate_waiting_time:
					data.location.approximate_waiting_time,
				schedule_block_in_min: data.location.schedule_block_in_min,
				time_zone: data.location.time_zone,
				time_slots: slots,
			});
			setOnboardingState(2);

			customToast("Business schedule updated!", {
				id: "update-business-schedule",
			});
			router.push("/onboarding/add-payment-method");
		},
		onError: (error: AxiosError<any>) => {
			if (error.status === 403) {
				customToast("Session expired", {
					id: "update-business-schedule",
					type: "error",
				});
				router.replace("/sign-up");
				return;
			}

			if (error.response?.data?.errors.name[0]) {
				customToast(error.response?.data?.errors.name[0], {
					id: "update-business-schedule",
					type: "error",
				});
				setOnboardingState(2);
				setTimeout(() => {
					router.push("/onboarding/add-payment-method");
				}, 1000);
				return;
			}
			toast.error("An error occured kindly try again");
			onError(error);
		},
	});
};

export const useUpdateSpacesOperatingHours = (
	onSuccess: (data: AxiosResponse<{ location: Location }>) => void = () => {
		return;
	},
	onError: (error: AxiosError) => void = () => {
		return;
	}
	// slots: OperatingHour[]
) => {
	const router = useRouter();
	const setOnboardingState = useUserStore((s) => s.setOnboardingState);
	const customToast = useCustomToast();
	// const setOnboardingLocationInfo = useUserStore(
	// 	(s) => s.setOnboardingLocationInfo
	// );
	const user = useUserStore((s) => s.user);

	return useMutation<any, AxiosError<any>, any>({
		mutationFn: (data) =>
			APIVersion1UpdateSpacesBusinessLocation(
				data,
				"room_booking/business/" +
					user?.business_id +
					"/locations/" +
					user?.business.room_booking_locations[0].id +
					"/working-hours"
			),
		onSuccess: (data: any) => {
			onSuccess(data);
			setOnboardingState(2);
			customToast("Business Working Hours updated!", {
				id: "update-business-schedule",
			});
			router.push("/onboarding/add-payment-method");
		},
		onError: (error: AxiosError<any>) => {
			if (error.status === 403) {
				customToast("Session expired", {
					id: "update-business-schedule",
					type: "error",
				});
				router.replace("/sign-up");
				return;
			}

			if (error.response?.data?.errors.name[0]) {
				customToast(error.response?.data?.errors.name[0], {
					duration: 3000,
					id: "update-business-schedule",
					type: "error",
				});
				setOnboardingState(2);
				setTimeout(() => {
					router.push("/onboarding/add-payment-method");
				}, 1000);
				return;
			}
			customToast("An error occured kindly try again", {
				id: "update-business-schedule",
				type: "error",
			});
			onError(error);
		},
	});
};

export const useAddBusinessCard = (
	onSuccess: (data: AxiosResponse) => void = () => {
		return;
	},
	onError: (error: AxiosError<any>) => void = () => {
		return;
	}
) => {
	const router = useRouter();
	const customToast = useCustomToast();
	const setOnboardingState = useUserStore((s) => s.setOnboardingState);

	return useMutation<AxiosResponse, AxiosError<any>, AddBusinessCardData>({
		mutationFn: APIVersion1AddBusinessCard,
		onSuccess: (data: AxiosResponse) => {
			onSuccess(data);
			setOnboardingState(3);
			const productType = localStorage.getItem("product_type");
			if (productType === "room_booking")
				window.location.href = "https://spaces.migranium.com/";
			else if (productType === "primary") {
				window.location.href = "https://admin.migranium.com/";
			}
		},
		onError: (error) => {
			onError(error);
			if (error.status === 403) {
				customToast("Session expired", {
					id: "add-card",
					type: "error",
				});
				router.replace("/sign-up");
				return;
			}
			if (typeof error.response?.data.error === "string") {
				customToast(error.response?.data.error, {
					id: "add-card",
				});
				return;
			}

			customToast("An error occured kindly try again", {
				id: "add-card",
			});
		},
	});
};

export const useUpdateBusinessCard = (
	onSuccess: (data: AxiosResponse) => void = () => {
		return;
	},
	onError: (error: AxiosError) => void = () => {
		return;
	}
) => {
	const customToast = useCustomToast();
	return useMutation<any, AxiosError, UpdateBusinessCardData>({
		onSuccess: (data: AxiosResponse) => {
			onSuccess(data);
		},
		onError: (error: AxiosError<any>) => {
			onError(error);
			if (typeof error.response?.data.error === "string") {
				customToast(error.response?.data.error, {
					id: "add-card",
				});

				return;
			}

			customToast("An error occured kindly try again", {
				id: "add-card",
			});
		},
	});
};
