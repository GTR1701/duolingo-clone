import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
	isOpen: boolean;
	href: string;
	locked?: boolean;
	excerciseTitle: string | undefined;
	completion: {
		percentage: number;
		numberOfCompletedLessons: number;
		numberOfLessons: number;
	};
};

export const ExcerciseInfoPopup = ({
	isOpen,
	href,
	locked,
	excerciseTitle,
	completion,
}: Props) => {
	const { numberOfCompletedLessons, numberOfLessons } = completion;
	return isOpen && (
		<>
			<div className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2 -translate-y-22 rotate-180" />
			<div className="absolute w-[300px] -translate-x-28 top-28 left-2.5 px-3 py-2.5 border-2 font-bold uppercase text-green-500 bg-white rounded-xl animate-accordion-down tracking-wide z-10 dark:bg-[#020817]">
				<h4 className="font-extrabold text-xl">{excerciseTitle}</h4>
				<p className="text-muted-foreground text-xs">
					Lesson {numberOfCompletedLessons + 1} of {numberOfLessons}
				</p>
				<Button variant="secondary" asChild className="w-full mt-4 mb-2">
					<Link href={href} aria-disabled={locked}>Start +10 XP</Link>
				</Button>
			</div>
		</>
	);
};
