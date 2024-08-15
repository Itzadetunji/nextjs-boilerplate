export interface CoreFeatureCardProps {
	icon: React.ReactNode;
	title: string;
	children: React.ReactNode;
}

const CoreFeatureCard: React.FC<CoreFeatureCardProps> = ({
	icon,
	title,
	children,
}) => {
	return (
		<li className="flex space-x-3 lg:flex-col lg:space-x-0 lg:space-y-3 msm:px-4">
			{icon}
			<div className="flex flex-col space-y-2">
				<h4 className="text-[20px] font-bold leading-[30px] text-[#323539]">
					{title}
				</h4>
				<p className="tracking-[-1%] text-[#323539]">{children}</p>
			</div>
		</li>
	);
};

export default CoreFeatureCard;
