import { Position, Rect } from "./PopoverContext";

const COMPONENT_GAP = 10;

export enum PositionEnum {
	TOP = "top",
	BOTTOM = "bottom",
	LEFT = "left",
	RIGHT = "right",
}

export function getPopoverCoords(
	triggerPosition: Rect,
	popoverPosition: Rect,
	position: Position
) {
	switch (position) {
		case PositionEnum.TOP: {
			let top = triggerPosition.top - popoverPosition.height - COMPONENT_GAP;
			let left = Math.max(
				COMPONENT_GAP,
				triggerPosition.left +
					triggerPosition.width / 2 -
					popoverPosition.width / 2
			);
			if (top < 0) {
				top = triggerPosition.top + triggerPosition.height + COMPONENT_GAP;
			}
			return {
				top,
				left,
			};
		}
		case PositionEnum.LEFT: {
			let top = Math.max(
				COMPONENT_GAP,
				triggerPosition.top +
					triggerPosition.height / 2 -
					popoverPosition.height / 2
			);
			let left = triggerPosition.left - popoverPosition.width - COMPONENT_GAP;
			if (left < 0) {
				left = triggerPosition.left + triggerPosition.width + COMPONENT_GAP;
			}
			return {
				top,
				left,
			};
		}
		case PositionEnum.RIGHT: {
			let top = Math.max(
				COMPONENT_GAP,
				triggerPosition.top +
					triggerPosition.height / 2 -
					popoverPosition.height / 2
			);
			let left = triggerPosition.left + triggerPosition.width + COMPONENT_GAP;

			return {
				top,
				left,
			};
		}
		case PositionEnum.BOTTOM:
		default: {
			let top = triggerPosition.top + triggerPosition.height + COMPONENT_GAP;
			let left = Math.max(
				COMPONENT_GAP,
				triggerPosition.left +
					triggerPosition.width / 2 -
					popoverPosition.width / 2
			);

			if (top + popoverPosition.height > window.innerHeight - 10) {
				top = triggerPosition.top - 10 - popoverPosition.height;
			}

			return {
				top,
				left,
			};
		}
	}
}
