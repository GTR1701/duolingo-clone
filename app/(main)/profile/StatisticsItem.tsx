import Image from "next/image";

type Props = {
	imgSrc: string;
	itemData: number | string | never[];
	itemName: string;
};

const StatisticsItem = ({ imgSrc, itemData, itemName }: Props) => {
	return (
		<div className="flex border-2 rounded-xl">
			<Image
				src={imgSrc}
				alt={itemName}
				width={25}
				height={25}
				className="mx-4"
			/>
			<div className="mr-8">
				<p className="text-lg font-bold dark:text-white mt-2">
					{itemData}
				</p>
				<p className="text-muted-foreground text-sm mb-2">{itemName}</p>
			</div>
		</div>
	);
};

export default StatisticsItem;
