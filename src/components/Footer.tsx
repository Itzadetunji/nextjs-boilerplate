import React, { RefObject } from "react";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Footer: React.FC<{ CoreFeaturesRef?: RefObject<HTMLElement> }> = () =>
	// 	{
	// 	CoreFeaturesRef,
	// }
	{
		const navigate = useRouter();
		return (
			<footer className="flex w-full items-center justify-center bg-[#032A4E]">
				<div className="flex w-full max-w-[1216px] flex-col items-center space-y-8 px-4 py-9">
					<div className="flex w-full items-center justify-between mmd:flex-col mmd:items-start mmd:space-y-12">
						<img
							src="/assets/images/brand/logo-white.svg"
							className="cursor-pointer"
							onClick={() => navigate.push("/")}
							alt="Migranium logo"
						/>
						<ul className="flex items-center font-inter font-medium text-[#858C95] sm:space-x-12 mxs:text-sm msm:space-x-8">
							<Link
								href={"/about"}
								className="text-white duration-200 ease-in-out hover:text-[#72F4E8]"
							>
								About Us
							</Link>
							<Link
								href={"/#features"}
								// scroll={scrollWithOffset}
								className="cursor-pointer text-white duration-200 ease-in-out hover:text-[#72F4E8]"
							>
								Features
							</Link>
							<Link
								href={"/sign-up"}
								className="text-white duration-200 ease-in-out hover:text-[#72F4E8]"
							>
								Create Account
							</Link>
						</ul>
						<ul className="flex items-center space-x-6 fill-white">
							<a
								href="https://www.linkedin.com/company/migranium/"
								target="_blank"
								rel="noreferrer"
							>
								<FaLinkedin size={24} fill="white" />
							</a>
							<a
								href="https://www.instagram.com/migranium.ai/"
								target="_blank"
								rel="noreferrer"
							>
								<FaInstagram size={24} fill="white" />
							</a>
							<a
								href="https://twitter.com/migranium"
								target="_blank"
								rel="noreferrer"
							>
								<FaTwitter size={24} fill="white" />
							</a>
						</ul>
					</div>
					<hr className="w-full border border-[#1D3E69]" />
					<div className="flex w-full items-center justify-between text-white mmd:flex-col-reverse mmd:items-start mmd:gap-y-8">
						<p>
							&copy; {new Date().getFullYear()} Migranium. All
							Rights Reserved.
						</p>
						<ul className="flex items-center space-x-2.5 font-inter font-medium sm:space-x-6 mxs:text-xs">
							{/* <Link
							href={""}
							className="cursor-pointer duration-200 ease-in-out hover:text-[#72F4E8]"
						>
							Cookies
						</Link> */}
							<Link
								href={"/terms"}
								className="cursor-pointer duration-200 ease-in-out hover:text-[#72F4E8]"
							>
								Terms
							</Link>
							<br />
							<Link
								href={"/payment-terms"}
								className="cursor-pointer duration-200 ease-in-out hover:text-[#72F4E8]"
							>
								Payment Terms
							</Link>
							<Link
								href={"/privacy-policy"}
								className="cursor-pointer duration-200 ease-in-out hover:text-[#72F4E8]"
							>
								Privacy Policy
							</Link>
						</ul>
					</div>
				</div>
			</footer>
		);
	};

export default Footer;
