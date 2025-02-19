"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./SidebarItem";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader, Moon, Sun } from "lucide-react";
import { Toggle } from "./ui/toggle";
import { useStore } from "zustand";
import { useColorTheme } from "@/store/useColorTheme";

type Props = {
	className?: string;
};

export const Sidebar = ({ className }: Props) => {
	const { isDark, setDarkTheme, setLightTheme } = useStore(useColorTheme);
	return (
		<div
			className={cn(
				"flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
				className
			)}
		>
			<Link href="/learn">
				<div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
					<Image
						src="/mascot.svg"
						height={40}
						width={40}
						alt="Mascot"
					/>
					<h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
						Duolingo Clone
					</h1>
				</div>
			</Link>
			<div className="flex flex-col gap-y-2 flex-1">
				<SidebarItem label="learn" href="/learn" iconSrc="/learn.svg" />
				<SidebarItem
					label="leaderboard"
					href="/leaderboard"
					iconSrc="/leaderboard.svg"
				/>
				<SidebarItem
					label="quests"
					href="/quests"
					iconSrc="/quests.svg"
				/>
				<SidebarItem label="shoup" href="/shop" iconSrc="/shop.svg" />
				<SidebarItem label="Profile" href="/profile" iconSrc="/mascot.svg" />
			</div>
			<div className="p-4 flex flex-row justify-between items-center">
				<ClerkLoading>
					<Loader className="h-5 w-5 text-muted-foreground animate-spin" />
				</ClerkLoading>
				<ClerkLoaded>
					<UserButton afterSignOutUrl="/" />
				</ClerkLoaded>
				<Toggle
					className="p-2"
					onClick={isDark ? setLightTheme : setDarkTheme}
				>
					{isDark ? <Moon /> : <Sun />}
				</Toggle>
			</div>
		</div>
	);
};
