import classNames from "classnames";
import type { ComponentProps, ElementType, ReactNode } from "react";
import dataAttributes from "../../types/DataAttributes";

export type SkeletonProps<TComponent extends ElementType> = {
	dataAttributes?: dataAttributes;
	className?: string;
	Component: TComponent;
	children?: ReactNode;
	fullWidth?: boolean;
} & ComponentProps<TComponent>;

export const Skeleton = <TComponent extends ElementType>({
	Component = "span",
	className,
	children,
	dataAttributes,
	fullWidth = false,
	...rest
}: SkeletonProps<TComponent>) => {
	const classes = classNames(
		"block bg-gray-200 dark:bg-gray-700 rounded-lg",
		"animate-pulse",
		{
			"w-full": fullWidth,
			"w-max": !fullWidth && !children,
			"max-w-fit h-auto": !fullWidth && !!children,
		},
		className
	);

	return (
		<Component {...dataAttributes} className={classes} {...rest}>
			<span className="invisible">{!!children ? children : "Loading..."}</span>
		</Component>
	);
};
