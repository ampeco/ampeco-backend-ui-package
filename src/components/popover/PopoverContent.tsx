import { ReactNode, useLayoutEffect, useRef, useState } from "react";
import { usePopover } from "./PopoverContext";
import { getPopoverCoords } from "./getPopoverCoords";
import classNames from "classnames";
import { PopoverClose } from "./PopoverClose";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Shape } from "../../types/Shape";

interface PopoverContentProps {
	children: ReactNode;
}

interface PopoverContentInternalProps {
	children: ReactNode;
}

export const PopoverContent = ({ children }: PopoverContentProps) => {
	const { isOpened } = usePopover();

	if (!isOpened) {
		return null;
	}

	return <PopoverContentInternal>{children}</PopoverContentInternal>;
};

export const PopoverContentInternal = ({
	children,
}: PopoverContentInternalProps) => {
	const { triggerPosition, preferredPosition, isOpened, setIsOpened, shape } =
		usePopover();
	const ref = useRef<HTMLDialogElement>(null);
	const [coords, setCoords] = useState({
		top: 0,
		left: 0,
	});

	useLayoutEffect(() => {
		const element = ref.current;

		if (!element) {
			return;
		}

		const contentPosition = element.getBoundingClientRect();

		const coords = getPopoverCoords(
			triggerPosition,
			contentPosition,
			preferredPosition
		);

		setCoords(coords);
	}, []);

	const bodyClasses = classNames(
		"relative overflow-hidden bg-white dark:bg-gray-800 shadow isolate px-6 py-4 md:col-span-4",
		shape === Shape.DEFAULT && "rounded-lg",
		shape === Shape.ROUNDED && "rounded-[24px]",
		shape === Shape.SQUARE && "rounded-none"
	);

	return (
		<dialog
			ref={ref}
			open={true}
			className={bodyClasses}
			style={{
				left: `${coords.left}px`,
				top: `${coords.top}px`,
				border: "none",
			}}
		>
			<PopoverClose className="absolute top-2 right-2">
				<XMarkIcon className="w-4 h-4 cursor-pointer" />
			</PopoverClose>
			<div className="">{children}</div>
		</dialog>
	);
};
