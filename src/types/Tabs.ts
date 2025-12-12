import { ReactElement, ReactNode } from "react";
import DataAttributes from "./DataAttributes";

export interface BaseTabsProps extends DataAttributes {
	defaultSelected?: string;
}
export interface TabsProps extends BaseTabsProps {
	selected?: string | number | undefined | null;
	onSelectedChange?: (selected: string | number) => void;
	shouldChange?: (
		selected: string | number,
		previous: string | number | null | undefined
	) => boolean;
	children?: (ReactElement<TabProps> | null)[];
}

export interface BaseTabProps extends DataAttributes {
	id: string;
	title?: ReactNode;
	dataTestId?: string;
}

export interface TabProps extends BaseTabProps {
	children?: ReactNode;
}

export interface TabContext {
	selected?: string | number | undefined | null;
}
