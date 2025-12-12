import { useEffect, useState } from 'react';

import DataAttributes from '../../types/DataAttributes';
import { Shape } from '../../types/Shape';
import { Sort } from '../../types/Sort';

import {
	ActionsConfig,
	BaseTType,
	FormFieldConfig,
	HeadersConfig,
	ReadonlyFields,
	RowUpdateType,
	SortState
} from './types';

import { Tag } from '../tag/Tag';
import { getSortedData } from './utils/tableHelpers';
import MobileTable from './components/MobileTable';
import DesktopTable from './components/DesktopTable';

export interface SmartTableProps<T extends BaseTType> extends DataAttributes {
	rows: T[];
	headers: HeadersConfig<T>[];
	actionsConfig?: ActionsConfig;
	readonlyFields?: ReadonlyFields<T>;
	formFieldConfigs?: FormFieldConfig<T>[];
	shape?: Shape
	stripped?: boolean;
	canEdit?: boolean;
	canAdd?: boolean;
	canDelete?: boolean;
	canSelect?: boolean;
	canHideColumns?: boolean;
	enableColumnsReorder?: boolean;
	onSelectRows?: (rows: T[]) => void;
	onRowUpdate?: (updatedRow: T, rowIndex: number, actionType: RowUpdateType) => void;
}

export const SmartTable = <T extends BaseTType>(props: SmartTableProps<T>) => {
	const {
		rows,
		headers,
		dataAttributes,
		shape = Shape.DEFAULT,
		enableColumnsReorder,
		onRowUpdate,
		onSelectRows
	} = props;

	const [tableData, setTableData] = useState(rows);
	const [selectedRows, setSelectedRows] = useState<T[]>([]);
	const [columns, setColumns] = useState(headers);
	const [sortedColumn, setSortedColumn] = useState<SortState<T>>({ columnName: '', type: Sort.DEFAULT });
	const [hiddenColumns, setHiddenColumns] = useState<Array<keyof T>>([]);
	const [editableRowIndex, setEditableRowIndex] = useState<number | null>(null);
	const [tempRowData, setTempRowData] = useState<Partial<T>>({});

	const resetRowEdit = () => {
		setEditableRowIndex(null);
		setTempRowData({});
	};

	const showHiddenColumn = (hiddenColumn: keyof T) => () => {
		setHiddenColumns((prev) => prev.filter((p) => p !== hiddenColumn));
	};

	const emitRowUpdate = (updatedRow: T, rowIndex: number, actionType: RowUpdateType) => {
		if (!onRowUpdate) return;

		onRowUpdate(updatedRow, rowIndex, actionType);
	};

	const handleAddRow = (rowIndex: number, row: Partial<T>) => {
		const updatedRow = { ...tableData[rowIndex], ...row };

		setTableData((prevData) => {
			prevData = [row as T, ...prevData];
			return prevData;
		});

		emitRowUpdate(updatedRow, rowIndex, 'added');
		resetRowEdit();
	};

	const handleSaveRow = (rowIndex: number, row: Partial<T>) => {
		const updatedRow = { ...tableData[rowIndex], ...row };

		setTableData((prevData) => {
			const newData = prevData ? [...prevData] : [];
			newData[rowIndex] = updatedRow;
			return newData;
		});

		emitRowUpdate(updatedRow, rowIndex, 'edited');
		resetRowEdit();
	};

	const handleDeleteRow = (rowIndex: number, row: Partial<T>) => {
		setTableData((prevData) => prevData.filter((pr) => pr.rowId !== row.rowId));
		emitRowUpdate(row as T, rowIndex, 'deleted');
		resetRowEdit();
	};

	const handleSelectAllRows = (checked: boolean) => {
		setSelectedRows(checked ? tableData : []);
	};

	const handleSelectSingleRow = (row: T) => (checked: boolean) => {
		const selected = checked
			? [...selectedRows, row]
			: selectedRows.filter((s) => row.rowId !== s.rowId);

		setSelectedRows(selected);
	};

	const handleColumnSort = (key: keyof T, sortingType: Sort) => {
		setSortedColumn({ columnName: key, type: sortingType });
		const sortedTableData = getSortedData(key, sortingType, tableData);
		setTableData(sortedTableData);
	};

	const handleDragColumnStart = (e: React.DragEvent, index: number) => {
		if (enableColumnsReorder) {
			e.dataTransfer?.setData('column-header', index.toString());
		}
	};

	const handleDropColumn = (e: React.DragEvent, index: number) => {
		if (enableColumnsReorder) {
			e.preventDefault();
			const startIndex = parseInt(e.dataTransfer?.getData('column-header'));
			const newColumns = Array.from(columns);
			[newColumns[startIndex], newColumns[index]] = [newColumns[index], newColumns[startIndex]];
			setColumns(newColumns);
		}
	};

	const hideColumn = (key: keyof T) => {
		setHiddenColumns((prev) => [key, ...prev]);
	};

	useEffect(() => {
		// add uuid for each row
		setTableData(rows.map((r) => (
			r.rowId
				? r
				: { rowId: crypto.randomUUID(), ...r }
		)));
	}, [rows]);

	useEffect(() => {
		onSelectRows && onSelectRows(selectedRows);
	}, [onSelectRows, selectedRows]);

	return (
		<>
			{
				!!hiddenColumns.length &&
				(
					<div data-testid="hidden-columns-list" className='hidden-columns-list'>
						{
							hiddenColumns.map((c, key) => (
								<Tag key={key} onClose={showHiddenColumn(c)} closable>
									{
										headers
											.filter((h) => h.key === c)
											.map((h) => h.label)[0]
									}
								</Tag>
							))
						}
					</div>
				)
			}

			<DesktopTable
				{...props}
				shape={shape}
				tableData={tableData}
				selectedRows={selectedRows}
				hiddenColumns={hiddenColumns}
				sortedColumn={sortedColumn}
				columns={columns}
				editableRowIndex={editableRowIndex}
				tempRowData={tempRowData}
				dataAttributes={dataAttributes}
				hideColumn={hideColumn}
				handleSelectSingleRow={handleSelectSingleRow}
				handleCellClick={setEditableRowIndex}
				handleSelectAllRows={handleSelectAllRows}
				handleColumnSort={handleColumnSort}
				handleDragColumnStart={handleDragColumnStart}
				handleDropColumn={handleDropColumn}
				handleCancelRowEdit={resetRowEdit}
				handleAddRow={handleAddRow}
				handleSaveRow={handleSaveRow}
				handleDeleteRow={handleDeleteRow}
			/>

			<MobileTable
				{...props}
				shape={shape}
				tableData={tableData}
				selectedRows={selectedRows}
				hiddenColumns={hiddenColumns}
				sortedColumn={sortedColumn}
				columns={columns}
				editableRowIndex={editableRowIndex}
				tempRowData={tempRowData}
				dataAttributes={dataAttributes}
				hideColumn={hideColumn}
				handleSelectSingleRow={handleSelectSingleRow}
				handleCellClick={setEditableRowIndex}
				handleSelectAllRows={handleSelectAllRows}
				handleColumnSort={handleColumnSort}
				handleDragColumnStart={handleDragColumnStart}
				handleDropColumn={handleDropColumn}
				handleCancelRowEdit={resetRowEdit}
				handleAddRow={handleAddRow}
				handleSaveRow={handleSaveRow}
				handleDeleteRow={handleDeleteRow}
			/>
		</>
	);
};
