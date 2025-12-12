import type { FC, ReactNode } from "react";
import classNames from "classnames";

import DataAttributes from "../../types/DataAttributes";
import { Shape } from "../../types/Shape";

interface CardProps extends DataAttributes {
	shape?: Shape;
	showHeader?: boolean;
	showBody?: boolean;
	showFooter?: boolean;
	showDivider?: boolean;
	selected?: boolean;
	disabled?: boolean;
	children?: ReactNode | string;
	footer?: ReactNode | string;
	header?: ReactNode | string;
	actions?: ReactNode | string;
}
export const Card: FC<CardProps> = ({
	shape = Shape.DEFAULT,
	showHeader = true,
	showBody = true,
	showFooter = true,
	showDivider = true,
	selected = false,
	disabled = false,
	children,
	footer,
	header,
	actions,
	dataAttributes,
}) => {
	const renderHeader = () => (
		<div className="flex items-center">
			<div className="mr-3 leading-tight text-sm font-bold">{header}</div>
			<div className="flex relative ml-auto w-24 shrink-0">{actions}</div>
		</div>
	);

	const renderBody = () => (
		<div
			className={classNames("flex items-center space-x-4", {
				"border-t border-gray-200 dark:border-gray-700":
					showDivider && showHeader,
			})}
		>
			{children}
		</div>
	);

	const renderFooter = () => (
		<div
			className={classNames({
				"border-t border-gray-200 dark:border-gray-700":
					showDivider && (showBody || showHeader),
			})}
		>
			{footer}
		</div>
	);

	const classes = classNames(
		"relative overflow-hidden bg-white dark:bg-gray-800 shadow isolate px-6 py-4 md:col-span-4 h-full",
		shape === Shape.DEFAULT && "rounded-lg",
		shape === Shape.ROUNDED && "rounded-[24px]",
		shape === Shape.SQUARE && "rounded-none",
		{
			selected: selected,
			disabled: disabled,
		}
	);

	return (
		<div className={classes} {...dataAttributes}>
			<div className="card-content">
				<div className="flex flex-col gap-4">
					{showHeader && renderHeader()}
					{showBody && renderBody()}
					{showFooter && renderFooter()}
				</div>
			</div>
		</div>
	);
};
