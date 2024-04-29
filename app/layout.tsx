import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ExitModal } from "@/components/modals/ExitModal";
import { HeartsModal } from "@/components/modals/HeartsModal";
import { PracticeModal } from "@/components/modals/PracticeModal";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Duolingo Clone",
	description: "Generated by create next app, with Clerk, Sonner, Shadcn/ui, and Tailwind CSS. Base layout by CodeWithAntonio.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	return (
		<ClerkProvider>
			<html lang="en" className="">
				<body className={font.className}>
					<Toaster />
					<ExitModal />
					<HeartsModal />
					<PracticeModal />
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
