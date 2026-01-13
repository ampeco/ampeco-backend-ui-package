import React, { FC, useState, useRef, useEffect } from "react";
import classNames from "classnames";

import DataAttributes from "../../types/DataAttributes";
import { Shape } from "../../types/Shape";

type DropdownItem = {
	label: string;
	onClick: () => void;
	hidden?: boolean;
};

interface DropdownProps extends DataAttributes {
	shape?: Shape;
	renderToggle?: (args: { isOpen: boolean }) => React.ReactNode;
	/**
	 * @description toggleElement is deprecated in favor of renderToggle
	 * @deprecated toggleElement is deprecated in favor of renderToggle
	 */
	toggleElement?: React.ReactNode;
	options: DropdownItem[];
	className?: string;
	position: "right" | "left";
}

export const Dropdown: FC<DropdownProps> = ({
	shape = Shape.DEFAULT,
	renderToggle,
	toggleElement,
	options,
	className,
	position = "right",
	dataAttributes,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	const toggle = () => setIsOpen(!isOpen);

	const handleItemClick = (itemClick: () => void) => () => {
		itemClick();
		setIsOpen(false);
	};

	const renderItem = (item: DropdownItem) => (
		<li
			className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
			key={item.label}
			onClick={handleItemClick(item.onClick)}
		>
			{item.label}
		</li>
	);

	const renderDropdownItems = () => {
		const classes = classNames(
			"absolute top-full right-0 min-w-[10rem] z-50",
			"scroll-wrap overflow-x-hidden overflow-hidden overflow-y-auto select-none bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700",
			position === "right" && "right-0",
			position === "left" && "left-0",
			shape === Shape.DEFAULT && "rounded-lg",
			shape === Shape.ROUNDED && "rounded-[24px]",
			shape === Shape.SQUARE && "rounded-none"
		);

		return (
			<ul className={classes}>
				{options.filter((option) => !option.hidden).map(renderItem)}
			</ul>
		);
	};

	return (
		<div
			ref={dropdownRef}
			className={`relative w-max ${className}`}
			{...dataAttributes}
		>
			<div onClick={toggle}>
				{renderToggle ? renderToggle({ isOpen }) : toggleElement}
			</div>
			{isOpen && renderDropdownItems()}
		</div>
	);
};
