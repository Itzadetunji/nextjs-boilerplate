import QueryClientConfig from "@/configs/QueryClientConfig";
import "@/styles/globals.css";
import type { Metadata } from "next";
import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CONFIGS } from "@/configs";
import useHelpCrunchIdentify from "@/hooks/useHelpCrunchIdentify";

export const metadata: Metadata = {
	title: "Migranium: Workflow Automation, Operations Analytics, Queue Management and Scheduling App",
	description:
		"Transform your clinic's efficiency with Migranium. Designed for busy healthcare providers, our app simplifies patient flow with intelligent queue management. Experience effortless scheduling, and unlock the potential of operations analytics to optimize your practice. With Migranium, reduce wait times, increase patient satisfaction, and take control of your day-to-day clinic management. Join the forefront of healthcare service innovation with Migranium—where care meets efficiency.",
	authors: [{ name: "Migranium" }],
	themeColor: "#ffffff",
	viewport:
		"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
	icons: {
		apple: [
			{
				url: "/assets/apple-touch-icon.png",
				type: "image/png",
				sizes: "180x180",
				rel: "apple-touch-icon",
			},
		],
		icon: [
			{
				url: "/assets/favicon-32x32.png",
				type: "image/png",
				sizes: "32x32",
				rel: "icon",
			},
			{
				url: "/assets/favicon-16x16.png",
				type: "image/png",
				sizes: "16x16",
				rel: "icon",
			},
		],
	},
	alternates: {
		canonical: "https://www.migranium.com/",
	},
	keywords: [
		"wait time management",
		"virtual queue optimization",
		"queue management software",
		"online appointment scheduling",
		"queue management system",
		"digital queue management",
		"real-time waitlist updates",
		"queue analytics solutions",
		"reduce customer wait times",
		"efficient queue scheduling",
		"streamline customer flow",
		"queue management app",
		"appointment booking software",
		"online check-in solutions",
		"queue forecasting tools",
		"improve customer experience",
		"resource allocation optimization",
		"time slot management system",
		"queue segmentation strategies",
		"enhance service efficiency",
		"virtual queue",
		"queue management",
		"scheduling",
		"online appointment",
		"waitlist",
		"customer flow",
		"digital queue",
		"queue optimization",
		"real-time notifications",
		"self-service booking",
		"service prioritization",
		"resource allocation",
		"capacity management",
		"queue analytics",
		"mobile app integration",
		"online check-in",
		"queue segmentation",
		"time slot management",
		"queue forecasting",
		"customer experience enhancement",
		"migranium",
		"queue",
		"schedule",
		"operation",
		"customer service",
		"virtual queue",
		"track queue",
		"track appointment",
		"wait time",
	],
	robots: {
		index: true,
		follow: true,
	},
	openGraph: {
		type: "website",
		url: "https://www.migranium.com/",
		title: "Migranium: Workflow Automation, Operations Analytics, Queue Management and Scheduling App",
		description:
			"Transform your clinic's efficiency with Migranium. Designed for busy healthcare providers, our app simplifies patient flow with intelligent queue management.",
		images: [
			{
				url: "https://www.migranium.com/assets/favicon-32x32.png",
				width: 800,
				height: 600,
				alt: "Migranium",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Migranium: Workflow Automation, Operations Analytics, Queue Management and Scheduling App",
		description:
			"Transform your clinic's efficiency with Migranium. Designed for busy healthcare providers, our app simplifies patient flow with intelligent queue management.",
		images: [
			{
				url: "https://www.migranium.com/assets/favicon-32x32.png",
				alt: "Migranium",
			},
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<GoogleOAuthProvider
			clientId={CONFIGS.GOOGLE.OAUTH_PROVIDER_CLIENT_ID ?? ""}
		>
			<QueryClientConfig>
				<html lang="en">
					<body>{children}</body>
				</html>
			</QueryClientConfig>
		</GoogleOAuthProvider>
	);
}
