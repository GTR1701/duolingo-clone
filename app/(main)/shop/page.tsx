import { FeedWrapper } from "@/components/FeedWrapper";
import { StickyWrapper } from "@/components/StickyWrapper";
import { UserProgress } from "@/components/UserProgress";
import { getCourseById, getUserProgress, getUserSubscription } from "@/prisma/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import Items from "./Items";
import Promo from "@/components/Promo";
import Quests from "@/components/Quests";

const ShopPage = async () => {
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
				<Quests points={userProgress.points} />
			</StickyWrapper>
			<FeedWrapper>
				<div className="w-full flex flex-col items-center">
					<Image src="/shop.svg" alt="Shop" width={90} height={90} />
					<h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
						Shoup
					</h1>
					<p className="text-muted-foreground text-center text-lg mb-6">
						Spend your points on cool stuff in the shoup!
					</p>
					<Items
						hearts={userProgress.hearts}
						points={userProgress.points}
						hasActiveSubscription={!!userSubscription?.isActive}
					/>
				</div>
			</FeedWrapper>
		</div>
	);
};

export default ShopPage;
