import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { Progress } from "./ui/progress";

type Props = {
    points: number;

}

const quests = [
	{
		title: "Earn 20 XP",
		value: 20,
	},
	{
		title: "Earn 50 XP",
		value: 50,
	},
	{
		title: "Earn 100 XP",
		value: 100,
	},
	{
		title: "Earn 250 XP",
		value: 250,
	},
	{
		title: "Earn 500 XP",
		value: 500,
	},
	{
		title: "Earn 1000 XP",
		value: 1000,
	},
];

const Quests = ({ points}: Props) => {
	return (
		<div className="border-2 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between w-full space-y-2">
                <h3 className="font-bold text-lg">
                    Quests
                </h3>
                <Link href="/quests">
                    <Button variant="primaryOutline" size="sm">
                        View All
                    </Button>
                </Link>
            </div>
            <ul className="w-full space-y-4">
                {quests.map((quest) => {
                    const progress = (points / quest.value) * 100;

                return (
                    <div
                        className="flex items-center w-full pb-4 gap-x-3"
                        key={quest.title}
                    >
                        <Image
                            src="/points.svg"
                            alt="Points"
                            width={60}
                            height={60}
                        />
                        <div className="flex flex-col gap-y-2 w-full">
                            <p className="text-neutral-700 text-sm font-bold">
                                {quest.title}
                            </p>
                            <Progress value={progress} />
                        </div>
                    </div>
                );
                })}
            </ul>
		</div>
	);
};

export default Quests;
