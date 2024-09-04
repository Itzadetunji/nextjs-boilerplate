"use client";

import { LoaderButton } from "@/components/ui-extended/loader-button";
import { SearchableSelect } from "@/components/ui-extended/searchable-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	findCountryByLabel,
	findProvinceByLabel,
	useAddressAutocomplete,
} from "@/hooks/useAddressAutoComplete";
import { cn } from "@/lib/utils";
import {
	useAddBusiness,
	useGetBusinessCategories,
	useUpdateBusiness,
} from "@/store/slices/onboarding";
import useUserStore from "@/store/useUserStore";
import { AddBusinessInfoData, AddBusinessInfoSchema } from "@/types/onboarding";
import {
	countryCodes,
	countryOptions,
	ProductTypeOptions,
} from "@/utils/constants";
import {
	changeCountry,
	findCountry,
	findState,
	updateCountryAndState,
} from "@/utils/general";
import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const AboutBusiness: NextPage = () => {
	const user = useUserStore((s) => s.user);
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		watch,
		trigger,
		formState: { errors, isValid },
	} = useForm<AddBusinessInfoData | FieldValues>({
		resolver: zodResolver(AddBusinessInfoSchema),
		mode: "all",
		reValidateMode: "onChange",
		defaultValues: {
			name: user?.business?.name ?? "",
			address: user?.business?.address ?? "",
			country: "",
			state: "",
			city: user?.business?.city,
			phone_number: user?.business?.phone_number?.slice(-10) ?? undefined,
			zip_code: user?.business?.zip_code,
			business_category_id:
				user?.business?.business_category_id?.toString() ?? "0",
			product_type: "primary",
			logo: null,
		},
	});

	const [countryCode, setCountryCode] = useState("+1");
	const [logoFile, setLogoFile] = useState<null | File>(null);

	const businessCategoriesQuery = useGetBusinessCategories();

	const addBusinessMutation = useAddBusiness();
	const updateBusinessMutation = useUpdateBusiness();

	const [provinceOptions, setProvinceOptions] = useState<
		{
			label: string;
			value: string;
		}[]
	>([]);

	const logoRef: any | null = useRef(null);

	const addressAutocomplete = useAddressAutocomplete(
		(address, city, province, country, postalCode) => {
			setValue("address", address);
			setValue("city", city);
			setValue("state", province);
			setValue("country", country);
			setValue("zip_code", postalCode);

			// console.log({ address, city, province, country, postalCode });

			const countryValue = findCountryByLabel(country);

			const newProvinceOptions = changeCountry(countryValue);
			setProvinceOptions(newProvinceOptions);

			const newProvince = findProvinceByLabel(
				newProvinceOptions,
				province
			);
			updateCountryAndState(
				setValue,
				setProvinceOptions,
				true,
				newProvince,
				countryValue
			);
		}
	);

	const handleFileChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		if (event && event.target) {
			const files: FileList | null = event.target.files;
			if (files && files.length > 0) {
				const file = files[0];
				setValue("logo", file);
				setLogoFile(file);
			}
		}
	};

	const handleAddBusiness: SubmitHandler<
		AddBusinessInfoData | FieldValues
	> = (data) => {
		const updatedPhoneNumber =
			countryCode === "+1" && data.phone_number?.length === 0
				? ""
				: countryCode + data.phone_number;

		const updatedCountry = findCountry(data.country || "");
		const updatedState = findState(data.state || "", data.country || "");

		const newFormData = new FormData();
		newFormData.append("name", data.name);
		newFormData.append("address", data.address);
		newFormData.append("country", updatedCountry);
		newFormData.append("state", updatedState);
		newFormData.append("city", data.city ?? "");
		newFormData.append("phone_number", updatedPhoneNumber);
		newFormData.append("zip_code", data.zip_code);
		newFormData.append("product_type", data.product_type);
		localStorage.setItem("product_type", data.product_type);
		newFormData.append(
			"business_category_id",
			data.business_category_id.toString()
		);

		if (data.logo) newFormData.append("logo", data.logo);
		console.log(user?.business);
		if (user?.business) updateBusinessMutation.mutate(newFormData);
		else addBusinessMutation.mutate(newFormData);
	};

	const updateBusinessCheckThenUpdateFields = () => {
		if (user?.business) {
			// console.log("dewd");
			// setValue("name", user?.business?.name ?? "");
			// setValue("address", user?.business.address ?? "");
			const countryValue = findCountryByLabel(
				user?.business?.country ?? ""
			);
			const newProvinceOptions = changeCountry(countryValue);

			const newProvince = findProvinceByLabel(
				newProvinceOptions,
				user?.business.state ?? ""
			);

			updateCountryAndState(
				setValue,
				setProvinceOptions,
				true,
				newProvince,
				countryValue
			);

			console.log(user?.business?.business_category_id);
			// setValue(
			// 	"business_category_id",
			// 	user?.business?.business_category_id?.toString()
			// );
			setCountryCode(user?.business.phone_number?.slice(0, -10) ?? "+1");
			trigger();
		} else {
			updateCountryAndState(
				setValue,
				setProvinceOptions,
				true,
				"ON",
				"CA"
			);
		}
	};

	useEffect(() => {
		updateBusinessCheckThenUpdateFields();
	}, []);
	// console.log(user?.business.business_category_id?.toString())
	return (
		<form
			className="relative flex h-fit max-h-fit w-full max-w-[656px] flex-col space-y-4 rounded-[10px] bg-white shadow-[0px_10px_15px_-3px_rgba(16,24,40,0,1)]"
			encType="multipart/form-data"
			onSubmit={handleSubmit(handleAddBusiness)}
		>
			<p className="px-8 py-3 text-[22px] font-semibold text-[#323539]">
				Tell us about your business
			</p>
			<div className="flex flex-col space-y-7 px-8">
				<div className="space-y-1.5">
					<Label className="text-[#323539]">
						Business Name <span className="text-red-500">*</span>
					</Label>
					<Input {...register("name")} />
					{errors.name?.message && (
						<small className="mt-1.5 text-sm text-red-500">
							{errors.name?.message as string}
						</small>
					)}
				</div>
				<div className="flex justify-between space-x-4">
					<div className="flex-1">
						<label className="bt-1.5 mb-1.5 block text-sm font-medium tracking-[-0.1px] text-[#323539]">
							Business Category{" "}
							<span className="text-red-500">*</span>
						</label>
						<div>
							<Select
								value={watch("business_category_id").toString()}
								onValueChange={(value) =>
									setValue("business_category_id", value)
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select" />
								</SelectTrigger>
								<SelectContent>
									{businessCategoriesQuery?.data?.data.map(
										(item) => (
											<SelectItem
												key={item.id}
												value={item.id.toString()}
											>
												{item.name}
											</SelectItem>
										)
									)}
								</SelectContent>
							</Select>
							{errors.business_category_id?.message && (
								<small className="mt-1.5 text-sm text-red-500">
									{
										errors.business_category_id
											?.message as string
									}
								</small>
							)}
						</div>
					</div>

					<div className="flex-1">
						<label className="bt-1.5 mb-1.5 block text-sm font-medium tracking-[-0.1px] text-[#323539]">
							Product
						</label>
						<Select
							value={watch("product_type")}
							onValueChange={(value) => {
								setValue("product_type", value);
								localStorage.setItem("product_type", value);
							}}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select" />
							</SelectTrigger>
							<SelectContent>
								{ProductTypeOptions.map((option) => (
									<SelectItem
										key={option.value}
										value={option.value}
									>
										{option.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
				<div className="flex w-full flex-col space-y-1.5 self-center">
					<Label className="font-medium tracking-[-0.1px] text-[#323539]">
						Phone Number
					</Label>
					<div className="flex max-w-[293px] items-stretch">
						<Select
							value={countryCode}
							onValueChange={(value) => setCountryCode(value)}
						>
							<SelectTrigger className="h-10 w-fit rounded-r-none border-r-transparent">
								<SelectValue placeholder="+1" />
							</SelectTrigger>
							<SelectContent>
								{countryCodes.map((option) => (
									<SelectItem
										key={option.value}
										value={option.value}
										className="px-8"
									>
										{option.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Input
							className="h-10 self-stretch rounded-l-none border border-[#E4E4E7] py-0"
							minLength={11}
							maxLength={11}
							{...register("phone_number", {
								minLength: 10,
								maxLength: 11,
							})}
						/>
					</div>
				</div>
				<div className="flex w-full flex-1 items-center space-x-7">
					<div className="flex flex-1 flex-col space-y-1.5">
						<Label className="text-[#323539]">
							Address Line <span className="text-red-500">*</span>
						</Label>

						<SearchableSelect
							options={addressAutocomplete.suggestions.map(
								(suggestion) => ({
									value: suggestion.description,
									label: suggestion.description,
								})
							)}
							value={{
								label: watch("address"),
								value: watch("address"),
							}}
							onTypingChange={(value) => {
								addressAutocomplete.handleSelectSuggestion(
									value
								);
								addressAutocomplete.setValue(value);
							}}
							onValueChange={(option) => {
								addressAutocomplete.handleSelectSuggestion(
									option.label
								);
							}}
							isLoading={addressAutocomplete.isLoading}
							emptyMessage={
								!addressAutocomplete.suggestions.length &&
								addressAutocomplete.value.length &&
								!addressAutocomplete.isLoading
									? "No address found"
									: "Enter an address"
							}
							autoComplete="new"
						/>
						{errors.address &&
							(errors?.address?.message as string)?.length && (
								<small className="text-sm leading-[16px] text-red-500">
									{errors.address.message as string}
								</small>
							)}
					</div>

					<div className="flex flex-1 flex-col space-y-1.5">
						<Label className="text-[#323539]">Zip Code</Label>

						<Input className="m-0" {...register("zip_code")} />
						{errors.zip_code?.message && (
							<small className="text-sm text-red-500">
								{errors.zip_code?.message as string}
							</small>
						)}
					</div>
				</div>
				<div className="flex items-center justify-between space-x-7">
					<div className="flex flex-1 flex-col space-y-1.5">
						<Label className="text-[#323539]">
							Country <span className="text-red-500">*</span>
						</Label>

						<Select
							value={watch("country")}
							onValueChange={(value) => {
								updateCountryAndState(
									setValue,
									setProvinceOptions,
									false,
									undefined,
									value
								);
							}}
						>
							<SelectTrigger className="shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
								<SelectValue className="text-[#858C95]" />
							</SelectTrigger>
							<SelectContent className="!z-[9999]">
								<SelectGroup>
									<SelectLabel className="px-2">
										Province
									</SelectLabel>

									{countryOptions.map((option) => {
										return (
											<SelectItem
												key={option.value}
												value={option.value}
												className="px-8"
											>
												{option.label}
											</SelectItem>
										);
									})}
								</SelectGroup>
							</SelectContent>
						</Select>
						{errors.country &&
							(errors.country.message as string)?.length && (
								<small className="mt-1.5 text-sm leading-[16px] text-red-500">
									{errors.country.message as string}
								</small>
							)}
					</div>
					<div className="flex flex-1 flex-col space-y-1.5">
						<Label className="text-[#323539]">
							State <span className="text-red-500">*</span>
						</Label>
						<Select
							value={watch("state")}
							onValueChange={(value) => {
								updateCountryAndState(
									setValue,
									setProvinceOptions,
									false,
									value,
									getValues("country")
								);
							}}
						>
							<SelectTrigger className="shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
								<SelectValue className="text-[#858C95]" />
							</SelectTrigger>
							<SelectContent className="!z-[9999]">
								<SelectGroup>
									<SelectLabel className="px-2">
										Province
									</SelectLabel>

									{provinceOptions.map((option) => {
										return (
											<SelectItem
												key={option.value}
												value={option.value}
												className="px-8"
											>
												{option.label}
											</SelectItem>
										);
									})}
								</SelectGroup>
							</SelectContent>
						</Select>
						{errors.state &&
							(errors.state.message as string)?.length && (
								<small className="mt-1.5 text-sm leading-[16px] text-red-500">
									{errors.state.message as string}
								</small>
							)}
					</div>
					<div className="flex flex-1 flex-col space-y-1.5">
						<Label className="text-[#323539]">
							City <span className="text-red-500">*</span>
						</Label>
						<Input
							className="border border-[#E4E4E7] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
							autoComplete="new"
							{...register("city")}
						/>
						{errors.city &&
							(errors?.city?.message as string)?.length && (
								<small className="mt-1.5 text-sm leading-[16px] text-red-500">
									{errors?.city?.message as string}
								</small>
							)}
					</div>
				</div>
				<div>
					<label className="bt-1.5 mb-1.5 block text-sm font-medium tracking-[-0.1px] text-[#323539]">
						Logo
					</label>
					<div
						className="flex w-full cursor-pointer items-center space-x-2 rounded-md border border-[#E5E5E7] bg-white px-3 py-2 text-[#323539] placeholder:text-[#323539]/50"
						onClick={() => {
							logoRef.current.click();
						}}
					>
						<input
							type="file"
							ref={logoRef}
							onChange={handleFileChange}
							className="hidden"
						/>
						<Button
							className="size-fit rounded-[4px] px-2.5 py-0.5 text-sm font-medium tracking-[-0.1px] text-white"
							type="button"
							disabled={false}
						>
							Choose File
						</Button>

						<p>{logoFile && logoFile.name}</p>
					</div>
				</div>
			</div>

			<div className="flex items-center justify-end space-x-8 rounded-b-[10px] bg-[#FAFBFC] px-8 py-4">
				{isValid}
				<LoaderButton
					disabled={
						updateBusinessMutation.isPending ||
						addBusinessMutation.isPending
					}
					loading={
						updateBusinessMutation.isPending ||
						addBusinessMutation.isPending
					}
					loaderSize={20}
					className={cn(
						"relative h-10 max-w-[103px] flex-1 rounded-md text-white duration-200 ease-in-out"
						// {
						// 	"bg-[#E5E5E7] text-[#858C95] hover:bg-[#E5E5E7]":
						// 		!isValid,
						// 	"bg-primary text-white": isValid,
						// }
					)}
					type="submit"
				>
					Next
				</LoaderButton>
			</div>
		</form>
	);
};

export default AboutBusiness;
