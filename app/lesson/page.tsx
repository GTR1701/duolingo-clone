import { getLesson, getUserProgress } from "@/prisma/queries";
import { redirect } from "next/navigation";
import { Quiz } from "./Quiz";

const LessonPage = async () => {
	const lesson = await getLesson();
	const userProgress = await getUserProgress();

	if (!lesson || !userProgress) {
		redirect("/learn");
	}

	const initialPercentage =
		(lesson?.Challenges.filter((challenge) => challenge.completed).length /
			lesson.Challenges.length) *
		100;

	return (
		<Quiz
			initialLessonId={lesson.id}
			//@ts-ignore
			initialLessonChallenges={lesson.Challenges}
			initialHearts={userProgress.hearts}
			initialPercentage={initialPercentage}
			userSubscription={null}
		/>
	);
};

export default LessonPage;
