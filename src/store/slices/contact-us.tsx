import { APIVersion1SubscribeVisitor } from "@/http/v1";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const ContactUsSlice = (
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
		mutationFn: APIVersion1SubscribeVisitor,
		onSuccess,
		onError,
	});
};
