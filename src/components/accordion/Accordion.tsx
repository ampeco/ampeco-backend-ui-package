import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { ReactNode } from "react";
import { useDefaultValueState } from "../../hooks/internal/useDefaultValueState";
import DataAttributes from "../../types/DataAttributes";
import { Shape } from "../../types/Shape";
import { Tooltip } from "../tooltip/Tooltip";
import { TooltipPosition } from "../tooltip/enums/TooltipPosition.enum";

export enum TogglerPosition {
	LEFT = "left",
	RIGHT = "right",
}

export enum TogglerOrigin {
	HEADER = "header",
	ARROW = "arrow",
}

export enum AccordionVariant {
	FILL = "fill",
	TRANSPARENT = "transparent",
}

interface AccordionProps extends DataAttributes {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	defaultOpen?: boolean;
	className?: classNames.Value;
	headerClassName?: classNames.Value;
	children?: ReactNode;
	header?: ReactNode;
	clickHandler?: () => void;
	shape?: Shape;
	togglerPosition?: TogglerPosition;
	togglerOrigin?: TogglerOrigin;
	togglerTooltip?: string | null;
	togglerIconRef?: ReactNode;
	variant?: AccordionVariant;
}

export const Accordion = ({
	open: openProp,
	defaultOpen = false,
	onOpenChange,
	className,
	headerClassName,
	header,
	clickHandler,
	children,
	dataAttributes,
	shape = Shape.DEFAULT,
	togglerPosition = TogglerPosition.RIGHT,
	togglerOrigin = TogglerOrigin.ARROW,
	togglerTooltip = null,
	togglerIconRef = null,
	variant = AccordionVariant.FILL,
}: AccordionProps) => {
	const [isOpen, setIsOpen] = useDefaultValueState(
		defaultOpen,
		openProp,
		onOpenChange
	);

	const handleToggle = (element: TogglerOrigin) => {
		if (element === togglerOrigin) {
			if (clickHandler) {
				clickHandler();
			}
			setIsOpen(!isOpen);
		}
	};

	const getToggleIconRef = () => {
		if (togglerIconRef === null) {
			return isOpen ? (
				<ChevronDownIcon className="w-4 h-4" />
			) : (
				<ChevronRightIcon className="w-4 h-4" />
			);
		}
		return togglerIconRef;
	};

	const classes = classNames(
		"w-full flex flex-col",
		variant === AccordionVariant.FILL && "bg-white dark:bg-gray-800 shadow",
		shape === Shape.DEFAULT && "rounded-lg",
		shape === Shape.ROUNDED && "rounded-[24px]",
		shape === Shape.SQUARE && "rounded-none",
		className,
		{
			toggled: isOpen,
		}
	);

	const headerClasses = classNames(
		"flex items-center flex-1 h-9 p-2 md:p-3 w-full",
		togglerOrigin === TogglerOrigin.HEADER && "cursor-pointer",
		TogglerPosition.RIGHT === togglerPosition && "justify-between",
		TogglerPosition.LEFT === togglerPosition && "flex-row-reverse justify-end",
		headerClassName
	);

	const bodyClasses = classNames(
		"p-2 md:p-3 border-t border-gray-200 dark:border-gray-700"
	);

	return (
		<div className={classes} {...dataAttributes}>
			<div
				className={headerClasses}
				onClick={() => handleToggle(TogglerOrigin.HEADER)}
			>
				{header}
				{togglerTooltip !== null && (
					<Tooltip
						shape={shape}
						message={togglerTooltip}
						position={
							togglerPosition === TogglerPosition.LEFT
								? TooltipPosition.RIGHT
								: TooltipPosition.LEFT
						}
					>
						<div
							onClick={() => handleToggle(TogglerOrigin.ARROW)}
							className="cursor-pointer"
						>
							{getToggleIconRef()}
						</div>
					</Tooltip>
				)}
				{togglerTooltip === null && (
					<div
						onClick={() => handleToggle(TogglerOrigin.ARROW)}
						className="cursor-pointer"
					>
						{getToggleIconRef()}
					</div>
				)}
			</div>
			{isOpen && <div className={bodyClasses}>{children}</div>}
		</div>
	);
};
