import { FeedWrapper } from "@/components/FeedWrapper";
import { StickyWrapper } from "@/components/StickyWrapper";
import { UserProgress } from "@/components/UserProgress";
import {
	getCourseById,
	getCourseProgress,
	getExcercisePercentage,
	getUnits,
	getUserProgress,
	getUserSubscription,
} from "@/prisma/queries";
import { redirect } from "next/navigation";
import { Header } from "./Header";
import { Unit } from "./Unit";
import Promo from "@/components/Promo";
import Quests from "@/components/Quests";

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
	if(!units) {
		redirect("/courses");
	}
	const courseProgress = await getCourseProgress();
	if (!courseProgress) {
		redirect("/courses");
	}
	const excercisePercentage = await getExcercisePercentage();

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
				<Quests />
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
							excercises={unit.excercises}
							activeExcercise={courseProgress.activeExcercise}
							activeExcercisePercentage={excercisePercentage}
						/>
					</div>
				))}
			</FeedWrapper>
		</div>
	);
};

export default LearnPage;
