"use client";

import CoreFeatures from "@/components/Home/CoreFeatures/CoreFeatures";
import HeroSection from "@/components/Home/HeroSection";
import HoursSaved from "@/components/Home/HoursSaved";
import HowItWorks from "@/components/Home/HowItWorks/HowItWorks";
import Navbar from "@/components/Home/Navbar";
import Subscribe from "@/components/Home/Subscribe";
import { NextPage } from "next";
import { SetStateAction, useState } from "react";

const Home: NextPage = () => {
	const [showBookADemo, setShowBookADemo] = useState(false);
	const [showContactUsModal, setshowContactUsModal] = useState(false);
	return (
		<main className="">
			<Navbar
				showBookADemo={showBookADemo}
				setShowBookDemo={setShowBookADemo}
				showContactUsModal={showContactUsModal}
				setshowContactUsModal={setshowContactUsModal}
			/>
			<HeroSection setShowBookDemo={setShowBookADemo} />
			<CoreFeatures />
			<HoursSaved />
			<HowItWorks setShowBookDemo={setShowBookADemo} />
			<Subscribe />
		</main>
	);
};

export default Home;
