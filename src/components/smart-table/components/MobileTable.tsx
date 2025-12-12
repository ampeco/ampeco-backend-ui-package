import classNames from "classnames";

import { BaseTType } from "../types";

import { getNewRowObject } from "../utils/tableHelpers";

import { Accordion } from "../../accordion/Accordion";
import { Checkbox } from "../../field/checkbox/Checkbox";
import { DesktopProps } from "./DesktopTable";
import SmartTableRow from "./SmartTableRow";
import { Shape } from "../../..";

const MobileTable = <T extends BaseTType>(props: DesktopProps<T>) => {
	const {
		shape,
		stripped,
		tableData,
		selectedRows,
		canAdd,
		canSelect,
		columns,
		editableRowIndex,
		actionsConfig,
		handleSelectSingleRow,
	} = props;

	const withLeftActionColumn =
		(editableRowIndex !== null || canAdd) && actionsConfig?.position === "left";
	const withRightActionColumn =
		(editableRowIndex !== null || canAdd) &&
		actionsConfig?.position === "right";

	const renderHeader = (row: T, isRowSelected: boolean) => (
		<>
			{canSelect && (
				<Checkbox
					className="select-row-mobile"
					value={isRowSelected}
					onChange={handleSelectSingleRow(row)}
					name="select all"
				/>
			)}
			{row[Object.keys(row)[1]]}
		</>
	);

	const mobileTableClasses = classNames(
		"block md:hidden",
		shape === Shape.DEFAULT && "rounded-lg",
		shape === Shape.ROUNDED && "rounded-[24px]",
		shape === Shape.SQUARE && "rounded-none",
		{
			stripped: stripped,
		}
	);

	return (
		<div data-testid="mobile-table" className={mobileTableClasses}>
			{canAdd && (
				<SmartTableRow<T>
					{...props}
					className="bg-white dark:bg-gray-800"
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
				/>
			)}

			{tableData.map((row, rowIndex) => {
				const isRowSelected = selectedRows.some((s) => s.rowId === row.rowId);
				return (
					<Accordion
						key={`accordion-${rowIndex}`}
						shape={shape}
						header={renderHeader(row, isRowSelected)}
						className="mb-2"
					>
						<table>
							<thead></thead>
							<tbody>
								{
									<SmartTableRow<T>
										{...props}
										className="bg-white dark:bg-gray-800"
										canSelect={false}
										key={rowIndex}
										row={row}
										rowIndex={rowIndex}
										isRowSelected={isRowSelected}
										withLeftActionColumn={withLeftActionColumn}
										withRightActionColumn={withRightActionColumn}
									/>
								}
							</tbody>
						</table>
					</Accordion>
				);
			})}
		</div>
	);
};

export default MobileTable;
