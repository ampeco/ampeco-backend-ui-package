import { XMarkIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { ReactNode } from "react";
import { NotificationType } from "../../types/Notification";
import DataAttributes from "../../types/DataAttributes";
import { Shape } from "../../types/Shape";

interface NotificationProps extends DataAttributes {
	type?: NotificationType;
	closable?: boolean;
	onClose?: () => void;
	children?: ReactNode;
	shape?: Shape;
}

export const Notification = ({
	type,
	closable,
	onClose,
	children,
	dataAttributes,
	shape = Shape.DEFAULT,
}: NotificationProps) => {
	const classes = classNames(
		"bg-white dark:bg-gray-800 shadow isolate px-6 py-4",
		type === "default" && "bg-gray-200 text-gray-600",
		type === "success" && "bg-success-100 text-success-600",
		type === "warning" && "bg-warning-100 text-warning-600",
		type === "danger" && "bg-danger-100 text-danger-600",
		shape === Shape.DEFAULT && "rounded-lg",
		shape === Shape.ROUNDED && "rounded-full",
		shape === Shape.SQUARE && "rounded-none"
	);

	return (
		<div className={classes} {...dataAttributes}>
			<div className="flex items-center justify-between">
				{children}
				{closable && (
					<XMarkIcon
						className="w-4 h-4 cursor-pointer"
						onClick={onClose}
						data-testid="close-button"
					/>
				)}
			</div>
		</div>
	);
};
