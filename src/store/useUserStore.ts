import { OperatingHour } from "@/types/onboarding";
import { User } from "@/types/signup";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AdminStore {
	user: User | null;
	onboardingState?: number;
	onboardingLocationInfo: onboardingLocationInfoType | null;
	setOnboardingState: (newState: number) => void;
	setOnboardingLocationInfo: (
		onboardingState: onboardingLocationInfoType | null
	) => void;
	setUser: (user: User | null) => void;
	reset: () => void;
}

interface onboardingLocationInfoType {
	id: number;
	approximate_waiting_time: string;
	schedule_block_in_min: number;
	time_zone: string;
	time_slots: OperatingHour[];
}

const initialState = {
	user: null,
	onboardingState: 0,
	onboardingLocationInfo: null,
};

const useUserStore = create<AdminStore, [["zustand/persist", AdminStore]]>(
	persist(
		(set) => ({
			...initialState,
			setUser: (user) => {
				if (user)
					set((state) => {
						console.log({ user: { ...state.user, ...user } });
						return { user: { ...state.user, ...user } };
					});
			},
			setOnboardingLocationInfo: (onboardingLocationInfo) =>
				set(() => ({ onboardingLocationInfo })),
			setOnboardingState: (onboardingState) => {
				set(() => ({
					onboardingState,
				}));
			},
			reset: () => set(initialState),
		}),
		{
			name: "user-storage",
			getStorage: () => localStorage,
		}
	)
);

export default useUserStore;
