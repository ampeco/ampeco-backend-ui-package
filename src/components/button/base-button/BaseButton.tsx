import React, { HTMLProps, ReactNode } from "react";
import classNames from "classnames";
import DataAttributes from "../../../types/DataAttributes";
import { Loader } from "../../loader/Loader";

export interface BaseButtonProps
	extends Omit<HTMLProps<HTMLButtonElement>, "type" | "size">,
		DataAttributes {
	children?: ReactNode;
	variant?: "filled" | "outline" | "link";
	size?: "small" | "medium" | "large";
	loading?: boolean;
	disabled?: boolean;
	label?: string;
	type?: "button" | "submit";
	additionalClasses?: string[];
	shape?: "default" | "rounded" | "square";
}

const BaseButton = ({
	children,
	variant = "filled",
	size = "medium",
	color = "primary",
	loading,
	disabled,
	className,
	type = "button",
	label = "button",
	dataAttributes,
	additionalClasses = [],
	shape = "default",
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
		size === "small" && "text-xs px-2 h-7",
		size === "medium" && "text-sm px-4 h-9",
		size === "large" && "text-base px-6 h-11",
		shape === "default" && "rounded-md",
		shape === "rounded" && "rounded-full",
		shape === "square" && "rounded-none",
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
			{loading ? <Loader size="xs" color="currentColor" /> : children}
		</button>
	);
};

export default BaseButton;
