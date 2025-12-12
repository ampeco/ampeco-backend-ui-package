import { ReactNode } from "react";
import { PopoverProvider, Position } from "./PopoverContext";
import { Shape } from '../../types/Shape';

interface PopoverProps {
	children: ReactNode;
	preferredPosition: Position;
	shape?: Shape;
}

export const Popover = ({
	children,
	preferredPosition,
	shape = Shape.DEFAULT,
}: PopoverProps) => {
	return (
		<PopoverProvider preferredPosition={preferredPosition} shape={shape}>
			{children}
		</PopoverProvider>
	);
};



