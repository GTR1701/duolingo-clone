"use client";
import { useState, useTransition } from "react";

import { Header } from "./Header";
import { Challenge } from "./Challenge";
import QuestionBubble from "./QuestionBubble";
import ResultCard from "./ResultCard";
import Footer from "./Footer";

import { useHeartsModal } from "@/store/useHeartsModal";
import { upsertChallengeProgress } from "@/actions/challengeProgress";
import { reduceHearts } from "@/actions/userProgress";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAudio, useMount, useWindowSize } from "react-use";

import Confetti from "react-confetti";
import { toast } from "sonner";
import { ChallengeOptions, Challenges, UserSubscription } from "@prisma/client";
import { usePracticeModal } from "@/store/usePracticeModal";

type Props = {
	initialLessonId: number;
	initialLessonChallenges: (Challenges & {
		ChallengeOptions: ChallengeOptions[];
		completed: boolean;
	})[];
	initialHearts: number;
	initialPercentage: number;
	userSubscription: (UserSubscription & {isActive: boolean}) | null;
};

export const Quiz = ({
	initialLessonId,
	initialLessonChallenges,
	initialHearts,
	initialPercentage,
	userSubscription,
}: Props) => {
	const { open: openHeartsModal } = useHeartsModal();
	const { open: openPracticeModal } = usePracticeModal();

	useMount(() => {
		if(initialPercentage === 100) {
			openPracticeModal();
		}
	})
	const { width, height } = useWindowSize();
	const router = useRouter();

	const [pending, startTransition] = useTransition();
	const [lessonId] = useState(initialLessonId);

	const [correctAudio, _c, correctControls] = useAudio({
		src: "/correct.wav",
	});
	const [incorrectAudio, _i, incorrectControls] = useAudio({
		src: "/incorrect.wav",
	});
	const [finishAudio] = useAudio({
		src: "/finish.mp3",
		autoPlay: true,
	});

	const [hearts, setHearts] = useState(initialHearts);
	const [percentage, setPercentage] = useState(() => {
		return initialPercentage === 100 ? 0 : initialPercentage;
	});
	const [challenges] = useState(initialLessonChallenges);
	const [incorrectChallenges, setIncorrectChallenges] = useState<Challenges[]>([])

	const [activeIndex, setActiveIndex] = useState(() => {
		const uncompletedIndex = challenges.findIndex(
			(challenge) => !challenge.completed
		);
		return uncompletedIndex === -1 ? 0 : uncompletedIndex;
	});

	const [selectedOption, setSelectedOption] = useState<number>();
	const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

	const challenge = challenges[activeIndex];
	const options = challenge?.ChallengeOptions ?? [];

	const onNext = () => {
		setActiveIndex((current) => current + 1);
	};

	const onSelect = (id: number) => {
		if (status !== "none") return;
		setSelectedOption(id);
	};

	const onContinue = () => {
		if (!selectedOption) return;
		if (status === "wrong") {
			setStatus("none");
			setSelectedOption(undefined);
			return;
		}
		if (status === "correct") {
			onNext();
			setStatus("none");
			setSelectedOption(undefined);
			return;
		}

		const correctOption = options.find((option) => option.correct);

		if (!correctOption) return;

		if (selectedOption === correctOption.id) {
			startTransition(() => {
				upsertChallengeProgress(challenge.id)
					.then((res) => {
						if (res?.error === "hearts") {
							openHeartsModal();
							return;
						}

						correctControls.play();
						setStatus("correct");
						setPercentage((prev) => prev + 100 / challenges.length);

						// This is a practice
						if (initialPercentage === 100) {
							setHearts((prev) => Math.min(prev + 1, 5));
						}
					})
					.catch(() =>
						toast.error("Something went wrong. Please try again.")
					);
			});
		} else {
			startTransition(() => {
				reduceHearts(challenge.id)
					.then((res) => {
						if (res?.error === "hearts") {
							openHeartsModal();
							return;
						}

						incorrectControls.play();
						setStatus("wrong");
						if (!res?.error) {
							setHearts((prev) => Math.max(prev - 1, 0));
						}
						setIncorrectChallenges([...incorrectChallenges, challenge])
						
					})
					.catch(() =>
						toast.error("Something went wrong. Please try again.")
					);
			});
		}
	};

	//Finish Screen
	if (challenge === null || challenge === undefined || !challenge) {
		return (
			<div className="dark:bg-[#020817] h-[calc(100vh-140px)]">
				{finishAudio}
				<Confetti
					recycle={false}
					numberOfPieces={500}
					tweenDuration={10000}
					width={width}
					height={height}
				/>
				<div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
					<Image
						src="/finish.svg"
						alt="Finish"
						width={100}
						height={100}
						className="hidden lg:block"
					/>
					<Image
						src="/finish.svg"
						alt="Finish"
						width={50}
						height={50}
						className="block lg:hidden"
					/>
					<h1 className="text-xl lg:text-3xl font-bold text-neutral-700 dark:text-neutral-100">
						Great Job! <br /> You&apos;ve completed the lesson.
					</h1>
					<div className="flex items-center gap-x-4 w-full">
						<ResultCard
							variant="points"
							value={challenges.length * 10}
						/>
						<ResultCard variant="hearts" value={hearts} />
					</div>
				</div>
				<Footer
					lessonId={lessonId}
					status="completed"
					onCheck={() => router.push("/learn")}
				/>
			</div>
		);
	}

	const title =
		challenge.type === "ASSIST"
			? "Select the correct meaning"
			: challenge.question;

	return (
		<>
			{incorrectAudio}
			{correctAudio}
			<Header
				hearts={hearts}
				percentage={percentage}
				hasActiveSubscription={!!userSubscription?.isActive}
			/>
			<div className="flex-1 dark:bg-[#020817]">
				<div className="h-full flex items-center justify-center">
					<div className="lg:min-h-[350px] lg:w-[600px] w-full lg:px-0 flex flex-col gap-y-12">
						<h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700 dark:text-neutral-100">
							{title}
						</h1>
						<div>
							{challenge.type === "ASSIST" && (
								<QuestionBubble question={challenge.question} />
							)}
							<Challenge
								options={options}
								onSelect={onSelect}
								status={status}
								selectedOption={selectedOption}
								disabled={pending}
								type={challenge.type}
							/>
						</div>
					</div>
				</div>
			</div>
			<Footer
				disabled={!selectedOption}
				status={status}
				onCheck={onContinue}
			/>
		</>
	);
};
