import { Sort } from '../../../types/Sort';
import { BaseTType, HeadersConfig } from '../types';

export const getSortedData = <A, B, T>(column: keyof T, sortingType: Sort, tableData: T[]) => {
	tableData.sort((a, b) => {
		if (a[column] < b[column]) {
			return sortingType === Sort.ASC ? -1 : 1;
		}
		if (a[column] > b[column]) {
			return sortingType === Sort.ASC ? 1 : -1;
		}
		return 0;
	});

	return tableData;
};

export const getSortingType = <T,>(columnName: keyof T, sortedColumn: keyof T | string, currType: Sort) => {
	if (sortedColumn === columnName) {
		if (currType) {
			if (currType === Sort.ASC
			) {
				return Sort.DESC;
			} else {
				return Sort.DEFAULT;
			}
		} else {
			return Sort.ASC;
		}
	}
	return Sort.ASC;
};

export const getNewRowObject = <T extends BaseTType>(columns: HeadersConfig<T>[]) => {
	const emptyValuesObject = columns.reduce((acc, column) => {
		const columnKey = column.key as keyof T;
		acc[columnKey] = '' as any;
		return acc;
	}, { rowId:crypto.randomUUID() } as T);

	return emptyValuesObject;
};