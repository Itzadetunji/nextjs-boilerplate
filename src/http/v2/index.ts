import { AddBusinessLocationResponseType } from "@/types/location";
import $http from "../xhr";

export const APIVersion2AddLocation = async (
	data: FormData
): Promise<AddBusinessLocationResponseType> =>
	$http.post("/v2/my-business/locations/add", data);
