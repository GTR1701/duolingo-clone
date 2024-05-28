import { getExcercise, getExcercisePercentage, getLesson, getUserProgress, getUserSubscription } from "@/prisma/queries";
import { redirect } from "next/navigation";
import { Quiz } from "./Quiz";

const LessonPage = async () => {
	const excercise = await getExcercise();
	const {numberOfCompletedLessons} = await getExcercisePercentage();

	const lesson = excercise?.Lessons[numberOfCompletedLessons];

	const userProgress = await getUserProgress();
	const userSubscription = await getUserSubscription();

	if (!lesson || !userProgress) {
		redirect("/learn");
	}

	const initialPercentage =
	//@ts-ignore
		(lesson?.Challenges.filter((challenge) => challenge.completed).length /
			lesson.Challenges.length) *
		100;

	return (
		<Quiz
			initialLessonId={lesson.id}
			// @ts-ignore
			initialLessonChallenges={lesson.Challenges}
			initialHearts={userProgress.hearts}
			initialPercentage={initialPercentage}
			userSubscription={userSubscription}
		/>
	);
};

export default LessonPage;
