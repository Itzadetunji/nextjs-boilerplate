"use client";

import React, { useEffect, useRef, useState } from "react";
import {
	PiSmileyDuotone,
	PiTimerDuotone,
	PiTrendUpDuotone,
} from "react-icons/pi";

const HoursSaved: React.FC = () => {
	return (
		<section
			className="flex w-full items-center justify-center bg-[#F7F7F7]"
			id="ff"
		>
			<ul className="flex w-full max-w-[1216px] flex-row justify-evenly space-x-4 px-3 py-7 mxs:space-x-1">
				{HoursSavedItems.map((item, index) => (
					<React.Fragment key={index}>
						<HoursSavedItem
							icon={item.icon}
							title={item.title}
							desc={item.desc}
							symbol={item.symbol}
						/>
						<div className="w-[2px] self-stretch rounded-full bg-[#F1EEEE] last:hidden xs:w-1" />
					</React.Fragment>
				))}
			</ul>
		</section>
	);
};

interface HoursSavedItemProps {
	icon: JSX.Element;
	title: string;
	desc: number;
	symbol: string | null;
}

const HoursSavedItem: React.FC<HoursSavedItemProps> = ({
	icon,
	title,
	desc,
	symbol,
}) => {
	const [count, setCount] = useState(desc * 0.7);

	const itemRef = useRef(null);

	useEffect(() => {
		const options = {
			root: null,
			rootMargin: "0px",
			threshold: 0.5,
		};
		const targetCount = desc;
		const duration = 9000;
		const step = (targetCount * 3) / (duration / 10);

		const interval = () => {
			return setInterval(() => {
				setCount((prevCount) => {
					const nextCount = prevCount + step;
					return nextCount >= targetCount ? targetCount : nextCount;
				});
			}, 10);
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					interval();
					observer.unobserve(entry.target);
				}
			});
		}, options);

		if (itemRef.current) {
			observer.observe(itemRef.current);
		}

		return () => {
			if (itemRef.current) {
				observer.unobserve(itemRef.current);
			}
			clearInterval(interval());
		};
	}, []);

	return (
		<li
			className="flex flex-col items-center text-center text-[20px] font-bold tracking-[0] text-[#195388] sm:!text-[42px] xs:text-[28px] xs:leading-[60px]"
			ref={itemRef}
		>
			<div className="flex items-center space-x-1">
				{icon}
				<p className="text-xs font-semibold text-[#48AA75] sm:text-base xs:text-sm">
					{title}
				</p>
			</div>
			<div className="invisible relative flex items-center">
				{desc.toLocaleString()}
				{symbol ? symbol : ""}
				<div className="visible absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1">
					<p>{parseInt(count.toFixed(0)).toLocaleString()}</p>
					<p>{symbol ? symbol : ""}</p>
				</div>
			</div>
		</li>
	);
};

const HoursSavedItems = [
	{
		icon: (
			<PiTimerDuotone className="h-3 w-3 fill-[#195388] xs:h-6 xs:w-6" />
		),
		title: "Hours Saved",
		desc: 30500,
		symbol: "+",
	},
	{
		icon: (
			<PiTrendUpDuotone className="h-3 w-3 fill-[#195388] xs:h-6 xs:w-6" />
		),
		title: "Throughput Increase",
		desc: 15,
		symbol: "%",
	},
	{
		icon: (
			<PiSmileyDuotone className="h-3 w-3 fill-[#195388] xs:h-6 xs:w-6" />
		),
		title: "Happy Users",
		desc: 4000,
		symbol: "+",
	},
];

export default HoursSaved;
