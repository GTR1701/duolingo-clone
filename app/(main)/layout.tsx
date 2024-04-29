'use client'
import { MobileHeader } from "@/components/MobileHeader";
import { Sidebar } from "@/components/sidebar";
import { useColorTheme } from "@/store/useColorTheme";
import { useMount } from "react-use";

type Props = {
	children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
	const {isDark} = useColorTheme();

	return (
		<body className={isDark ? "dark" : ""}>
			<MobileHeader />
			<Sidebar className="hidden lg:flex" />
			<main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
				<div className="max-w-[1056px] mx-auto pt-6 h-full">{children}</div>
			</main>
		</body>
	);
};

export default MainLayout;
