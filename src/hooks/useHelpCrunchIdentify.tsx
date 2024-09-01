"use client";
import { CONFIGS } from "@/configs";
import useUserStore from "@/store/useUserStore";
import { useCallback, useEffect } from "react";

declare global {
	interface Window {
		HelpCrunch: any;
		helpcrunchSettings: any;
	}
}

const useHelpCrunchIdentify: () => void = () => {
	const user = useUserStore((state) => state.user);

	const handleHelpCrunchIdentify = useCallback(() => {
		if (
			user &&
			user.business &&
			user.business.locations &&
			user.business.locations.length
		)
			window.helpcrunchSettings = {
				organization: "migranium",
				appId: CONFIGS.HELP_CRUNCH.HELP_CRUNCH_APP_ID,
				user: {
					user_id: user.id.toString(),
					email: user.email,
					name: user.name,
					phone: user.business.phone_number,
					company: user.business.name,
				},
			};

		(function (w: any, d: any) {
			const hS = w.helpcrunchSettings;
			if (!hS || !hS.organization) {
				return;
			}
			const widgetSrc = "https://embed.helpcrunch.com/sdk.js";
			w.HelpCrunch = function () {
				// eslint-disable-next-line prefer-rest-params
				w.HelpCrunch.q.push(arguments);
			};
			w.HelpCrunch.q = [];
			function r() {
				if (d.querySelector('script[src="' + widgetSrc + '"')) {
					return;
				}
				const s = d.createElement("script");
				s.async = 1;
				s.type = "text/javascript";
				s.src = widgetSrc;
				(d.body || d.head).appendChild(s);
			}

			if (d.readyState === "complete" || hS.loadImmediately) {
				r();
			} else if (w.attachEvent) {
				w.attachEvent("onload", r);
			} else {
				w.addEventListener("load", r, false);
			}
		})(window, document);
	}, [user]);

	useEffect(() => {
		handleHelpCrunchIdentify();
	}, [handleHelpCrunchIdentify]);
};

export default useHelpCrunchIdentify;
