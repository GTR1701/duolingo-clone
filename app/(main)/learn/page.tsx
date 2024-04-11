import { FeedWrapper } from "@/components/FeedWrapper";
import { StickyWrapper } from "@/components/StickyWrapper";
import { Header } from "./Header";
import { UserProgress } from "@/components/UserProgress";
import { getCourseById, getUserProgress } from "@/prisma/queries";
import { redirect } from "next/navigation";

const LearnPage = async () => {
	const userProgress = await getUserProgress();
	if (!userProgress) {
		redirect("/courses");
	}

	const activeCourse = await getCourseById(userProgress.activeCourseId);
	if (!activeCourse) {
		redirect("/courses");
	}

	return (
		<div className="flex flex-row-reverse gap-[48px] px-6">
			<StickyWrapper>
				<UserProgress
					activeCourse={activeCourse}
					hearts={userProgress.hearts}
					points={userProgress.points}
					hasActiveSubscription={false}
				/>
			</StickyWrapper>
			<FeedWrapper>
				<Header title={activeCourse.title} />
			</FeedWrapper>
		</div>
	);
};

export default LearnPage;
