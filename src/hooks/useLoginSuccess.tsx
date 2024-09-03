import { User } from "@/types/signup";
import useUserStore from "../store/useUserStore";
import { setCookie } from "../utils/cookies";
import { useRouter } from "next/navigation";
import { changeTheme } from "@/utils/general";

export const useHandleLoginSuccess = () => {
	const router = useRouter();
	const { setUser, setOnboardingState } = useUserStore((state) => ({
		setUser: state.setUser,
		setOnboardingState: state.setOnboardingState,
	}));

	return (data: {
		status?: boolean;
		message?: string;
		user: User;
		token?: string;
	}) => {
		// Set cookies and user state
		if (data.token) setCookie("ac-token", data.token, 7);
		setUser(data.user);

		if (!data.user) {
			router.push("/sign-in");
			return;
		}

		// Handle navigation based on user role
		if (data.user.role === "SUPER_ADMIN") {
			router.push("/admin");
		} else if (data.user.role === "BUSINESS_ADMIN") {
			if (data.user.business_id && data.user.business) {
				if (
					data.user.business.locations &&
					data.user.business.locations.length
				) {
					// setQueueUrl(
					// 	data.user.business.locations[0].stations[0].url_code ??
					// 		""
					// );
					// setCurrentLocationId(data.user.business.locations[0].id);
					// setCurrentStationId("All Stations");

					// setLocationsList(
					// 	data.user.business.locations.map((location) => ({
					// 		label: location.name,
					// 		value: location.id.toString(),
					// 	}))
					// );

					// setStationsList(
					// 	data.user.business.locations.flatMap((location) =>
					// 		location.stations.map((station) => ({
					// 			label: station.name,
					// 			value: station.id.toString(),
					// 		}))
					// 	)
					// );
					setOnboardingState(3);
					changeTheme(data.user.business.theme ?? "#005893");
					if (localStorage.getItem("product_type") === "room_booking")
						window.open("https://spaces.migranium.com", "_self");
					else if (localStorage.getItem("product_type") === "primary")
						window.open("https://admin.migranium.com", "_self");
				} else {
					setOnboardingState(1);
					router.push("/onboarding/add-location");
				}
			} else {
				setOnboardingState(0);
				router.push("/onboarding/about-business");
			}
		}
		// toast.success("Login successful 🎉");
	};
};
