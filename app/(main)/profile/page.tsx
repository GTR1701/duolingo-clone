import { FeedWrapper } from "@/components/FeedWrapper";
import Promo from "@/components/Promo";
import { StickyWrapper } from "@/components/StickyWrapper";
import { UserProgress } from "@/components/UserProgress";
import {
	getCourseById,
	getUserCompletedLessons,
	getUserProgress,
	getUserSubscription,
} from "@/prisma/queries";
import { auth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import StatisticsItem from "./StatisticsItem";

const UserProfilePage = async () => {
	const {} = auth();
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

	const userCompletedLessons = await getUserCompletedLessons();
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
						src={userProgress.userImageSrc}
						alt="Profile Image"
						width={90}
						height={90}
					/>
					<h1 className="text-center font-bold text-neutral-800 dark:text-neutral-100 text-2xl my-6">
						{userProgress.userName}
					</h1>
					<h1 className="text-left font-bold text-neutral-800 dark:text-neutral-100 text-2xl my-6 border-t-2 w-full pt-4">
						Statistics
					</h1>
					<div className="items-center grid grid-cols-2 w-full gap-4">
						<StatisticsItem
							imgSrc={"/points.svg"}
							itemData={userProgress.points}
							itemName="Total Points"
						/>
						<StatisticsItem
							imgSrc={"/EXP.svg"}
							itemData={userProgress.experience}
							itemName="Total XP"
						/>
						<StatisticsItem
							imgSrc={"/lessons.svg"}
							itemData={userCompletedLessons}
							itemName="Total Completed Lessons"
						/>
						<StatisticsItem
							imgSrc={activeCourse.imageSrc}
							itemData={activeCourse.title}
							itemName="Active Course"
						/>
					</div>
				</div>
			</FeedWrapper>
		</div>
	);
};

export default UserProfilePage;
