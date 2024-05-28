import { FeedWrapper } from "@/components/FeedWrapper";
import Promo from "@/components/Promo";
import Quests from "@/components/Quests";
import { StickyWrapper } from "@/components/StickyWrapper";
import { UserProgress } from "@/components/UserProgress";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getCourseById, getTopUsers, getUserProgress, getUserSubscription } from "@/prisma/queries";
import Image from "next/image";
import { redirect } from "next/navigation";

const LearderboardPage = async () => {
	const userProgress = await getUserProgress();
	if (!userProgress || !userProgress.activeCourseId) {
		redirect("/courses");
	}
	const activeCourse = await getCourseById(userProgress.activeCourseId);
	if (!activeCourse) {
		redirect("/courses");
	}

	const userSubscription = await getUserSubscription();
	const leaderboard = await getTopUsers()
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
				<Quests />
			</StickyWrapper>
			<FeedWrapper>
				<div className="w-full flex flex-col items-center">
					<Image src="/leaderboard.svg" alt="Leaderboard" width={90} height={90} />
					<h1 className="text-center font-bold text-neutral-800 text-2xl my-6 dark:text-neutral-100">
						Leaderboard
					</h1>
					<p className="text-muted-foreground text-center text-lg mb-6">
						See where you stand among other learners in the community.
					</p>
					<Separator className="mb-4 h-0.5 rounded-full" />
					{leaderboard.map((userProgress, index) => (
						<div key={userProgress.userId} className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50">
							<p className="font-bold text-lime-700 mr-4">
								{index + 1}
							</p>
							<Avatar className="border bg-green-500 h-12 w-12 ml-3 mr-6">
								<AvatarImage className="object-cover" src={userProgress.userImageSrc || "/mascot.svg"} />
							</Avatar>
							<p className="font-bold text-neutral-800 dark:text-neutral-100 flex-1">
								{userProgress.userName}
							</p>
							<p className="text-muted-foreground">
								{userProgress.points} XP
							</p>
						</div>
					))}
				</div>
			</FeedWrapper>
		</div>
	);
};

export default LearderboardPage;
