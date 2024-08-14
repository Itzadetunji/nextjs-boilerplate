import { AxiosResponse } from "axios";
import $http from "../xhr";

export const APIVersion1Register = async (
	data: Record<string, string>
): Promise<AxiosResponse<Record<string, string>>> =>
	$http.post(`/v1/auth/register`, data);

export const APIVersion1GetRequest = async (): Promise<
	AxiosResponse<Record<string, string>>
> => $http.get(`/v1/auth/get/`).then((res) => res.data);
