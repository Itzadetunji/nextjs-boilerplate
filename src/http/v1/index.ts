import { AxiosResponse } from "axios";
import $http from "../xhr";
import { FieldValues } from "react-hook-form";

export const APIVersion1Register = async (
	data: Record<string, string>
): Promise<AxiosResponse<Record<string, string>>> =>
	$http.post(`/v1/auth/register`, data);

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
