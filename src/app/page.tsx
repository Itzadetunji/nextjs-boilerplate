"use client";

import ContactUsModal from "@/components/ContactUsModal";
import Footer from "@/components/Footer";
import BookADemo from "@/components/Home/BookADemo";
import CoreFeatures from "@/components/Home/CoreFeatures/CoreFeatures";
import HeroSection from "@/components/Home/HeroSection";
import HoursSaved from "@/components/Home/HoursSaved";
import HowItWorks from "@/components/Home/HowItWorks/HowItWorks";
import Navbar from "@/components/Home/Navbar";
import OptimiseOperations from "@/components/Home/OptimiseOperations";
import Subscribe from "@/components/Home/Subscribe";
import WhatUsersSay from "@/components/Home/WhatUsersSay";
import { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
	const [showBookADemo, setShowBookDemo] = useState(false);
	const [showContactUsModal, setshowContactUsModal] = useState(false);
	return (
		<>
			<main className="">
				<Navbar
					showBookADemo={showBookADemo}
					setShowBookDemo={setShowBookDemo}
					showContactUsModal={showContactUsModal}
					setshowContactUsModal={setshowContactUsModal}
				/>
				<HeroSection setShowBookDemo={setShowBookDemo} />
				<CoreFeatures />
				<HoursSaved />
				<HowItWorks setShowBookDemo={setShowBookDemo} />
				<Subscribe />
				<WhatUsersSay />
				<OptimiseOperations
					setShowBookDemo={setShowBookDemo}
					setshowContactUsModal={setshowContactUsModal}
				/>
				<Footer />
			</main>
			<ContactUsModal
				show={showContactUsModal}
				setShow={setshowContactUsModal}
			/>
			<BookADemo
				showBookADemo={showBookADemo}
				setShowBookDemo={setShowBookDemo}
			/>
		</>
	);
};

export default Home;
