import { ContactUsSlice } from "@/store/slices/contact-us";
import { countryCodes, InputPatterns } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CiCircleInfo } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { z } from "zod";
import useCustomToast from "./CustomToast";
import Checkbox from "./ui-extended/checkbox";
import { LoaderButton } from "./ui-extended/loader-button";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

const contactUsFormSchema = z.object({
	name: z.string().min(4, { message: "Name must be at least 4 characters" }),
	email: z
		.string()
		.min(3, { message: "Email address is required" })
		.regex(InputPatterns.email, { message: "Invalid email address" }),
	phone: z
		.string()
		.min(10, { message: "Phone number must be at least 10 characters" })
		.refine((value) => /^[0-9]+$/.test(value), {
			message: "Phone number must only contain numbers 0-9",
		}),
	message: z
		.string()
		.min(10, { message: "Message must be at least 10 characters" }),
	agreeToTerms: z.boolean().refine((value) => value === true, {
		message: "You must agree to the terms and conditions",
	}),
});

const ContactUsModal: React.FC<{
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ show, setShow }) => {
	const {
		register,
		handleSubmit,
		setError,
		reset,
		watch,
		setValue,
		formState: { errors },
	} = useForm<z.infer<typeof contactUsFormSchema>>({
		resolver: zodResolver(contactUsFormSchema),
	});

	const [isChecked, setIsChecked] = useState(false);
	const [countryCode, setCountryCode] = useState("+1");
	const customToast = useCustomToast();

	const contactUsMutaion = ContactUsSlice(
		() => {
			setShow(false);
			setTimeout(() => {
				customToast("Message sent 😁, you would here from us soon", {
					id: "contact-us",
					type: "success",
					duration: 5000,
				});
				reset();
			}, 1500);
		},
		() => {
			customToast("An error occured kindly try again later", {
				id: "contact-us",
				type: "error",
				duration: 5000,
			});
		}
	);

	const onSubmit: SubmitHandler<z.infer<typeof contactUsFormSchema>> = async (
		data
	) => {
		try {
			customToast("Sending message...", {
				id: "contact-us",
				type: "loading",
			});
			contactUsMutaion.mutate({
				name: data.name,
				email: data.email,
				phone: countryCode + data.phone,
				subject: data.message,
				message: data.message,
			});
		} catch (error) {
			setError("root", {
				message: "An error occured kindly try again later",
			});
		}
	};

	return (
		<Dialog open={show} onOpenChange={setShow}>
			<DialogContent className="max-w-[886px]">
				<form
					className="relative flex w-full flex-col items-center space-y-6"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="flex w-full items-center justify-between">
						<CiCircleInfo className="fill-[#323539]" size={32} />

						<figure
							className="cursor-pointer rounded-full p-2 duration-300 ease-in-out hover:bg-black hover:bg-opacity-10"
							onClick={() => setShow(false)}
						>
							<IoClose className="fill-[#858C95]" size={24} />
						</figure>
					</div>
					<DialogTitle className="flex flex-col space-y-2">
						<h4 className="text-xl font-medium tracking-[-1%] text-[#323539]">
							Get in Touch with Us
						</h4>
						<p className="text-[18px] leading-[24px] tracking-[-1%] text-[#858C95]">
							Got questions or need more information? We are here
							and happy to help! Please leave a message and we
							will get back to you shortly.
						</p>
					</DialogTitle>
					<div className="w-full flex-col space-y-6">
						<div className="flex w-full items-start justify-between sm:space-x-4 msm:flex-col msm:space-y-4">
							<div className="flex-1 space-y-1.5">
								<Label className="text-[#323539]">
									Full Name{" "}
									<span className="text-red-500">*</span>
								</Label>
								<Input
									className="border border-[#E4E4E7]"
									{...register("name")}
								/>
								{errors.name?.message && (
									<p className="mt-1.5 text-sm text-red-500">
										{errors.name?.message}
									</p>
								)}
							</div>

							<div className="flex-1 space-y-1.5">
								<Label className="text-[#323539]">
									Email Address{" "}
									<span className="text-red-500">*</span>
								</Label>
								<Input
									className="border border-[#E4E4E7]"
									{...register("email")}
								/>
								{errors.email?.message && (
									<p className="mt-1.5 text-sm text-red-500">
										{errors.email?.message}
									</p>
								)}
							</div>
							<div>
								<div className="flex-1 space-y-1.5">
									<Label className="text-[#323539]">
										Phone Number
									</Label>
									<div className="flex">
										<Select
											value={countryCode}
											onValueChange={(value) => {
												setCountryCode(value);
											}}
										>
											<SelectTrigger className="w-fit rounded-r-none border-r-transparent">
												<SelectValue
													className="text-[#858C95]"
													placeholder="+1"
												/>
											</SelectTrigger>
											<SelectContent className="!z-[9999]">
												<SelectGroup>
													<SelectLabel className="px-2">
														Country Codes
													</SelectLabel>

													{countryCodes.map(
														(option) => {
															return (
																<SelectItem
																	key={
																		option.value
																	}
																	value={
																		option.value
																	}
																	className="px-8"
																>
																	{
																		option.label
																	}
																</SelectItem>
															);
														}
													)}
												</SelectGroup>
											</SelectContent>
										</Select>
										<Input
											className="rounded-l-none border border-[#E4E4E7]"
											minLength={11}
											maxLength={11}
											{...register("phone", {
												minLength: 10,
												maxLength: 11,
											})}
										/>
									</div>
								</div>
								{errors.phone?.message && (
									<p className="mt-1.5 text-sm text-red-500">
										{errors.phone?.message}
									</p>
								)}
							</div>
						</div>

						<div className="space-y-1.5">
							<Label className="text-[#323539]">
								Message <span className="text-red-500">*</span>
							</Label>
							<Textarea
								className="h-[124px] min-h-[75px] border border-[#E4E4E7]"
								{...register("message")}
							/>
							{errors.message?.message && (
								<p className="mt-1.5 text-sm text-red-500">
									{errors.message?.message}
								</p>
							)}
						</div>

						<div>
							<div
								className="flex items-center space-x-3 self-start"
								onClick={() => {
									setIsChecked(!isChecked);
								}}
							>
								<Checkbox
									id={"check"}
									isChecked={watch("agreeToTerms")}
									handleCheckboxChange={() =>
										setValue("agreeToTerms", !isChecked)
									}
									{...register("agreeToTerms")}
								/>
								<label className="font-medium text-[#323539]">
									I agree with Migranium{" "}
									<Link
										href={"/privacy-policy"}
										className="text-[#053969] underline"
									>
										Privacy Policy
									</Link>
								</label>
							</div>
							{errors.agreeToTerms?.message ||
								(errors.root?.message && (
									<p className="mt-1.5 text-sm text-red-500">
										{errors.agreeToTerms?.message ??
											errors.root?.message}
									</p>
								))}
						</div>
					</div>
					<LoaderButton
						disabled={contactUsMutaion.isPending}
						loading={contactUsMutaion.isPending}
						loaderSize={20}
						className="relative h-[46px] w-full self-end bg-[#053969] text-base font-semibold text-white duration-200 ease-in-out hover:bg-[#72F4E8] hover:text-[#053969] sm:max-w-[144px]"
						type="submit"
					>
						Send Message
					</LoaderButton>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default ContactUsModal;
