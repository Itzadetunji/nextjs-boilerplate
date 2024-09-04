import {
	AddBusinessCardData,
	AddBusinessInfoData,
	AddLocationType,
} from "@/types/onboarding";
import { BusinessCategory, Location, SignUpType, User } from "@/types/signup";
import { AxiosResponse } from "axios";
import { FieldValues } from "react-hook-form";
import $http from "../xhr";

export const APIVersion1Register = async (
	data: SignUpType
): Promise<
	AxiosResponse<{
		status: boolean;
		message: string;
		user: User;
		token: string;
	}>
> => $http.post(`/register`, data);

export const APIVersion1GoogleRegister = async (data: {
	token: string;
}): Promise<
	AxiosResponse<{
		status: boolean;
		message: string;
		user: User;
		token: string;
	}>
> => $http.post(`/sign-up-with-google`, data);

export const APIVersion1GetUserInformation = async (): Promise<
	AxiosResponse<User>
> => $http.get(`/user-information`).then((res) => res.data);

//Onboarding
export const APIVersion1GetBusinessInformation = async (): Promise<
	AxiosResponse<Record<string, string>>
> => $http.get(`/my-business`).then((res) => res.data);

export const APIVersion1GetSubscriptionPlans = async (): Promise<
	AxiosResponse<Record<string, string>>
> => $http.get(`/subscription-plans`).then((res) => res.data);

export const APIVersion1GetBusinessCategories = async (): Promise<
	AxiosResponse<BusinessCategory[]>
> => $http.get(`/business-categories`).then((res) => res.data);

export const APIVersion1AddBusinessDetails = async (
	data: FieldValues
): Promise<AxiosResponse<FieldValues>> =>
	$http
		.post("/my-business/add", data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
		.then((res) => res.data);

export const APIVersion1UpdateBusinessDetails = async (
	data: FieldValues
): Promise<AxiosResponse<FieldValues>> =>
	$http.post("/my-business/update", data).then((res) => res.data);

export const APIVersion1AddBusinessLocation = async (
	data: AddLocationType
): Promise<{ location: Location }> =>
	$http.post("/my-business/locations/add", data).then((res) => res.data);

export const APIVersion1UpdateBusinessLocation = async (
	data: AddLocationType,
	route: string
): Promise<AxiosResponse<{ location: Location }>> =>
	$http.post(route, data).then((res) => res.data);

export const APIVersion1UpdateSpacesBusinessLocation = async (
	data: AddLocationType,
	route: string
): Promise<AxiosResponse<{ location: Location }>> =>
	$http.post(route, data).then((res) => res.data);

export const APIVersion1AddBusinessCard = async (
	data: AddBusinessCardData
): Promise<AxiosResponse> =>
	$http
		.post("/my-business/subscription/subscribe", data)
		.then((res) => res.data);

export const APIVersion1SubscribeVisitor = async (
	data: FieldValues
): Promise<AxiosResponse<Record<string, string>>> =>
	$http.post("/subscription-emails/add", data).then((res) => res.data);

export const APIVersion1ContactUs = async (
	data: FieldValues
): Promise<AxiosResponse<Record<string, string>>> =>
	$http.post("/admin/customercontacts", data).then((res) => res.data);
