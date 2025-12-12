import { FC, ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";

import DataAttributes from "../../types/DataAttributes";
import { Shape } from "../../types/Shape";

interface AlertProps extends DataAttributes {
	type?: "primary" | "success" | "danger" | "warning";
	shape?: Shape;
	closeable?: boolean;
	onClose?: () => void;
	className?: classNames.Value;
	children?: ReactNode;
}

export const Alert: FC<AlertProps> = ({
	type = "primary",
	shape = Shape.DEFAULT,
	closeable,
	onClose,
	className,
	children,
	dataAttributes,
}) => {
	const classes = classNames(
		"px-4 py-3 border-2 relative",
		type === "primary" && "border-primary-500 bg-primary-50",
		type === "success" && "border-success-500 bg-success-50",
		type === "danger" && "border-danger-500 bg-danger-50",
		type === "warning" && "border-warning-500 bg-warning-50",
		shape === Shape.DEFAULT && "rounded-lg",
		shape === Shape.ROUNDED && "rounded-full",
		shape === Shape.SQUARE && "rounded-none",
		className
	);

	return (
		<div className={classes} role="alert" {...dataAttributes}>
			{children}
			{closeable && (
				<XMarkIcon
					className="w-4 h-4 absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
					onClick={onClose}
					aria-label="Close"
				/>
			)}
		</div>
	);
};
