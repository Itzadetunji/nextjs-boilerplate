import { AxiosResponse } from "axios";
import $http from "../xhr";
import { FieldValues } from "react-hook-form";
import { SignUpType, User } from "@/types/signup";

export const APIVersion1Register = async (
	data: SignUpType
): Promise<AxiosResponse<User>> => $http.post(`/register`, data);

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

export const APIVersion1GetRequest = async (): Promise<
	AxiosResponse<Record<string, string>>
> => $http.get(`/v1/auth/get/`).then((res) => res.data);

export const APIVersion1SubscribeVisitor = async (
	data: FieldValues
): Promise<AxiosResponse<Record<string, string>>> =>
	$http.post("/subscription-emails/add", data).then((res) => res.data);

export const APIVersion1ContactUs = async (
	data: FieldValues
): Promise<AxiosResponse<Record<string, string>>> =>
	$http.post("/admin/customercontacts", data).then((res) => res.data);
