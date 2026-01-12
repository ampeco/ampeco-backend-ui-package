import { ReactNode } from "react";
import classNames from "classnames";

import {
	ChevronDownIcon,
	ChevronUpIcon,
	XMarkIcon,
} from "@heroicons/react/24/solid";

import { Shape } from "../../../types/Shape";
import { Sort } from "../../../types/Sort";
import { DataAttributesType } from "../../../types/DataAttributes";

import {
	ActionsConfig,
	BaseTType,
	FormFieldConfig,
	HeadersConfig,
	ReadonlyFields,
} from "../types";

import { Checkbox } from "../../field/checkbox/Checkbox";
import { getNewRowObject, getSortingType } from "../utils/tableHelpers";
import SmartTableRow from "./SmartTableRow";

export type DesktopProps<T extends BaseTType> = {
	tableData: T[];
	columns: HeadersConfig<T>[];
	shape?: Shape;
	selectedRows: Record<string, ReactNode>[];
	hiddenColumns: Array<keyof T>;
	sortedColumn: { columnName: keyof T | ""; type: Sort };
	stripped?: boolean;
	canAdd?: boolean;
	canEdit?: boolean;
	canDelete?: boolean;
	canSelect?: boolean;
	canHideColumns?: boolean;
	editableRowIndex: number | null;
	tempRowData: Partial<T>;
	dataAttributes: DataAttributesType | undefined;
	enableColumnsReorder?: boolean;
	actionsConfig?: ActionsConfig;
	readonlyFields?: ReadonlyFields<T>;
	formFieldConfigs?: FormFieldConfig<T>[];
	hideColumn: (key: keyof T) => void;
	handleSelectSingleRow: (row: T) => (checked: boolean) => void;
	handleCellClick: (rowIndex: number) => void;
	handleSelectAllRows: (checked: boolean) => void;
	handleColumnSort: (key: keyof T, sortingType: Sort) => void;
	handleDragColumnStart: (e: React.DragEvent, index: number) => void;
	handleDropColumn: (e: React.DragEvent, index: number) => void;
	handleCancelRowEdit: () => void;
	handleAddRow: (rowIndex: number, row: Partial<T>) => void;
	handleSaveRow: (rowIndex: number, row: Partial<T>) => void;
	handleDeleteRow: (rowIndex: number, row: Partial<T>) => void;
};

const DesktopTable = <T extends BaseTType>(props: DesktopProps<T>) => {
	const {
		shape,
		stripped,
		tableData,
		selectedRows,
		hiddenColumns,
		sortedColumn,
		canAdd,
		canEdit,
		canSelect,
		canHideColumns,
		columns,
		editableRowIndex,
		dataAttributes,
		hideColumn,
		actionsConfig,
		enableColumnsReorder,
		handleSelectAllRows,
		handleColumnSort,
		handleDragColumnStart,
		handleDropColumn,
	} = props;

	const withLeftActionColumn =
		(editableRowIndex !== null || canAdd) && actionsConfig?.position === "left";
	const withRightActionColumn =
		(editableRowIndex !== null || canAdd) &&
		actionsConfig?.position === "right";

	const renderBulkSelect = () => (
		<th key="select-header" className="px-2">
			<Checkbox
				name="select all"
				checked={selectedRows.length === tableData.length}
				onChangeEvent={(e) => handleSelectAllRows(e.target.checked)}
			/>
		</th>
	);

	const renderSortIcon = () => {
		if (sortedColumn.type === Sort.ASC) {
			return (
				<ChevronDownIcon
					className="w-4 h-4 cursor-pointer"
					data-testid="icon-asc"
				/>
			);
		}

		return (
			<ChevronUpIcon
				className="w-4 h-4 cursor-pointer"
				data-testid="icon-desc"
			/>
		);
	};

	const renderDesktopTableHeader = (
		{ key, label }: HeadersConfig<T>,
		headerIndex: number
	) => {
		const sortingType =
			getSortingType(key, sortedColumn.columnName, sortedColumn.type) ||
			Sort.DEFAULT;
		const showSortingIcon = sortedColumn.columnName === key;

		const handleHideColumn = (e: React.MouseEvent<SVGSVGElement>) => {
			e.stopPropagation();
			if (hideColumn) hideColumn(key);
		};

		return (
			<th
				key={key}
				style={{ width: `${100 / columns.length}%` }}
				onClick={() => handleColumnSort(key, sortingType)}
				draggable={enableColumnsReorder}
				onDragStart={(e) => handleDragColumnStart(e, headerIndex)}
				onDragOver={(e) => e.preventDefault()}
				onDrop={(e) => handleDropColumn(e, headerIndex)}
				className="text-left px-2 whitespace-nowrap uppercase text-gray-500 text-xxs tracking-wide py-2"
			>
				<div className="flex items-center gap-1">
					{label}
					{showSortingIcon && renderSortIcon()}
				</div>
				{canHideColumns && (
					<div className="hide-column-icon">
						<XMarkIcon
							className="w-4 h-4 cursor-pointer"
							onClick={handleHideColumn}
							data-testid={`hide-column-button-${key}`}
						/>
					</div>
				)}
			</th>
		);
	};

	const renderActionsColumn = () => (
		<th className="px-2" style={{ width: `${100 / columns.length}%` }}>
			{actionsConfig?.columnLabel}
		</th>
	);

	const desktopTableClasses = classNames(
		"hidden md:table w-full bg-white dark:bg-gray-800 overflow-hidden shadow divide-y divide-gray-100 dark:divide-gray-700",
		shape === Shape.DEFAULT && "rounded-lg",
		shape === Shape.ROUNDED && "rounded-[24px]",
		shape === Shape.SQUARE && "rounded-none"
	);

	return (
		<table
			data-testid="desktop-table"
			className={desktopTableClasses}
			{...dataAttributes}
		>
			<thead className="bg-gray-50 dark:bg-gray-800">
				<tr>
					{canSelect && renderBulkSelect()}
					{withLeftActionColumn && (canEdit || canAdd) && renderActionsColumn()}
					{columns
						.filter(({ key }) => !hiddenColumns.includes(key))
						.map(renderDesktopTableHeader)}
					{withRightActionColumn &&
						(canEdit || canAdd) &&
						renderActionsColumn()}
				</tr>
			</thead>
			<tbody className="divide-y divide-gray-100 dark:divide-gray-700">
				{canAdd && (
					<SmartTableRow<T>
						{...props}
						canEdit
						key={-1}
						newRow
						row={getNewRowObject(columns)}
						rowIndex={-1}
						editableRowIndex={-1}
						isRowSelected
						readonlyFields={[]}
						withLeftActionColumn={actionsConfig?.position === "left"}
						withRightActionColumn={actionsConfig?.position === "right"}
						className={classNames(
							stripped &&
								"odd:bg-white even:bg-gray-50 dark:odd:bg-gray-700 dark:even:bg-gray-800"
						)}
					/>
				)}
				{tableData.map((row, rowIndex) => {
					const isRowSelected = selectedRows.some((s) => s.rowId === row.rowId);

					return (
						<SmartTableRow<T>
							{...props}
							key={rowIndex}
							row={row}
							rowIndex={rowIndex}
							isRowSelected={isRowSelected}
							withLeftActionColumn={withLeftActionColumn}
							withRightActionColumn={withRightActionColumn}
							className={classNames(
								stripped &&
									"odd:bg-white even:bg-gray-50 dark:odd:bg-gray-700 dark:even:bg-gray-800"
							)}
						/>
					);
				})}
			</tbody>
		</table>
	);
};

export default DesktopTable;
