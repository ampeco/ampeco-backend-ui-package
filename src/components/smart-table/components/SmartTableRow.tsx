import { useEffect, useState } from "react";
import classNames from "classnames";

import {
	ActionsConfig,
	BaseTType,
	FormFieldConfig,
	HeadersConfig,
	InputType,
	ReadonlyFields,
} from "../types";
import { Size } from "../../../types/Size";

import { Select } from "../../field/select/Select";
import { Checkbox } from "../../field/checkbox/Checkbox";
import { Button } from "../../button//button/Button";
import { Input } from "../../field/input/Input";

import { validateRow } from "../utils/validation";

type Props<T extends BaseTType> = {
	row: T;
	rowIndex: number;
	isRowSelected?: boolean;
	canAdd?: boolean;
	canEdit?: boolean;
	canDelete?: boolean;
	canSelect?: boolean;
	newRow?: boolean;
	withLeftActionColumn?: boolean;
	withRightActionColumn?: boolean;
	actionsConfig?: ActionsConfig;
	readonlyFields?: ReadonlyFields<T>;
	formFieldConfigs?: FormFieldConfig<T>[];
	columns: HeadersConfig<T>[];
	hiddenColumns: (keyof T)[];
	editableRowIndex: number | null;
	className?: string;
	handleAddRow: (rowIndex: number, row: Partial<T>) => void;
	handleSaveRow: (rowIndex: number, row: Partial<T>) => void;
	handleDeleteRow: (rowIndex: number, row: Partial<T>) => void;
	handleCancelRowEdit: () => void;
	handleSelectSingleRow: (row: T) => (checked: boolean) => void;
	handleCellClick: (rowIndex: number) => void;
};

const SmartTableRow = <T extends BaseTType>({
	row,
	rowIndex,
	isRowSelected,
	canAdd,
	canEdit,
	canDelete,
	canSelect,
	newRow,
	actionsConfig,
	readonlyFields,
	formFieldConfigs,
	withLeftActionColumn,
	withRightActionColumn,
	columns,
	hiddenColumns,
	editableRowIndex,
	className,
	handleAddRow,
	handleSaveRow,
	handleDeleteRow,
	handleCancelRowEdit,
	handleSelectSingleRow,
	handleCellClick,
}: Props<T>) => {
	const [tempRowData, setTempRowData] = useState<Partial<T>>({});
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const isInEditMode = editableRowIndex === rowIndex;

	useEffect(() => {
		if (newRow) setTempRowData(row);
	}, [newRow, row]);

	useEffect(() => {
		if (editableRowIndex !== rowIndex) setTempRowData({});
	}, [editableRowIndex, rowIndex]);

	const onCellClick = (rowIndex: number) => () => {
		if (!canEdit) return;
		if (editableRowIndex === rowIndex) return;

		if (!Object.keys(tempRowData).length) {
			setTempRowData(row);
			handleCellClick(rowIndex);
		}
	};

	const handleInputChange = (columnName: keyof T) => (value: any) => {
		setTempRowData((prev) => ({
			...prev,
			[columnName]: value,
		}));
	};

	const addRow = (rowIndex: number) => {
		if (!formFieldConfigs) return handleAddRow(rowIndex, tempRowData);

		const validationErrors = validateRow(tempRowData as T, formFieldConfigs);
		if (Object.keys(validationErrors).length === 0) {
			handleAddRow(rowIndex, tempRowData);
			setErrors({});
		} else {
			setErrors(validationErrors);
		}
	};

	const editRow = (rowIndex: number) => {
		if (!formFieldConfigs) return handleSaveRow(rowIndex, tempRowData);

		const validationErrors = validateRow(tempRowData as T, formFieldConfigs);
		if (Object.keys(validationErrors).length === 0) {
			handleSaveRow(rowIndex, tempRowData);
			setErrors({});
		} else {
			setErrors(validationErrors);
		}
	};

	const renderActionsCell = (rowIndex: number) => {
		if (newRow) {
			return (
				<div className="flex items-center gap-1">
					<Button
						dataAttributes={{ "data-testid": "add-row-button" }}
						variant="link"
						size={Size.SMALL}
						onClick={() => addRow(rowIndex)}
					>
						{actionsConfig?.addLabel}
					</Button>
				</div>
			);
		}

		return (
			<div className="flex items-center gap-1">
				<Button
					variant="link"
					size={Size.SMALL}
					onClick={() => editRow(rowIndex)}
				>
					{actionsConfig?.editLabel}
				</Button>
				<Button variant="link" size={Size.SMALL} onClick={handleCancelRowEdit}>
					{actionsConfig?.cancelLabel}
				</Button>
				{canDelete && (
					<Button
						variant="link"
						className="button-danger"
						size={Size.SMALL}
						onClick={() => handleDeleteRow(rowIndex, tempRowData)}
					>
						{actionsConfig?.deleteLabel}
					</Button>
				)}
			</div>
		);
	};

	const renderTableCell = (
		column: string,
		isReadonly: boolean,
		label: string
	) => {
		const c = columns.find(({ key }) => key === column);

		if (c?.inputType === "select") {
			return (
				<Select
					value={tempRowData[column] || ""}
					onChange={handleInputChange(column)}
					options={c.inputOptions as any}
				/>
			);
		}

		return (
			<>
				<Input
					inputType={(c?.inputType as Exclude<InputType, "select">) || "text"}
					value={tempRowData[column] || ""}
					onChange={handleInputChange(column)}
					placeholder={label}
					readonly={isReadonly}
					size={Size.MEDIUM}
					error={!!errors[column]}
				/>
				{errors[column] && <p className="has-error">{errors[column]}</p>}
			</>
		);
	};

	const renderTableData = (row: T, rowIndex: number) =>
		columns
			.filter(({ key }) => !hiddenColumns.includes(key))
			.map(({ key, label }, columnIndex) => {
				const isReadonly = readonlyFields?.includes(key);
				const isEditable = editableRowIndex === rowIndex && canEdit;

				const cellClasses = classNames(
					"px-2 py-2 whitespace-nowrap group-hover:bg-gray-50 dark:group-hover:bg-gray-900",
					{
						editable: isEditable,
					}
				);

				return (
					<td
						key={columnIndex}
						onClick={onCellClick(rowIndex)}
						className={cellClasses}
						data-row={rowIndex}
						data-col={columnIndex}
					>
						{isEditable ? renderTableCell(key, !!isReadonly, label) : row[key]}
					</td>
				);
			});

	return (
		<tr key={`row-${rowIndex}`} className={classNames(className)}>
			{canSelect && (
				<td className="px-2 py-2">
					{!newRow && (
						<Checkbox
							dataAttributes={{ "data-testid": `checkbox-${rowIndex}` }}
							value={isRowSelected}
							onChangeEvent={(e) =>
								handleSelectSingleRow(row)(e.target.checked)
							}
						/>
					)}
				</td>
			)}

			{(canAdd || canEdit) && withLeftActionColumn && (
				<td className="px-2 py-2">
					{isInEditMode && renderActionsCell(rowIndex)}
				</td>
			)}

			{renderTableData(row, rowIndex)}

			{(canAdd || canEdit) && withRightActionColumn && (
				<td className="px-2 py-2">
					{isInEditMode && renderActionsCell(rowIndex)}
				</td>
			)}
		</tr>
	);
};

export default SmartTableRow;
