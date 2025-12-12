import type { ReactNode } from 'react';

export interface SelectOption<T extends string | number> {
	label: string;
	value: T;
	disabled?: boolean;
	renderOption?: ReactNode;
}
