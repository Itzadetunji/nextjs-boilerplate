"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import "@/styles/hamburger.module.css";
import BookADemo from "./BookADemo";

const Navbar: React.FC<{
	isWhite?: boolean;
	showBookADemo: boolean;
	setShowBookDemo: Dispatch<SetStateAction<boolean>>;
	showContactUsModal: boolean;
	setshowContactUsModal: Dispatch<SetStateAction<boolean>>;
}> = ({ isWhite, showBookADemo, setShowBookDemo, setshowContactUsModal }) => {
	// const navigate = useNavigate();
	const [isMobileShowing, setIsMobileShowing] = useState(false);

	const [hasScrolled, setHasScrolled] = useState(false);
	const [rootElement, setRootElement] = useState<null | HTMLElement>(null);
	const [showSelectLogin, setShowSelectLogin] = useState(false);

	const fadeInVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
		exit: { opacity: 0 },
	};

	console.log("deqd");
	useEffect(() => {
		console.log("deqd");
		setRootElement(document.getElementById("root"));
		window.addEventListener("scroll", () => {
			if (window.scrollY > 20) {
				setHasScrolled(true);
			} else {
				setHasScrolled(false);
			}
		});
		return () =>
			window.removeEventListener("scroll", () => {
				setHasScrolled(false);
			});
	}, []);

	return (
		<>
			<nav
				className={`sticky top-0 z-40 flex w-full items-center justify-center ${
					hasScrolled || isWhite
						? "border-b border-b-[#E5E5E7] bg-white"
						: "border-none bg-[#043B6D]"
				} duration-300 ease-in-out`}
			>
				<div className="relative flex w-full max-w-[1248px] items-center justify-between">
					<div className="flex w-full items-center justify-between px-4 py-4">
						<Link
							href={"/#hero"}
							className="relative flex h-10 justify-start msm:h-[31px]"
							// scroll={(el) => {
							// 	window.scrollTo({ top: 0, behavior: "smooth" });
							// }}
						>
							<img
								src="/assets/images/brand/logo-blue.svg"
								alt="Migranium logo"
								className={cn("object-cont", {
									hidden: !(hasScrolled || isWhite),
								})}
							/>
							<img
								src="/assets/images/brand/logo-white.svg"
								alt="Migranium logo"
								className={cn("object-cont", {
									hidden: hasScrolled || isWhite,
								})}
							/>
						</Link>
						<ul className="flex items-center space-x-11">
							<div className="flex space-x-8 mlg:hidden">
								<NavbarItem
									title={"Features"}
									link="/#features"
									hasScrolled={hasScrolled}
									isWhite={isWhite}
								/>
								<NavbarItem
									title={"How it works"}
									link="/#how-it-works"
									hasScrolled={hasScrolled}
									isWhite={isWhite}
								/>
								{/* <NavbarItem
								title={"Pricing"}
								link={"/#pricing"}
								ContactUsRef={null}
							/> */}
								<NavbarItem
									title={"About Us"}
									link={"/about"}
									hasScrolled={hasScrolled}
									isWhite={isWhite}
								/>
								<NavbarItem
									title={"Contact Us"}
									hasScrolled={hasScrolled}
									onClick={() => {
										setshowContactUsModal(true);
									}}
									isWhite={isWhite}
								/>
							</div>
							<div className="flex items-center space-x-4 sm:space-x-2.5">
								<Button
									disabled={false}
									type="button"
									onClick={() =>
										setShowSelectLogin(!showSelectLogin)
									}
									onMouseEnter={() =>
										setShowSelectLogin(true)
									}
									onMouseLeave={() =>
										setShowSelectLogin(false)
									}
									className={cn(
										"relative h-9 max-h-[40px] border py-2.5 text-base text-sm font-medium font-semibold duration-200 ease-in-out sm:w-[103px] lg:h-10 mlg:px-3 mlg:py-2",
										{
											"border-[#043B6D] bg-white text-[#043B6D] hover:border-[#3EC9BC] hover:bg-white hover:text-[#3EC9BC]":
												hasScrolled ||
												(isMobileShowing &&
													hasScrolled),

											"border-white bg-[#043B6D] text-white hover:border-[#72F4E8] hover:bg-[#043B6D] hover:!text-[#72F4E8]":
												!hasScrolled,
										}
									)}
								>
									Log in
									<AnimatePresence>
										{showSelectLogin && (
											<motion.div
												className="absolute -left-[60px] top-full mt-1 flex w-[341px] -translate-x-1/2 items-center justify-between space-x-2.5 rounded-[4px] bg-white p-[1px] drop-shadow-lg sm:-left-7 lg:left-1/2"
												variants={fadeInVariants}
												initial="hidden"
												animate="visible"
												exit="exit"
												transition={{ duration: 0.25 }}
											>
												<button
													className="flex flex-1 items-center justify-between space-x-3 self-stretch rounded-[3px] py-2 pl-4 duration-200 hover:bg-[#72F4E8]"
													type="button"
													onClick={() =>
														window.open(
															"https://spaces.migranium.com",
															"_blank"
														)
													}
												>
													<p className="trackind-[-0.1px] py-3 text-[13px] font-normal leading-[15px] text-[#323539]">
														Spaces
													</p>
													<img
														src="/assets/images/spaces.svg"
														alt=""
													/>
												</button>
												<div className="h-[20px] w-[1px] bg-[#E7E7E7]" />
												<button
													className="flex flex-1 items-center justify-between space-x-3 self-stretch rounded-[3px] py-2 pr-4 duration-200 hover:bg-[#72F4E8]"
													type="button"
													onClick={() => {
														window.open(
															"https://admin.migranium.com",
															"_blank"
														);
													}}
												>
													<p className="trackind-[-0.1px] py-3 text-[13px] font-normal leading-[15px] text-[#323539]">
														Flow & Scheduler
													</p>
													<img
														src="/assets/images/flow-and-scheduler.svg"
														alt=""
													/>
												</button>
											</motion.div>
										)}
									</AnimatePresence>
								</Button>
								<button
									type="button"
									onClick={() =>
										setIsMobileShowing(!isMobileShowing)
									}
									className="lg:hidden"
								>
									<input
										id="hamburger__toggle"
										type="checkbox"
										checked={isMobileShowing}
										className="hidden"
										hidden
									/>
									<label className="hamburger__btn flex h-[18px] w-[18px] items-center justify-center">
										<span
											className={`${
												hasScrolled || isWhite
													? "!bg-[#043B6D] before:!bg-[#043B6D] after:!bg-[#043B6D]"
													: ""
											} duration-200 ease-in-out`}
										></span>
									</label>
								</button>
								<Button
									type="button"
									onClick={() => setShowBookDemo(true)}
									className={cn(
										"flex h-10 max-h-[40px] w-[105px] items-center justify-center py-2.5 text-xs font-semibold mlg:hidden",
										{
											"bg-[#043B6D] text-white hover:text-[#72F4E8]":
												hasScrolled || isWhite,
											"bg-white !text-[#043B6D] hover:border-[#72F4E8] hover:bg-[#72F4E8] hover:text-[#053969]":
												!(hasScrolled || isWhite),
										}
									)}
									disabled={false}
								>
									Book a Demo
								</Button>
							</div>
						</ul>
					</div>
					<MobileNavbar
						isMobileShowing={isMobileShowing}
						setShow={setIsMobileShowing}
						hasScrolled={hasScrolled}
						rootElement={rootElement}
						setShowBookDemo={setShowBookDemo}
						setshowContactUsModal={setshowContactUsModal}
					/>
				</div>
			</nav>
			<BookADemo
				showBookADemo={showBookADemo}
				setShowBookDemo={setShowBookDemo}
			/>
		</>
	);
};

interface NavbarItemProps {
	title: string;
	link?: string;
	setShow?: Dispatch<SetStateAction<boolean>>;
	hasScrolled: boolean;
	onClick?: () => void;
	isWhite?: boolean;
}

const NavbarItem: React.FC<NavbarItemProps> = ({
	title,
	link,
	hasScrolled,
	onClick,
	isWhite,
}) => {
	const [shouldShowHover] = useState(false);

	return (
		<Link
			href={link ?? ""}
			onClick={() => {
				onClick?.();
			}}
			// scroll={scrollWithOffset}
			className="group cursor-pointer"
		>
			<li
				className={`relative font-medium duration-200 ease-in-out ${
					shouldShowHover && "text-red-900"
				} ${
					hasScrolled || isWhite
						? "text-[#5f6061] hover:text-secondary"
						: "text-[#BACCDB] hover:text-[#72F4E8]"
				}`}
			>
				{title}
				<hr
					className={`absolute left-1/2 top-full h-0.5 w-3 -translate-x-1/2 border-transparent duration-200 ease-in-out ${
						hasScrolled || isWhite
							? "group-hover:border-secondary"
							: "group-hover:border-[#72F4E8]"
					} `}
				/>
			</li>
		</Link>
	);
};

interface MobileNavbarItemProps {
	title: string;
	link?: string;
	setShow: Dispatch<SetStateAction<boolean>>;
	onClick?: () => void;
	isWhite?: boolean;
}

const MobileNavbarItem: React.FC<MobileNavbarItemProps> = ({
	title,
	link,
	setShow,
	onClick,
}) => {
	return (
		<Link
			href={link ?? ""}
			onClick={() => {
				if (onClick) onClick();
				setTimeout(() => {
					setShow(false);
				}, 800);
			}}
			className="cursor-pointer"
		>
			<li className="font-medium text-[#323539]">{title}</li>
		</Link>
	);
};

interface MobileNavbarProps {
	isMobileShowing: boolean;
	setShow: Dispatch<SetStateAction<boolean>>;
	hasScrolled: boolean;
	rootElement: HTMLElement | null;
	setShowBookDemo: Dispatch<SetStateAction<boolean>>;
	setshowContactUsModal: Dispatch<SetStateAction<boolean>>;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({
	isMobileShowing,
	hasScrolled,
	setShow,
	setShowBookDemo,
	setshowContactUsModal,
}) => {
	// const navigate = useNavigate();
	return (
		<>
			<AnimatePresence>
				{isMobileShowing && (
					<motion.div
						initial={{ top: "-400px" }}
						animate={{ top: "100%" }}
						exit={{ top: "-400px" }}
						className="absolute w-full lg:hidden"
					>
						<ul
							className={`flex flex-col justify-center space-y-7 bg-white px-4 pb-10 pt-4`}
						>
							<MobileNavbarItem
								title={"Features"}
								link={"/#features"}
								setShow={setShow}
							/>
							<MobileNavbarItem
								title={"How it works"}
								link={"/#how-it-works"}
								setShow={setShow}
							/>
							{/* <MobileNavbarItem
								title={"Pricing"}
								link={"/#pricing"}
								hasScrolled={hasScrolled}
							/> */}
							<MobileNavbarItem
								title={"About Us"}
								link={"/about"}
								setShow={setShow}
							/>
							<MobileNavbarItem
								title={"Contact Us"}
								onClick={() => {
									setshowContactUsModal(true);
								}}
								setShow={setShow}
							/>
						</ul>
						<div className="flex items-center justify-between bg-[#F8F9FB] p-4">
							<Button
								type="button"
								variant="ghost"
								onClick={() => setShowBookDemo(true)}
								className={`${
									hasScrolled
										? "border-[#043B6D] bg-white text-base font-semibold text-[#053969] hover:border-secondary hover:text-secondary"
										: "bg-[#043B6D] text-white hover:border-[#72F4E8] hover:bg-[#72F4E8] hover:text-[#053969]"
								} px-3 py-2 text-base font-semibold duration-200 ease-in-out`}
								disabled={false}
							>
								Book a Demo
							</Button>
							<a href="https://admin.migranium.com/sign-up">
								<Button
									className="text-base font-semibold text-[#323539]"
									variant="ghost"
								>
									Sign up
								</Button>
							</a>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default Navbar;

export const scrollWithOffset = (el: HTMLElement | null) => {
	if (!el) return;

	const yCoordinate = el.getBoundingClientRect().top + window.scrollY;
	const yOffset =
		-window.innerHeight / 2 + el.getBoundingClientRect().height / 2;
	window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
};
