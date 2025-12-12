import { FC, ReactNode } from "react";
import classNames from "classnames";

import { Shape } from "../../types/Shape";
import DataAttributes from "../../types/DataAttributes";

import { Accordion } from "../accordion/Accordion";

interface TableProps extends DataAttributes {
	headers: (string | ReactNode)[];
	rows: (string | number | ReactNode)[][];
	shape?: Shape;
	stripped?: boolean;
}

export const Table: FC<TableProps> = ({
	dataAttributes,
	headers,
	rows,
	shape = Shape.DEFAULT,
	stripped,
}) => {
	const renderDesktopTable = () => {
		const desktopClasses = classNames(
			"hidden md:table w-full bg-white dark:bg-gray-800 overflow-hidden shadow divide-y divide-gray-100 dark:divide-gray-700",
			shape === Shape.DEFAULT && "rounded-lg",
			shape === Shape.ROUNDED && "rounded-[24px]",
			shape === Shape.SQUARE && "rounded-none"
		);

		return (
			<table className={desktopClasses} {...dataAttributes}>
				<thead className="bg-gray-50 dark:bg-gray-800">
					<tr>
						{headers.map((header, index) => (
							<th
								key={`${header}-${index}`}
								data-testid={`columnheader-${index}`}
								className="text-left px-2 whitespace-nowrap uppercase text-gray-500 text-xxs tracking-wide py-2"
							>
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-100 dark:divide-gray-700">
					{rows.map((row, index) => (
						<tr
							key={`row-${index}`}
							data-testid={`row-${index}`}
							className={classNames(
								"group",
								stripped &&
									"odd:bg-white even:bg-gray-50 dark:odd:bg-gray-700 dark:even:bg-gray-800"
							)}
						>
							{row.map((cell, i) => (
								<td
									key={`cell-${index}-${i}`}
									className="px-2 py-2 whitespace-nowrap group-hover:bg-gray-50 dark:group-hover:bg-gray-900"
								>
									{cell}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		);
	};

	const renderMobileTable = () => {
		const mobileClasses = classNames("md:hidden", `shape-${shape}`, {
			stripped: stripped,
		});

		return (
			<div className={mobileClasses}>
				{rows.map((row, i) => (
					<Accordion key={`accordion-${i}`} header={row[0]} shape={shape}>
						<table>
							<thead></thead>
							<tbody>
								{row.map((cell, index) => (
									<tr key={index}>
										<td className="bold">{headers[index]}:</td>
										<td>{cell}</td>
									</tr>
								))}
							</tbody>
						</table>
					</Accordion>
				))}
			</div>
		);
	};

	return (
		<>
			{renderDesktopTable()}
			{renderMobileTable()}
		</>
	);
};
