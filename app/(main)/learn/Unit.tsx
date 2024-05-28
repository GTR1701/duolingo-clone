import { Excercises, Units, Lessons } from '@prisma/client';
import { UnitBanner } from "./UnitBanner";
import { ExcerciseButton } from "./ExcerciseButton";
import { redirect } from 'next/navigation';

type Props = {
	id: number;
	order: number;
	title: string;
	description: string;
	excercises: Partial<Excercises & { completed: boolean }>[];
	activeExcercise: Partial<Excercises & Units> | undefined;
	activeExcercisePercentage: {
		percentage: number;
		numberOfCompletedLessons: number;
		numberOfLessons: number;
	};
};

export const Unit = ({
	id,
	order,
	title,
	description,
	excercises,
	activeExcercise,
	activeExcercisePercentage,
}: Props) => {
	if(!excercises){
		redirect("/courses");
	}
	return (
		<>
			<UnitBanner title={title} description={description} />
			<div className="flex items-center flex-col relative">
				{excercises.map((excercise, index) => {
					const isCurrent = excercise.id === activeExcercise?.id;
					const isLocked = !excercise.completed && !isCurrent;

					return (
						<ExcerciseButton
							key={excercise.id}
							id={excercise.id}
							title={excercise.title}
							index={index}
							// @ts-ignore
							totalCount={excercise.Lessons.length}
							current={isCurrent}
							locked={isLocked}
							completionPercentage={activeExcercisePercentage}
							initialExcercise={excercise}
						/>
					);
				})}
			</div>
		</>
	);
};
