import React, { HTMLProps, ReactNode } from "react";
import classNames from "classnames";
import DataAttributes from "../../../types/DataAttributes";
import { LoaderSize, Size } from "../../../types/Size";
import { LoaderColor } from "../../../types/LoaderColors";
import { Loader } from "../../loader/Loader";
import { Shape } from "../../../types/Shape";

export interface BaseButtonProps
	extends Omit<HTMLProps<HTMLButtonElement>, "type" | "size">,
		DataAttributes {
	children?: ReactNode;
	variant?: "filled" | "outline" | "link";
	size?: Size;
	loading?: boolean;
	disabled?: boolean;
	label?: string;
	type?: "button" | "submit";
	additionalClasses?: string[];
	shape?: Shape;
}

const BaseButton = ({
	children,
	variant = "filled",
	size = Size.MEDIUM,
	color = LoaderColor.PRIMARY,
	loading,
	disabled,
	className,
	type = "button",
	label = "button",
	dataAttributes,
	additionalClasses = [],
	shape = Shape.DEFAULT,
	...props
}: BaseButtonProps) => {
	const classes = classNames(
		"shrink-0 focus:outline-none ring-primary-200 inline-flex items-center font-bold shadow rounded",
		variant === "filled" &&
			"focus:ring-3 bg-primary-500 hover:bg-primary-400 active:bg-primary-600 text-white dark:text-gray-800",
		variant === "outline" &&
			"shadow-none focus:ring-2 border-2 border-gray-200 dark:border-gray-500 hover:border-primary-500 active:border-primary-400 dark:hover:border-gray-400 dark:active:border-gray-300 bg-white dark:bg-transparent text-primary-500 dark:text-gray-400",
		variant === "link" &&
			"shadow-none text-primary-500 hover:text-primary-400 active:text-primary-600",
		size === Size.SMALL && "text-xs px-2 h-7",
		size === Size.MEDIUM && "text-sm px-4 h-9",
		size === Size.LARGE && "text-base px-6 h-11",
		shape === Shape.DEFAULT && "rounded-md",
		shape === Shape.ROUNDED && "rounded-full",
		shape === Shape.SQUARE && "rounded-none",
		disabled && "opacity-50 cursor-not-allowed",
		...additionalClasses,
		className
	);

	return (
		<button
			type={type}
			{...dataAttributes}
			className={classes}
			disabled={disabled}
			{...props}
			aria-label={label}
		>
			{loading ? (
				<Loader size={LoaderSize.EXTRASMALL} color={LoaderColor.CURRENT} />
			) : (
				children
			)}
		</button>
	);
};

export default BaseButton;
