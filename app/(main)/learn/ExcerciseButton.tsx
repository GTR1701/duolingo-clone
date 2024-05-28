"use client";
import "react-circular-progressbar/dist/styles.css";
import { Check, Crown, Star } from "lucide-react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useColorTheme } from "@/store/useColorTheme";
import { useExcerciseRibbon } from "@/store/useExcerciseRibbon";
import { ExcerciseInfoPopup } from "./ExcerciseInfoRibbon";
import { useState } from "react";
import { getExcercise } from "@/prisma/queries";
import {
	ChallengeOptions,
	ChallengeProgress,
	Challenges,
	Excercises,
	Lessons,
} from "@prisma/client";

type Props = {
	id: number | undefined;
	index: number;
	title: string | undefined;
	totalCount: number;
	locked?: boolean;
	current?: boolean;
	completionPercentage: {
		percentage: number;
		numberOfCompletedLessons: number;
		numberOfLessons: number;
	};
	initialExcercise: Partial<
		Excercises &
			Partial<
				Lessons[] &
					Partial<
						Challenges[] &
							Partial<ChallengeOptions[] & ChallengeProgress[]>
					> & { completed: boolean }
			>
	>;
};

export const ExcerciseButton = ({
	id,
	index,
	title,
	totalCount,
	locked,
	current,
	completionPercentage,
	initialExcercise,
}: Props) => {
	const { percentage, numberOfCompletedLessons, numberOfLessons } =
		completionPercentage;

	const { isOpen, open, close } = useExcerciseRibbon();
	const { isDark } = useColorTheme();
	const cycleLength = 8;
	const cycleIndex = index % cycleLength;
	//@ts-ignore
	const [lessons] = useState(initialExcercise.Lessons || []);

	const lesson = lessons[numberOfCompletedLessons];

	let indentLevel;

	if (cycleIndex <= 2) {
		indentLevel = cycleIndex;
	} else if (cycleIndex <= 4) {
		indentLevel = 4 - cycleIndex;
	} else if (cycleIndex <= 6) {
		indentLevel = 4 - cycleIndex;
	} else {
		indentLevel = cycleIndex - 8;
	}

	const rightPosition = indentLevel * 40;

	const isFirst = index === 0;
	const isLast = index === totalCount - 1;
	const isCompleted = !current && !locked;

	const Icon = isCompleted ? Check : isLast ? Crown : Star;

	const href = isCompleted ? `/lesson/${lesson.id}` : "/lesson";

	return (
		<div
			className="relative"
			style={{
				right: `${rightPosition}px`,
				marginTop: isFirst && !isCompleted ? 60 : 24,
			}}
		>
			{current ? (
				<div className="h-[102px] w-[102px] relative">
					<div className="absolute -top-6 left-2.5 px-3 py-2.5 border-2 font-bold uppercase text-green-500 bg-white rounded-xl animate-bounce tracking-wide z-10 dark:bg-[#020817]">
						Start
						<div className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2" />
					</div>
					<CircularProgressbarWithChildren
						value={Number.isNaN(percentage) ? 0 : percentage}
						styles={{
							path: {
								stroke: "#4ade80",
							},
							trail: {
								stroke: !isDark ? "#e5e7eb" : "#808080",
							},
						}}
					>
						<Button
							size="rounded"
							variant={locked ? "locked" : "secondary"}
							className="h-[70px] w-[70px] border-b-8"
							onClick={isOpen ? close : open}
						>
							<Icon
								className={cn(
									"h-10 w-10",
									locked
										? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
										: "fill-neutral-100 text-enutral-100",
									isCompleted && "fill-none stroke-[4]"
								)}
							/>
						</Button>
						<ExcerciseInfoPopup
							isOpen={isOpen}
							href={href}
							locked={locked}
							excerciseTitle={title}
							completion={completionPercentage}
						/>
					</CircularProgressbarWithChildren>
				</div>
			) : (
				<Button
					size="rounded"
					variant={locked ? "locked" : "secondary"}
					className="h-[70px] w-[70px] border-b-8"
				>
					<Icon
						className={cn(
							"h-10 w-10",
							locked
								? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
								: "fill-primary-foreground text-primary-foreground",
							isCompleted && "fill-none stroke-[4]"
						)}
					/>
				</Button>
			)}
		</div>
	);
};
