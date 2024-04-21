import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function ButtonsPage() {
	return (
		<div className="p-4 space-y-4 flex flex-col max-w-[200px]">
			<Button>Default</Button>
			<Button variant="primary">Primary</Button>
			<Button variant="primaryOutline">Primary outline</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="secondaryOutline">Secondary outline</Button>
			<Button variant="danger">danger</Button>
			<Button variant="dangerOutline">Danger outline</Button>
			<Button variant="super">Super</Button>
			<Button variant="superOutline">Super outline</Button>
			<Button variant="ghost">ghost</Button>
			<Button variant="sidebar">Sidebar</Button>
			<Button variant="sidebarOutline">Sidebar outline</Button>
			<Button
				variant="secondary"
				size="rounded"
				className="h-[70px] w-[70px] border-b-8"
			>
				<Check />
			</Button>
		</div>
	);
}
