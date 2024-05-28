import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { Progress } from "./ui/progress";
import { getUserQuests } from "@/prisma/queries";

const Quests = async () => {
	const quests = await getUserQuests()

    return (
		<div className="border-2 rounded-xl p-4 space-y-4">
			<div className="flex items-center justify-between w-full space-y-2">
				<h3 className="font-bold text-lg">Quests</h3>
				<Link href="/quests">
					<Button variant="primaryOutline" size="sm">
						View All
					</Button>
				</Link>
			</div>
			<ul className="w-full space-y-4">
				{quests.map((quest, index) => {
					const progress =
						(quest.progress / quest.Quests.objective) * 100;

					return (
						<div
							className="flex items-center w-full p-4 gap-x-4 border-t-2"
							key={quest.Quests.title}
						>
							<Image
								src="/points.svg"
								alt="Points"
								width={60}
								height={60}
							/>
							<div className="flex flex-col gap-y-4 w-full">
								<p className="text-neutral-700 dark:text-neutral-100 text-xl font-bold">
									{quest.Quests.title}
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
