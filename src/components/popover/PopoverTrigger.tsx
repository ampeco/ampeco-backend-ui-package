import React, { ReactElement, ReactNode, cloneElement, useEffect, useRef } from 'react';
import { usePopover } from './PopoverContext';

interface PopoverTriggerProps {
	children: ReactNode;
	onClick?: () => void;
	className?: () => void;
}

export const PopoverTrigger: React.FC<PopoverTriggerProps> = ({
	children,
	onClick: controlledOnClick,
	className,
}: PopoverTriggerProps) => {
	const { setIsOpened, setTriggerPosition, isOpened } = usePopover();
	const ref = useRef<HTMLElement>(null);

	const handleOnClick = () => {
		controlledOnClick?.();

		const element = ref.current;

		if (!element) {
			return false;
		}

		const rect = element.getBoundingClientRect();
		setTriggerPosition(rect);

		setIsOpened((isOpened) => !isOpened);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				ref.current &&
				!ref.current.contains(event.target as Node) &&
				isOpened
			) {
				setIsOpened(false);
			}
		};
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	if (!React.isValidElement(children)) {
		throw new Error('PopoverTrigger children must be a valid React element');
	}

	const childrenToTriggerPopover = cloneElement(children as ReactElement, {
		onClick: handleOnClick,
		ref,
		className: className || '',
	} as any);

	return childrenToTriggerPopover;
};
