import { ReactElement } from "react";
import { usePopover } from "./PopoverContext";

interface PopoverCloseProps {
	children: ReactElement;
	onClick?: () => void;
	className?: string;
}

export const PopoverClose = ({
	children,
	onClick: controlledOnClick,
	className,
}: PopoverCloseProps) => {
	const { setIsOpened } = usePopover();

	const onClick = () => {
		controlledOnClick?.();
		setIsOpened(false);
	};


	return <div className={`${className} close-button`} onClick={onClick}>
		{children}
	</div>;
};