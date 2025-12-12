import { HTMLProps, ReactNode, useEffect } from "react";
import classNames from "classnames";
import DataAttributes from "../../../types/DataAttributes";
import { Size } from "../../../types/Size";
import { Shape } from "../../../types/Shape";

interface FieldBaseProps
	extends Omit<HTMLProps<HTMLDivElement>, "className" | "size">,
		DataAttributes {
	children?: ReactNode;
	disabled?: boolean;
	readonly?: boolean;
	error?: boolean;
	activated?: boolean;
	className?: classNames.Argument;
	size?: Size;
	shape?: Shape;
}

export const FieldBase = ({
	children,
	disabled,
	readonly,
	error,
	activated,
	className,
	dataAttributes,
	size = Size.MEDIUM,
	shape = Shape.DEFAULT,
	...props
}: FieldBaseProps) => {
	const classes = classNames(
		"flex gap-2 items-center self-stretch border border-gray-300 bg-white dark:bg-gray-900 outline-none box-shadow-none background-clip-padding-box",
		{
			"bg-gray-100 border-gray-200": disabled,
			"bg-gray-50 border-gray-200": readonly,
			"ring-3 ring-danger-200": error,
			"ring-3 ring-primary-200": activated,
			"text-xs px-2 h-7": size === Size.SMALL,
			"text-sm px-4 h-9": size === Size.MEDIUM,
			"text-md px-6 h-11": size === Size.LARGE,
			"rounded-[24px]": shape === Shape.ROUNDED,
			"rounded-lg": shape === Shape.DEFAULT,
			"rounded-none": shape === Shape.SQUARE,
			"opacity-50": disabled,
		},
		className
	);

	return (
		<div className={classes} {...dataAttributes} {...props}>
			{children}
		</div>
	);
};
