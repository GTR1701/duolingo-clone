import { FeedWrapper } from "@/components/FeedWrapper";
import Promo from "@/components/Promo";
import { StickyWrapper } from "@/components/StickyWrapper";
import { UserProgress } from "@/components/UserProgress";
import { Progress } from "@/components/ui/progress";
import {
	getCourseById,
	getUserProgress,
	getUserQuests,
	getUserSubscription,
} from "@/prisma/queries";
import Image from "next/image";
import { redirect } from "next/navigation";


const QuestsPage = async () => {
	const quests = await getUserQuests()
	const userProgress = await getUserProgress();
	if (!userProgress || !userProgress.activeCourseId) {
		redirect("/courses");
	}
	const activeCourse = await getCourseById(userProgress.activeCourseId);
	if (!activeCourse) {
		redirect("/courses");
	}

	const userSubscription = await getUserSubscription();
	const isPro = !!userSubscription?.isActive;

	return (
		<div className="flex flex-row-reverse gap-[48px] px-6">
			<StickyWrapper>
				<UserProgress
					activeCourse={activeCourse}
					hearts={userProgress.hearts}
					points={userProgress.points}
					hasActiveSubscription={!!userSubscription?.isActive}
				/>
				{!isPro && <Promo />}
			</StickyWrapper>
			<FeedWrapper>
				<div className="w-full flex flex-col items-center">
					<Image
						src="/quests.svg"
						alt="Quests"
						width={90}
						height={90}
					/>
					<h1 className="text-center font-bold text-neutral-800 dark:text-neutral-100 text-2xl my-6">
						Quests
					</h1>
					<p className="text-muted-foreground text-center text-lg mb-6">
						Complete quests by completing lessons and earning XP.
					</p>
					<ul className="w-full">
						{quests.map((quest, index) => {
							const progress =
								(quest.progress / quest.Quests.objective) * 100;

							return (
								<div
									className="flex items-center w-full p-4 gap-x-4 border-t-2"
									key={quest.Quests.title}
								>
									<Image
										src="/points.svg"
										alt="Points"
										width={60}
										height={60}
									/>
									<div className="flex flex-col gap-y-4 w-full">
										<p className="text-neutral-700 dark:text-neutral-100 text-xl font-bold">
											{quest.Quests.title}
										</p>
										<Progress value={progress} />
									</div>
								</div>
							);
						})}
					</ul>
				</div>
			</FeedWrapper>
		</div>
	);
};

export default QuestsPage;
