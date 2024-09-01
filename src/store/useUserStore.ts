import { User } from "@/types/signup";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AdminStore {
	user: User | null;
	onboardingState?: number;
	setOnboardingState: (newState: number) => void;
	setUser: (user: User | null) => void;
	reset: () => void;
}

const initialState = {
	user: null,
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
