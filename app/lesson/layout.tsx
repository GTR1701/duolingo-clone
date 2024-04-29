'use client'
import { cn } from "@/lib/utils";
import { useColorTheme } from "@/store/useColorTheme";

type Props = {
	children: React.ReactNode;
};

const LessonLayout = ({ children }: Props) => {
	const {isDark} = useColorTheme();

	return (
		<div className={cn("flex flex-col h-full", isDark ? "dark" : "")}>
			<div className="flex flex-col h-full w-full">{children}</div>
		</div>
	);
};

export default LessonLayout;
