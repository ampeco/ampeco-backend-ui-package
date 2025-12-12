import { XMarkIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { MouseEvent, ReactNode, useEffect, useState, useCallback } from "react";
import DataAttributes from "../../types/DataAttributes";

interface DrawerProps extends DataAttributes {
	className?: classNames.Value;
	onClose?: (source: "key" | "button" | "backdrop") => void;
	width?: number | string;
	minWidth?: number | string;
	header?: ReactNode;
	footer?: ReactNode;
	children?: ReactNode;
}

export const Drawer = ({
	onClose,
	className,
	width,
	minWidth,
	header,
	footer,
	children,
	dataAttributes,
}: DrawerProps) => {
	const [isClosing, setIsClosing] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		// Trigger slide-in animation after mount
		setIsMounted(true);
	}, []);

	const handleClose = useCallback(
		(source: "key" | "button" | "backdrop") => {
			if (isClosing) return;
			setIsClosing(true);
			// Wait for animation to complete before calling onClose
			setTimeout(() => {
				if (onClose) {
					onClose(source);
				}
			}, 300); // Match animation duration
		},
		[isClosing, onClose]
	);

	useEffect(() => {
		const handler = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				handleClose("key");
			}
		};

		document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	}, [handleClose]);

	const handleClickBackdrop = (event: MouseEvent) => {
		if (event.target === event.currentTarget) {
			handleClose("backdrop");
		}
	};

	const handleClickDrawer = (event: MouseEvent) => {
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
		handleClose("button");
	};

	const backdropClasses = classNames(
		"fixed top-0 right-0 bottom-0 left-0 bg-black/40 z-50",
		"transition-opacity duration-300 ease-out",
		isClosing || !isMounted ? "opacity-0" : "opacity-100"
	);

	const drawerClasses = classNames(
		"absolute top-0 right-0 bottom-0 h-auto overflow-hidden bg-white dark:bg-gray-800 shadow isolate px-6 py-4",
		"transition-transform duration-300 ease-out",
		isClosing || !isMounted ? "translate-x-full" : "translate-x-0",
		className
	);

	return (
		<div
			className={backdropClasses}
			onMouseDown={handleClickBackdrop}
			{...dataAttributes}
		>
			<div
				className={drawerClasses}
				onMouseDown={handleClickDrawer}
				style={{
					width: width || "650px",
					minWidth: minWidth || "450px",
				}}
			>
				{header && <div className="mb-4">{header}</div>}
				{onClose && (
					<XMarkIcon
						aria-label="Close"
						className="absolute top-2 right-2 cursor-pointer w-4 h-4"
						onClick={handleClickClose}
					/>
				)}
				<div className="mb-4">{children}</div>
				{footer && <div className="mt-4">{footer}</div>}
			</div>
		</div>
	);
};
