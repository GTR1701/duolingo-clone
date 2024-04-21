import { FeedWrapper } from "@/components/FeedWrapper";
import { StickyWrapper } from "@/components/StickyWrapper";
import { UserProgress } from "@/components/UserProgress";
import {
	getCourseById,
	getCourseProgress,
	getLessonPercentage,
	getUnits,
	getUserProgress,
} from "@/prisma/queries";
import { redirect } from "next/navigation";
import { Header } from "./Header";
import { Unit } from "./Unit";

const LearnPage = async () => {
	const userProgress = await getUserProgress();
	if (!userProgress) {
		redirect("/courses");
	}

	const activeCourse = await getCourseById(userProgress.activeCourseId);
	if (!activeCourse) {
		redirect("/courses");
	}

	const units = await getUnits();
	const courseProgress = await getCourseProgress();
	if (!courseProgress) {
		redirect("/courses");
	}
	const lessonPercentage = await getLessonPercentage();

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
				{units.map((unit) => (
					<div key={unit.id} className="mb-10">
						<Unit
							id={unit.id}
							order={unit.order}
							description={unit.description}
							title={unit.title}
							lessons={unit.lessons}
							activeLesson={courseProgress.activeLesson}
							activeLessonPercentage={lessonPercentage}
						/>
					</div>
				))}
			</FeedWrapper>
		</div>
	);
};

export default LearnPage;
