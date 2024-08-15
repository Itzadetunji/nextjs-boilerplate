import { toast } from "react-hot-toast";
import { Button } from "./ui/button";

export interface CustomToastProps {
	id: string;
	type?: "success" | "error" | "loading";
	duration?: number;
	undoText?: string;
	undoHandler?: () => void;
}

const useCustomToast = () => {
	return (
		message: string,
		{
			id,
			type = "success",
			duration = 4000,
			undoText,
			undoHandler,
		}: CustomToastProps
	) => {
		const content = (
			<div className="-my-2 mr-[-20px] flex items-center justify-between">
				<div className="flex items-center space-x-5">
					<p className="text-lg font-medium text-[#6D748D]">
						{message}
					</p>
					{undoText && (
						<Button
							className="h-[34px] w-[117px] bg-[#138576] hover:bg-[#138576]"
							onClick={(e) => {
								e.stopPropagation(); // Prevent the toast from dismissing when the button is clicked
								undoHandler && undoHandler();
							}}
						>
							{undoText}
						</Button>
					)}
				</div>
				<button
					className="h-fit p-2.5"
					onClick={() => toast.dismiss(id)}
				>
					<i className="mgc_close_line" />
				</button>
			</div>
		);

		switch (type) {
			case "success":
				toast.success(content, { id, duration });
				break;
			case "error":
				toast.error(content, { id, duration });
				break;
			case "loading":
				toast.loading(content, { id });
				break;
			default:
				toast(content, { id, duration });
		}
	};
};

export default useCustomToast;
