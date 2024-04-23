"use client";

import { usePracticeModal } from "@/store/usePracticeModal";
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

export const PracticeModal = () => {
	const [isClient, setIsClient] = useState(false);
	const { isOpen, open, close } = usePracticeModal();

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) return null;

	return (
		<Dialog open={isOpen} onOpenChange={close}>
			<DialogContent className="max-w-md">
				<div className="flex items-center w-full justify-center mb-5">
					<Image
						src="/heart.svg"
						alt="Heart"
						height={100}
						width={100}
					/>
				</div>
				<DialogTitle className="text-center font-bold text-2xl">
					Practice lesson
				</DialogTitle>
				<DialogDescription className="text-center text-base">
					Use practice lessons to regain hearts and points. You cannot lose hearts or points in practice lessons.
				</DialogDescription>
				<DialogFooter className="mb-4">
					<div className="flex flex-col gap-y-4 w-full">
						<Button
							variant="primary"
							size="lg"
							className="w-full"
							onClick={close}
						>
							I understand
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
