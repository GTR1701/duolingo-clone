"use client";

import { useHeartsModal } from "@/store/useHeartsModal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
} from "../ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";

export const HeartsModal = () => {
	const router = useRouter();
	const [isClient, setIsClient] = useState(false);
	const { isOpen, open, close } = useHeartsModal();

	useEffect(() => {
		setIsClient(true);
	}, []);

    const onClick = () => {
        close();
        router.push("/shop");
    }

	if (!isClient) return null;

	return (
		<Dialog open={isOpen} onOpenChange={close}>
			<DialogContent className="max-w-md">
				<div className="flex items-center w-full justify-center mb-5">
					<Image
						src="/mascot_bad.svg"
						alt="Mascot"
						height={80}
						width={80}
					/>
				</div>
				<DialogTitle className="text-center font-bold text-2xl">
					You ran out of hearts!
				</DialogTitle>
				<DialogDescription className="text-center text-base">
					Get Pro for unlimited hearts, or purchase them in the store.
				</DialogDescription>
				<DialogFooter className="mb-4">
					<div className="flex flex-col gap-y-4 w-full">
						<Button
							variant="primary"
							size="lg"
							className="w-full"
							onClick={onClick}
						>
							Get unlimited hearts
						</Button>
						<Button
							variant="primaryOutline"
							size="lg"
							className="w-full"
							onClick={() => {
								close();
								router.push("/learn");
							}}
						>
							No thanks
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
