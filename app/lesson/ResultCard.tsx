import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
	value: number;
	variant: "EXP" | "hearts";
};

const ResultCard = ({ value, variant }: Props) => {
    const imageSrc = variant === "EXP" ? "/EXP.svg" : "/heart.svg";
	return (
		<div
			className={cn(
				"rounded-2xl border-2 w-full",
				variant === "EXP" && "bg-orange-400 border-orange-400",
				variant === "hearts" && "bg-rose-500 border-rose-500"
			)}
		>
			<div
				className={cn(
					"p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs",
					variant === "EXP" && "bg-orange-400",
					variant === "hearts" && "bg-rose-500"
				)}
			>
				{variant === "hearts" ? "Hearts left" : "Total XP"}
			</div>
			<div
				className={cn(
					"rounded-2xl bg-white dark:bg-[#020817] items-center flex justify-center p-6 font-bold text-lg",
                    variant === "EXP" && "text-orange-300",
                    variant === "hearts" && "text-rose-400"
				)}
			>
                <Image src={imageSrc} alt="Icon" width={24} height={24} className="mr-1.5" />
				{value}
			</div>
		</div>
	);
};

export default ResultCard;
