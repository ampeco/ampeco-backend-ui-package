import DataAttributes from "../../types/DataAttributes";
import { ReactNode } from "react";
import { Dropdown } from "../dropdown/Dropdown";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { ItemData } from "../../types/ItemData";

export interface ListItemProps<T> extends DataAttributes {
	item: ItemData<T>;
	template: (data: T) => ReactNode;
	onEdit: () => void;
	onDelete: () => void;
}

const ListItem = <T,>({
	item,
	template,
	onEdit,
	onDelete,
	dataAttributes,
}: ListItemProps<T>) => {
	const dropdownOptions = [
		{
			label: "Edit",
			onClick: onEdit,
		},
		{
			label: "Delete",
			onClick: onDelete,
		},
	];

	const toggleElement = () => {
		return <EllipsisVerticalIcon className="w-4 h-4 text-gray-500" />;
	};

	return (
		<li
			{...dataAttributes}
			className="flex flex-row items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0"
		>
			{template(item as T)}
			<Dropdown
				toggleElement={toggleElement()}
				options={dropdownOptions}
				position={"right"}
			></Dropdown>
		</li>
	);
};

export default ListItem;
