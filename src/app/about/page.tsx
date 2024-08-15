"use client";
import GetStarted from "@/components/About/GetStarted";
import OurMission from "@/components/About/OurMission";
import OurStory from "@/components/About/OurStory";
import ContactUsModal from "@/components/ContactUsModal";
import Footer from "@/components/Footer";
import Navbar from "@/components/Home/Navbar";
import Subscribe from "@/components/Home/Subscribe";
import { NextPage } from "next";
import React from "react";

const About: NextPage = () => {
	const [showBookADemo, setShowBookDemo] = React.useState(false);
	const [showContactUsModal, setshowContactUsModal] = React.useState(false);

	return (
		<>
			<main>
				<Navbar
					setShowBookDemo={setShowBookDemo}
					showBookADemo={showBookADemo}
					showContactUsModal={showContactUsModal}
					setshowContactUsModal={setshowContactUsModal}
				/>
				<OurStory />
				<OurMission />
				<GetStarted setShowBookDemo={setShowBookDemo} />
				<Subscribe />
				<Footer />
			</main>
			<ContactUsModal
				show={showContactUsModal}
				setShow={setshowContactUsModal}
			/>
		</>
	);
};

export default About;
