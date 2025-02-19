import { getLesson, getUserProgress, getUserSubscription } from "@/prisma/queries";
import { redirect } from "next/navigation";
import { Quiz } from "../Quiz";

type Props = {
	params: {
		lessonId: string;
	}
}

const LessonIdPage = async ({params}: Props) => {
	const lesson = await getLesson(parseInt(params.lessonId));
	const userProgress = await getUserProgress();
    const userSubscription = await getUserSubscription()


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
			initialLessonChallenges={lesson.Challenges}
			initialHearts={userProgress.hearts}
			initialPercentage={initialPercentage}
			userSubscription={userSubscription}
		/>
	);
};

export default LessonIdPage;
