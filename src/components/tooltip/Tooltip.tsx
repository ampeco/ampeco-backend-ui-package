import classNames from "classnames";
import React, { useState } from "react";
import DataAttributes from "../../types/DataAttributes";
import { Shape } from "../../types/Shape";
import { TooltipPosition } from "./enums/TooltipPosition.enum";

interface TooltipProps extends DataAttributes {
	message: string;
	position?: TooltipPosition;
	shape?: Shape;
	children: React.ReactNode;
	className?: string;
	wrapperClass?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
	children,
	message,
	position = TooltipPosition.BOTTOM,
	shape = Shape.DEFAULT,
	className = "",
	wrapperClass = "",
	dataAttributes,
}) => {
	let timeout: NodeJS.Timeout;

	const [isVisible, setIsVisible] = useState(false);

	const onShowTooltip = () => {
		timeout = setTimeout(() => {
			setIsVisible(true);
		}, 500);
	};

	const onHideTooltip = () => {
		clearTimeout(timeout);
		setIsVisible(false);
	};

	return (
		<div
			className={classNames("inline-block relative", wrapperClass)}
			onMouseEnter={onShowTooltip}
			onMouseLeave={onHideTooltip}
		>
			{isVisible && (
				<span
					{...dataAttributes}
					className={classNames(
						"absolute p-2 px-4",
						"bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200",
						shape === Shape.DEFAULT && "rounded-lg",
						shape === Shape.ROUNDED && "rounded-[24px]",
						shape === Shape.SQUARE && "rounded-none",
						position === TooltipPosition.LEFT &&
							"right-full top-1/2 -translate-y-1/2 -translate-x-2",
						position === TooltipPosition.RIGHT &&
							"left-full top-1/2 -translate-y-1/2 translate-x-2",
						position === TooltipPosition.TOP &&
							"bottom-full left-1/2 -translate-x-1/2 -translate-y-2",
						position === TooltipPosition.BOTTOM &&
							"top-full left-1/2 -translate-x-1/2 translate-y-2",
						className
					)}
				>
					<div
						className={classNames(
							"w-0 h-0 absolute",
							position === TooltipPosition.LEFT &&
								"-right-2 top-1/2 -translate-y-1/2 border-t-14 border-b-14 border-l-14 border-t-transparent border-b-transparent border-l-gray-200 dark:border-l-gray-800",
							position === TooltipPosition.RIGHT &&
								"-left-2 top-1/2 -translate-y-1/2 border-t-14 border-b-14 border-r-14 border-t-transparent border-b-transparent border-r-gray-200 dark:border-r-gray-800",
							position === TooltipPosition.TOP &&
								"-bottom-2 left-1/2 -translate-x-1/2 border-t-14 border-r-14 border-l-14 border-r-transparent border-l-transparent border-t-gray-200 dark:border-t-gray-800",
							position === TooltipPosition.BOTTOM &&
								"-top-2 left-1/2 -translate-x-1/2 border-b-14 border-r-14 border-l-14 border-t-transparent border-r-transparent border-l-transparent border-b-gray-200 dark:border-b-gray-800"
						)}
					/>
					{message.split("\n").map((line: string, index: number) => {
						return (
							<p key={index} className="text-sm whitespace-nowrap">
								{line}
							</p>
						);
					})}
				</span>
			)}
			{children}
		</div>
	);
};
