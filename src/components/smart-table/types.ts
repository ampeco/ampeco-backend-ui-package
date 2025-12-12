import { Sort } from '../../types/Sort';

export enum ValidatorsEnum {
	MIN = 'min',
	MAX = 'max',
	REQUIRED = 'required',
	EMAIL = 'email',
	MIN_LENGTH = 'minLength',
	MAX_LENGTH = 'maxLength',
	PATTERN = 'pattern',
}

export type SelectOption = {
	label: string;
	value: string;
}

export type InputType = 'text' | 'email' | 'password' | 'number' | 'select';

export type HeadersConfig<T> = T extends BaseTType ? {
	key: keyof T;
	label: string;
	inputType?: InputType;
	inputOptions?: SelectOption[];
} : never

export type ReadonlyFields<T> = Array<keyof T>;

export type ActionsConfig = {
	position: 'left' | 'right';
	addLabel: string;
	editLabel: string;
	cancelLabel: string;
	deleteLabel: string;
	columnLabel: string;
}

export type FormFieldConfig<T> = {
	key: keyof T,
	validators: ValidatorConfig[]
};

export type ValidatorConfig = {
	validatorType: ValidatorsEnum;
	errorMessage: string;
	param?: any;
}

export type SortState<T> = {
	columnName: keyof T | '';
	type: Sort;
};

export type BaseTType = { rowId?: string } & Record<string, any>;

export type RowUpdateType = 'added' | 'edited' | 'deleted';