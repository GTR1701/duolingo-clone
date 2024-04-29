"use client";

import { refillHearts } from "@/actions/userProgress";
import { createStripeUrl } from "@/actions/userSubscription";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
	hearts: number;
	points: number;
	hasActiveSubscription: boolean;
};

const Items = ({ hearts, points, hasActiveSubscription }: Props) => {
	const [pending, startTransition] = useTransition();

	const onRefilHearts = () => {
		if (pending || hearts === 5 || points < 50) return;
		startTransition(() => {
			refillHearts().catch(() => toast.error("Something went wrong"));
		});
	};

	const onUpgrade = () => {
		startTransition(() => {
			createStripeUrl().then((response) => {
				if (response?.data) {
					window.location.href = response.data;
				}
			}).catch(() => toast.error("Something went wrong"));
		})
	}

	return (
		<ul className="w-full">
			<div className="flex items-center w-full p-4 gap-x-4 border-t-2">
				<Image src="/heart.svg" alt="Heart" width={60} height={60} />
				<div className="flex-1">
					<p className="text-neutral-700 dark:text-neutral-100 text-base lg:text-xl font-bold">
						Refill hearts
					</p>
				</div>
				<Button
					disabled={hearts === 5 || points < 50 || pending}
					onClick={onRefilHearts}
				>
					{hearts === 5 ? (
						"Full"
					) : (
						<div className="flex items-center">
							<Image
								src="/points.svg"
								alt="Points"
								width={20}
								height={20}
							/>
							<p>50</p>
						</div>
					)}
				</Button>
			</div>
			<div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
				<Image
					src={"/unlimited.svg"}
					alt={"Unlimited"}
					height={60}
					width={60}
				/>
				<div className="flex-1">
					<p className="text-neutral-700 dark:text-neutral-100 text-base lg:text-xl font-bold">
						Unlimited Hearts
					</p>
				</div>
				<Button disabled={pending} onClick={onUpgrade}>
					{hasActiveSubscription ? "Settings" : "Upgrade"}
					</Button>
			</div>
		</ul>
	);
};

export default Items;
