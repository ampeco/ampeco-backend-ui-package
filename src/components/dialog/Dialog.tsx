import { XMarkIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { MouseEvent, ReactNode, useEffect } from "react";
import DataAttributes from "../../types/DataAttributes";
import { Shape } from "../../types/Shape";

interface DialogProps extends DataAttributes {
	className?: classNames.Value;
	onClose?: (source: "key" | "button" | "backdrop") => void;
	width?: number | string;
	minWidth?: number | string;
	height?: number | string;
	minHeight?: number | string;
	header?: ReactNode;
	footer?: ReactNode;
	children?: ReactNode;
	shape?: Shape;
}

export const Dialog = ({
	onClose,
	className,
	width,
	minWidth,
	height,
	minHeight,
	header,
	footer,
	children,
	dataAttributes,
	shape = Shape.DEFAULT,
}: DialogProps) => {
	useEffect(() => {
		const handler = () => {
			if (onClose) {
				onClose("key");
			}
		};

		document.addEventListener("keydown", ({ key }) => {
			if (key === "Escape") {
				onClose && onClose("key");
			}
		});
		return () => document.removeEventListener("keydown", handler);
	}, [onClose]);

	const handleClickBackdrop = (event: MouseEvent) => {
		if (event.target === event.currentTarget) {
			if (onClose) {
				onClose("backdrop");
			}
		}
	};

	const handleClickDialog = (event: MouseEvent) => {
		const target = event.target as Element;

		const isDropdownClick =
			target?.closest(".dropdown") ||
			target?.closest(".select-field") ||
			target?.closest(".datepicker-field") ||
			target?.closest(".select-dropdown") ||
			target?.closest(".datepicker-dropdown");

		if (event.target === event.currentTarget || isDropdownClick) {
			event.stopPropagation();
		}
	};

	const handleClickClose = () => {
		if (onClose) {
			onClose("button");
		}
	};

	const wrapperClasses = classNames(
		"relative overflow-hidden bg-white dark:bg-gray-800 shadow isolate px-6 py-4",
		shape === Shape.DEFAULT && "rounded-lg",
		shape === Shape.ROUNDED && "rounded-[24px]",
		shape === Shape.SQUARE && "rounded-none"
	);
	const contentClasses = classNames(className);

	return (
		<div
			className="fixed top-0 right-0 bottom-0 left-0 bg-black/40 z-50 flex items-center justify-center"
			onMouseDown={handleClickBackdrop}
			{...dataAttributes}
		>
			<div className={wrapperClasses}>
				<div
					className={contentClasses}
					onMouseDown={handleClickDialog}
					style={{
						width: width,
						minWidth: minWidth,
						height: height,
						minHeight: minHeight,
					}}
				>
					<XMarkIcon
						aria-label="Close"
						className="absolute top-2 right-2 cursor-pointer w-4 h-4"
						onClick={handleClickClose}
					/>
					<header>{header}</header>
					{footer ? <section>{children}</section> : <div>{children}</div>}
					<footer>{footer}</footer>
				</div>
			</div>
		</div>
	);
};
