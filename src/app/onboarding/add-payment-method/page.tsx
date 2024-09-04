"use client";

import useCustomToast from "@/components/CustomToast";
import RequestIsLoading from "@/components/RequestIsLoading";
import { LoaderButton } from "@/components/ui-extended/loader-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetUserInformationMutation } from "@/store/slices/auth";
import { useAddBusinessCard } from "@/store/slices/onboarding";
import {
	AddBusinessCardData,
	AddBusinessCardSchema,
	SubscriptionPlan,
} from "@/types/onboarding";
import { formatInputToExpirationDate } from "@/utils/date";
import { formatCreditCard } from "@/utils/general";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { NextPage } from "next";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { PiCreditCard } from "react-icons/pi";

const AddPaymentMethod: NextPage = () => {
	const {
		handleSubmit,
		setValue,
		getValues,
		register,
		setError,
		watch,
		formState: { errors, isValid },
	} = useForm<AddBusinessCardData>({
		resolver: zodResolver(AddBusinessCardSchema),
		defaultValues: {
			price_id: "",
			payment_information: {
				type: "card",
				card: {
					number: "",
					exp_month: 0,
					exp_year: 0,
					cvc: "",
				},
			},
		},
	});

	const queryClient = useQueryClient();
	const customToast = useCustomToast();

	const addBusinessCardMutation = useAddBusinessCard(
		() => {
			customToast("Payment method added successfully", {
				id: "add-card",
				type: "success",
			});
			setTimeout(() => {
				getUserMutation.mutate();
			}, 300);
		},
		(error) => {
			setError("payment_information.card.number", {
				message: error?.response?.data?.error,
			});
		}
	);

	const getUserMutation = useGetUserInformationMutation(() => {
		customToast("An error occured kindly try again later", {
			id: "get-user-information",
			type: "error",
		});
	});

	const handleAddCard: SubmitHandler<AddBusinessCardData> = async () => {
		const subscriptionPlansData = queryClient.getQueryData([
			"subscription-plans",
		]) as { data: SubscriptionPlan[] };
		const priceId = subscriptionPlansData.data.find(
			(plan: SubscriptionPlan) => plan.price === 0
		)?.default_price.price_id;
		setValue("price_id", priceId ?? "");

		addBusinessCardMutation.mutate({
			payment_information: {
				card: { ...getValues().payment_information.card },
				type: getValues().payment_information.type,
			},
			price_id: getValues().price_id,
		});
	};

	const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		const formattedValue = formatCreditCard(inputValue);
		setValue("payment_information.card.number", formattedValue);
	};

	return (
		<form
			className="flex h-fit max-h-fit w-full max-w-[656px] flex-col space-y-4 rounded-[10px] bg-white shadow-[0px_20px_25px_-5px_rgba(16,24,40,0.10),0px_8px_10px_-6px_rgba(16,24,40,0.10)]"
			onSubmit={handleSubmit(handleAddCard)}
		>
			<p className="px-8 py-3 text-[22px] font-semibold text-[#323539]">
				Add your card details
			</p>
			<div className="flex flex-col space-y-7 px-8">
				<div className="space-y-1.5">
					<Label className="text-[#323539]">
						Name on card <span className="text-red-500">*</span>
					</Label>
					<Input
						maxLength={40}
						{...register("payment_information.name")}
					/>
					{errors?.payment_information?.name?.message && (
						<small className="mt-1.5 text-sm text-red-500">
							{errors?.payment_information.name?.message}
						</small>
					)}
				</div>
				<div className="">
					<Label className="text-[#323539]">
						Debit / Credit Card{" "}
						<span className="text-red-500">*</span>
					</Label>
					<div
						className={`flex items-center rounded-md border ${errors?.payment_information?.card?.number?.message ? "border-red-500" : "border-[#E5E5E7]"} `}
					>
						<PiCreditCard
							className="mx-3.5"
							size={18}
							fill="#195388"
						/>
						<div className="flex flex-1 space-x-4">
							<Input
								placeholder="Card Number"
								className="rounded-none border-0 border-l px-3 py-2 text-[#323539] placeholder:text-[#323539]/50 focus:shadow-none"
								value={watch("payment_information.card.number")}
								inputMode="numeric"
								{...register(
									"payment_information.card.number",
									{
										onChange(event) {
											handleCardNumberChange(event);
										},
									}
								)}
							/>
							<Input
								placeholder="MM/YY"
								className="w-[50px] max-w-fit border-none px-0 text-center placeholder:text-center placeholder:text-sm"
								maxLength={5}
								inputMode="numeric"
								onChange={(e) => {
									setValue(
										"payment_information.card.exp_month",
										+formatInputToExpirationDate(e).slice(
											0,
											2
										)
									);
									setValue(
										"payment_information.card.exp_year",
										+formatInputToExpirationDate(e).slice(3)
									);
								}}
							/>

							<Input
								placeholder="CVC"
								className="w-[50px] max-w-fit rounded-r-[10px] border-none px-0 text-center placeholder:text-center placeholder:text-sm"
								inputMode="numeric"
								maxLength={3}
								onChange={(e) => {
									setValue(
										"payment_information.card.cvc",
										e.target.value
									);
								}}
							/>
						</div>
					</div>
					{(errors.payment_information?.card?.number?.message ||
						errors.payment_information?.card?.exp_month?.message ||
						errors.payment_information?.card?.exp_year?.message ||
						errors.payment_information?.card?.cvc?.message) && (
						<p
							className={`mt-1.5 text-sm tracking-[-0.1px] text-red-500`}
						>
							{errors.payment_information?.card?.number?.message
								? errors.payment_information?.card?.number
										?.message
								: errors.payment_information?.card?.exp_month
											?.message
									? errors.payment_information?.card
											?.exp_month?.message
									: errors.payment_information?.card?.exp_year
												?.message
										? errors.payment_information?.card
												?.exp_year?.message
										: errors.payment_information?.card?.cvc
												?.message &&
											errors.payment_information?.card
												?.cvc?.message}
						</p>
					)}
				</div>
				<div className="flex flex-col space-y-1.5">
					<div className="space-y-1.5">
						<Label className="text-[#323539]">
							Zip Code <span className="text-red-500">*</span>
						</Label>
						<Input
							className="block max-w-[195px]"
							value={watch("payment_information.zipCode")}
							maxLength={10}
							{...register("payment_information.zipCode", {
								onChange(event) {
									setValue(
										"payment_information.zipCode",
										event.target.value.replace(/\D/g, "")
									);
								},
							})}
						/>
					</div>
					{errors.payment_information?.zipCode && (
						<small className="mt-1.5 text-sm text-red-500">
							{errors.payment_information?.zipCode?.message}
						</small>
					)}
				</div>
			</div>
			<div className="flex flex-row-reverse items-center justify-start gap-x-8 rounded-b-[10px] bg-[#FAFBFC] px-8 py-4">
				<LoaderButton
					disabled={addBusinessCardMutation.isPending || !isValid}
					loading={addBusinessCardMutation.isPending}
					loaderSize={20}
					type="submit"
					className="relative h-10 max-w-[103px] flex-1 cursor-pointer font-semibold text-white duration-200 ease-in-out disabled:cursor-not-allowed"
				>
					Finish
				</LoaderButton>

				<Button
					disabled={
						addBusinessCardMutation.isPending ||
						getUserMutation.isPending
					}
					className="flex w-[103px] px-0 font-semibold leading-[22px] text-[#323539]"
					onClick={() => {
						getUserMutation.mutate();
					}}
					variant="ghost"
					type="button"
				>
					Skip for now
				</Button>
			</div>
			<RequestIsLoading
				isWhite
				isLoading={getUserMutation.isPending}
				size={20}
			/>
		</form>
	);
};
export default AddPaymentMethod;
