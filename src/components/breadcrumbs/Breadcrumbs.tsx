import React from "react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { KeyboardEvent } from "react";
import { BreadcrumbItem } from "../../types/BreadcrumbItem";
import DataAttributes from "../../types/DataAttributes";

interface BreadcrumbsProps extends DataAttributes {
	data: BreadcrumbItem[];
	onItemSelected?: (id: string) => void;
}

export const Breadcrumbs = ({
	data,
	onItemSelected,
	dataAttributes,
}: BreadcrumbsProps) => {
	const handleItemClick = (item: BreadcrumbItem) => {
		if (onItemSelected && !item.disabled) {
			onItemSelected(item.id);
		}
	};

	const handleItemKeyDown = (event: KeyboardEvent, item: BreadcrumbItem) => {
		if (event.key == "Enter" || event.key == " ") {
			if (onItemSelected && !item.disabled) {
				onItemSelected(item.id);
			}
		}
	};

	return (
		<ol
			className="flex items-center"
			{...dataAttributes}
			aria-label="Breadcrumb"
		>
			{data.map((item, index) => (
				<li key={item.id} className="flex items-center">
					<span
						className={classNames(
							"outline-none rounded-sm font-bold",
							!item.disabled &&
								index !== data.length - 1 &&
								"text-primary-500 hover:text-primary-400 active:text-primary-600 focus:ring-3 ring-primary-200 cursor-pointer"
						)}
						tabIndex={
							index === data.length - 1 || item.disabled ? undefined : 0
						}
						onClick={() => index != data.length && handleItemClick(item)}
						onKeyDown={(event) =>
							index != data.length && handleItemKeyDown(event, item)
						}
					>
						{item.text}
					</span>
					{index !== data.length - 1 && (
						<ChevronRightIcon className="w-4 h-4 mx-2 text-center text-gray-500 dark:text-gray-400" />
					)}
				</li>
			))}
		</ol>
	);
};
