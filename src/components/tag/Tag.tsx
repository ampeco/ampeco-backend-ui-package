import { XMarkIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { ReactNode } from "react";
import DataAttributes from "../../types/DataAttributes";
import { Shape } from "../../types/Shape";

interface TagProps extends DataAttributes {
	/**
	 * Sets the color of the tag
	 * @default default
	 */
	type?: "default" | "danger" | "success" | "warning" | "info" | "primary";
	/**
	 * Adds an icon that triggers the {@link onClose} event
	 * @default false
	 */
	closable?: boolean;
	/**
	 * Fires when the tag is closed. **Doesn't actually hide the tag.**
	 * @see closable
	 */
	onClose?: () => void;
	className?: classNames.Value;
	children?: ReactNode;
	shape?: Shape;
}

export const Tag = ({
	type = "default",
	closable,
	onClose,
	className,
	children,
	dataAttributes,
	shape = Shape.DEFAULT,
}: TagProps) => {
	const classes = classNames(
		"inline-flex items-center px-2.5 py-0.5 text-xs font-extrabold uppercase",
		type === "default" && "bg-gray-200 text-gray-600",
		type === "danger" && "bg-danger-100 text-danger-600",
		type === "success" && "bg-success-100 text-success-600",
		type === "warning" && "bg-warning-100 text-warning-600",
		type === "info" && "bg-cyan-100 text-cyan-600",
		type === "primary" && "bg-primary-100 text-primary-600",
		shape === Shape.DEFAULT && "rounded-lg",
		shape === Shape.ROUNDED && "rounded-full",
		shape === Shape.SQUARE && "rounded-none",
		className
	);

	return (
		<div className={classes} {...dataAttributes}>
			{children}
			{closable && (
				<XMarkIcon className="w-4 h-4 cursor-pointer" onClick={onClose} />
			)}
		</div>
	);
};
