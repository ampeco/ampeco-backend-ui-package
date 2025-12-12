import {ReactNode} from 'react';

export interface BreadcrumbItem {
	id: string;
	text: ReactNode;
	disabled?: boolean;
}