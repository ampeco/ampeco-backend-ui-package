import { ReactNode } from "react";
import DataAttributes from "../../types/DataAttributes";
import ListItem from "./ListItem";
import { ItemData } from "../../types/ItemData";

interface ListProps<T> extends DataAttributes {
	heading: string;
	addIcon: ReactNode;
	items: ItemData<T>[];
	itemTemplateRef: (data: T) => ReactNode;
	onAdd: () => void;
	onEdit: () => void;
	onDelete: () => void;
}

export const List = <T,>({
	heading,
	addIcon,
	items,
	itemTemplateRef,
	onAdd,
	onEdit,
	onDelete,
}: ListProps<T>) => {
	return (
		<section className="">
			<header className="flex flex-row items-center justify-between">
				<h3 className="font-bold text-lg">{heading}</h3>
				<button onClick={onAdd}>{addIcon}</button>
			</header>
			<ul className="flex flex-col gap-4">
				{items?.length &&
					items.map((item) => (
						<ListItem
							key={item.id}
							item={item}
							template={itemTemplateRef}
							onEdit={onEdit}
							onDelete={onDelete}
						/>
					))}
			</ul>
		</section>
	);
};

export default List;
