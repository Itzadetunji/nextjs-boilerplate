"use client";

import useCustomToast from "@/components/CustomToast";
import { useGetUserInformation } from "@/store/slices/auth";
import useUserStore from "@/store/useUserStore";
import { usePathname, useRouter } from "next/navigation";

const RequireAuth: React.FC = () => {
	const router = useRouter();
	const pathname = usePathname();
	const customToast = useCustomToast();
	const onboardingState = useUserStore((s) => s.onboardingState);

	useGetUserInformation(true, (error) => {
		customToast("Session expired", { id: "onboarding", type: "error" });
		if (error?.status === 401) router.replace("/sign-up");
	});

	switch (onboardingState) {
		case 0:
			if (pathname !== "/onboarding/about-business") {
				router.replace("/onboarding/about-business");
			}
			break;
		case 1:
			if (pathname !== "/onboarding/add-location") {
				router.replace("/onboarding/add-location");
			}
			break;
		case 2:
			if (pathname !== "/onboarding/add-payment-method") {
				router.replace("/onboarding/add-payment-method");
			}
			break;
		case 3:
			if (pathname.startsWith("/onboarding")) {
				router.replace("/dashboard/waitlist");
			}
			break;
		default:
			break;
	}

	return null;
};

export default RequireAuth;
