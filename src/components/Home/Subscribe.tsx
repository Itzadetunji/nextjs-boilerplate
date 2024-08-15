import { SubscribeVisitorSlice } from "@/store/slices/subscribe";
import { InputPatterns } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import useCustomToast from "../CustomToast";
import { LoaderButton } from "../ui-extended/loader-button";
import { Input } from "../ui/input";
// import Loader from "../../Loader/Loader";
// import { InputPatterns } from "../../../util/Constants";

const subscribeFormSchema = z.object({
	email: z
		.string()
		.min(3, { message: "Email address is required" })
		.regex(InputPatterns.email, { message: "Invalid email address" }),
});

const Subscribe: React.FC = () => {
	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors },
	} = useForm<z.infer<typeof subscribeFormSchema>>({
		resolver: zodResolver(subscribeFormSchema),
	});

	const subscribeVisitor = SubscribeVisitorSlice(
		() => reset(),
		() =>
			customToast("An error occured, kindly try it again", {
				id: "subscribe-email",
			})
	);

	const customToast = useCustomToast();

	const onSubmit: SubmitHandler<z.infer<typeof subscribeFormSchema>> = async (
		data
	) => {
		try {
			subscribeVisitor.mutate(data);
		} catch (error) {
			setError("email", {
				message: "An error occured kindly try again later",
			});
		}
	};

	return (
		<section className="flex w-full items-center justify-center bg-[#F7F7F7]">
			<div className="flex w-full max-w-[1216px] items-center justify-between px-4 py-10 md:space-x-5 md:py-12 mmd:flex-col mmd:space-y-6">
				<div className="flex flex-col self-start mmd:space-y-4">
					<h3 className="text-[28px] font-bold leading-[36px] tracking-[-1.5%] text-[#323539]">
						Subscribe to Migranium
					</h3>
					<p className="text-[#858C95]">For updates and insights.</p>
				</div>
				<div className="w-full flex-1 md:max-w-[570px]">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-1 md:max-w-[570px] mmd:flex-col mmd:space-y-4"
					>
						<div className="w-full">
							<Input
								type="email"
								placeholder="Enter your email"
								className="border-r-none h-[46px] w-full rounded-r-none border border-[#E5E5E7] bg-white px-4 text-[#323539] placeholder:text-[#858C95] md:rounded-l-md mmd:rounded-md"
								{...register("email")}
							/>
							{errors.email && errors?.email?.message?.length && (
								<small className="mt-1.5 text-sm leading-[16px] text-red-500">
									{errors.email.message}
								</small>
							)}
						</div>
						<LoaderButton
							type="submit"
							disabled={subscribeVisitor.isPending}
							className="relative flex h-[46px] items-center justify-center rounded-none bg-[#043B6D] px-5 text-base font-medium text-white ease-in-out hover:text-[#72F4E8] md:rounded-r-md mmd:rounded-md"
							loading={subscribeVisitor.isPending}
							loaderSize={22}
						>
							Subscribe
						</LoaderButton>
					</form>
					{subscribeVisitor.isSuccess && (
						<p className="text-[#48AA75]">
							Thank you for subscribing. Please check your email
							for regular updates!
						</p>
					)}
				</div>
			</div>
		</section>
	);
};

export default Subscribe;
