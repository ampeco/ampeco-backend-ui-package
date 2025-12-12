import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Table } from "./Table";
import { Shape } from "../../types/Shape";

describe("Table Component", () => {
	const headers = ["Name", "Age"];
	const rows = [
		["Alice", 25],
		["Bob", 30],
	];

	it("should render without crashing", () => {
		const { container } = render(<Table headers={headers} rows={rows} />);
		// Desktop table is a <table> element with md:table class
		const desktopTable = container.querySelector("table");
		expect(desktopTable).toBeInTheDocument();
		// Mobile table is a <div> element with md:hidden class
		const mobileTable = container.querySelector('[class*="md:hidden"]');
		expect(mobileTable).toBeInTheDocument();
	});

	it("should render table headers and rows correctly", () => {
		render(<Table headers={headers} rows={rows} />);

		// Debugging the rendered output
		// screen.debug();

		// Validate headers
		const headerElements = headers.map((_, index) =>
			screen.getByTestId(`columnheader-${index}`)
		);
		headers.forEach((header, index) => {
			expect(headerElements[index]).toHaveTextContent(header);
		});

		// Validate rows
		rows.forEach((row, rowIndex) => {
			const rowElement = screen.getByTestId(`row-${rowIndex}`);
			row.forEach((cell) => {
				expect(rowElement).toHaveTextContent(cell.toString());
			});
		});
	});

	it('should apply the "stripped" class when "stripped" is true', () => {
		const { container } = render(
			<Table headers={headers} rows={rows} stripped />
		);
		// Stripped styling is applied to <tr> elements, not the table
		const firstRow = container.querySelector("tbody tr");
		expect(firstRow).toHaveClass("odd:bg-white");
		expect(firstRow).toHaveClass("even:bg-gray-50");
	});

	it('should not apply the "stripped" class when "stripped" is false', () => {
		const { container } = render(<Table headers={headers} rows={rows} />);
		const table = container.querySelector("table");
		expect(table).not.toHaveClass("stripped");
	});

	it('should apply the default "shape" class when "shape" is not prodived', () => {
		const { container } = render(<Table headers={headers} rows={rows} />);
		const table = container.querySelector("table");
		expect(table).toHaveClass("rounded-lg");
	});

	it('should apply the "shape" class when "shape" is prodived', () => {
		const { container } = render(
			<Table headers={headers} rows={rows} shape={Shape.SQUARE} />
		);
		const table = container.querySelector("table");
		expect(table).toHaveClass("rounded-none");
	});

	it("should apply data attributes to the table", () => {
		render(
			<Table
				headers={headers}
				rows={rows}
				dataAttributes={{ "data-testid": "my-table" }}
			/>
		);
		const table = screen.getByTestId("my-table") as HTMLElement;
		expect(table).toBeInTheDocument();
	});

	it("should render Accordion components for mobile view", async () => {
		const { container } = render(<Table headers={headers} rows={rows} />);

		// Find the mobile table container (div with md:hidden class)
		const mobileTable = container.querySelector('[class*="md:hidden"]');
		expect(mobileTable).toBeInTheDocument();

		// Validate accordion headers and open them to check content
		for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
			const row = rows[rowIndex];
			const headerText = row[0].toString();

			// Find all instances of the header text and filter to find the one in mobile table
			const allHeaders = screen.getAllByText(headerText);
			const mobileHeader = allHeaders.find((header) =>
				mobileTable?.contains(header)
			) as HTMLElement;
			expect(mobileHeader).toBeInTheDocument();

			// Find the accordion container that contains this header
			const accordion = mobileHeader.closest(
				'[class*="w-full flex flex-col"]'
			) as HTMLElement;
			expect(accordion).toBeInTheDocument();

			// Find the arrow/chevron icon to click (togglerOrigin defaults to ARROW)
			const arrowButton = accordion.querySelector(
				'[class*="cursor-pointer"]'
			) as HTMLElement;
			expect(arrowButton).toBeInTheDocument();

			// Click on the arrow button to open the accordion
			fireEvent.click(arrowButton);

			// Need to wait for animations or transitions if any
			await new Promise((r) => setTimeout(r, 500));

			// After opening, find the content table within this specific accordion
			const contentTable = accordion.querySelector("table") as HTMLElement;
			expect(contentTable).toBeInTheDocument();

			// Validate the content is visible within the opened accordion
			row.forEach((cell, cellIndex) => {
				const headerLabel = headers[cellIndex].toString();
				const cellValue = cell.toString();
				// Check that both the header label and cell value are present in the opened accordion content
				expect(contentTable).toHaveTextContent(headerLabel + ":");
				expect(contentTable).toHaveTextContent(cellValue);
			});
		}
	});
});
