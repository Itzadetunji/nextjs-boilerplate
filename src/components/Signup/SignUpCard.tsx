import { zodResolver } from "@hookform/resolvers/zod";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import useUserStore from "../../store/useUserStore";
import useCustomToast from "../CustomToast";
import RequestIsLoading from "@/components/RequestIsLoading";
import { LoaderButton } from "../ui-extended/loader-button";
import Link from "next/link";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { SignUpSchema, SignUpType } from "@/types/signup";
import { useGoogleRegisterUser, useRegisterUser } from "@/store/slices/auth";

const SignUpCard: React.FC<{
	//
}> = () => {
	const {
		register,
		handleSubmit,
		setError,
		getValues,
		formState: { errors },
	} = useForm<SignUpType>({
		resolver: zodResolver(SignUpSchema),
	});
	const [confirmPassword, setConfirmPassword] = useState("");

	const registerUserMutaion = useRegisterUser(undefined, undefined);
	const googleRegisterUserMutation = useGoogleRegisterUser();

	const reset = useUserStore((s) => s.reset);
	const customToast = useCustomToast();

	const onSubmit: SubmitHandler<SignUpType> = async (data) => {
		try {
			registerUserMutaion.mutate(data);
		} catch (error) {
			setError("root", {
				message: "An error occured kindly try again later",
			});
		}
	};

	const responseMessage = (response: CredentialResponse) => {
		googleRegisterUserMutation.mutate({
			token: response.credential ?? "",
		});
	};

	const errorMessage = () => {
		customToast("Google sign up failed", {
			id: "google-signup",
			type: "error",
		});
	};

	useEffect(() => {
		reset();
	}, []);

	return (
		<form
			className="relative z-10 flex w-full max-w-[488px] flex-col space-y-4 rounded-[10px] bg-white pt-6 shadow-[0_20px_25px_-5px_rgba(16,24,40,0.1),_0_8px_10px_-6px_rgba(16,24,40,0.1)]"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="flex flex-col space-y-2 px-4 pb-6 md:px-8">
				<h3 className="text-[22px] font-semibold leading-[30px] tracking-[-0.22px] text-[#323539]">
					Create an account
				</h3>
				<Link
					href="/sign-in"
					className="font-normal tracking-[-1%] text-[#858C95]"
				>
					Already have an account?
					<span className="text-[#195388]"> Sign in</span>
				</Link>
			</div>
			<div className="flex flex-col space-y-6 px-4 md:px-8">
				<div className="space-y-1.5">
					<Label>
						Full Name <span className="text-red-500">*</span>
					</Label>
					<Input {...register("name")} />
					{errors.name?.message && (
						<p className="mt-1.5 text-sm text-red-500">
							{errors.name?.message}
						</p>
					)}
				</div>
				<div className="space-y-1.5">
					<Label>
						Email Address <span className="text-red-500">*</span>
					</Label>
					<Input {...register("email")} />
					{errors.email?.message && (
						<p className="mt-1.5 text-sm text-red-500">
							{errors.email?.message}
						</p>
					)}
				</div>

				<div className="space-y-1.5">
					<Label>
						Password <span className="text-red-500">*</span>
					</Label>
					<Input {...register("password")} />

					<small
						className={cn("mt-1.5 text-sm text-[#858C95]", {
							"text-red-500": errors.password?.message,
						})}
					>
						Password should be minimum 8 characters
					</small>
				</div>
				<div className="space-y-1.5">
					<Label>
						Confirm Password <span className="text-red-500">*</span>
					</Label>
					<Input
						onChange={(e) => {
							setConfirmPassword(e.target.value);
						}}
					/>

					{confirmPassword.length > 0 &&
						!(confirmPassword === getValues("password")) && (
							<small className="text-sm tracking-[-0.1px] text-red-600">
								Password does not match current password
							</small>
						)}
				</div>
			</div>
			<div className="px-4 md:px-8">
				By creating an account, you agree to Migranium&apos;s{" "}
				<Link
					href="/terms"
					className="text-base tracking-[-1%] text-[#195388] underline"
				>
					Terms
				</Link>{" "}
				and{" "}
				<Link
					href="/privacy-policy"
					className="text-base tracking-[-1%] text-[#195388] underline"
				>
					Policies
				</Link>{" "}
			</div>
			<div className="flex items-center justify-between rounded-b-[10px] bg-[#FAFBFC] px-4 pb-6 pt-4 md:px-8 mmd:flex-col mmd:space-y-6">
				<LoaderButton
					disabled={registerUserMutaion.isPending}
					loading={registerUserMutaion.isPending}
					className={
						"h-[46px] w-full bg-[#043B6D] text-base font-semibold text-white md:h-10 md:w-[104px] mmd:text-[15px]"
					}
					type="submit"
					loaderSize={20}
				>
					Sign up
				</LoaderButton>
				<div className="flex flex-col justify-end space-y-2 mmd:w-full mmd:flex-col mmd:space-y-2">
					{/* <p className="text-sm tracking-[-0.1px] text-[#858C95]">
						Or Sign up with
					</p> */}
					<div>
						<GoogleLogin
							onSuccess={responseMessage}
							onError={errorMessage}
						/>
					</div>
				</div>
			</div>
			<RequestIsLoading
				isWhite
				// isLoading={googleRegisterUserMutation.isLoading}
				isLoading={false}
			/>
		</form>
	);
};

export default SignUpCard;
