import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { SmartTable } from "./SmartTable"; // Adjust the import according to your file structure
import { Sort } from "../../types/Sort";
import { describe, expect, it } from "vitest";
import { ActionsConfig, BaseTType, HeadersConfig } from "./types";
import { Shape } from "../../types/Shape";

// Mock data for testing
const rowsMock: BaseTType[] = [
	{ rowId: "1", name: "John Doe", age: 30 },
	{ rowId: "2", name: "Jane Doe", age: 25 },
];

const headersMock: HeadersConfig<BaseTType>[] = [
	{ key: "name", label: "Name" },
	{ key: "age", label: "Age" },
];

const actionsConfig: ActionsConfig = {
	position: "right",
	addLabel: "Add new",
	editLabel: "Save",
	deleteLabel: "Delete",
	cancelLabel: "Cancel",
	columnLabel: "Actions",
};

// Test suite for SmartTable
describe("SmartTable", () => {
	it("should render table headers and rows", () => {
		render(
			<SmartTable
				actionsConfig={actionsConfig}
				rows={rowsMock}
				headers={headersMock}
			/>
		);

		const desktopTable = screen.getByTestId("desktop-table");
		const mobileTable = screen.getByTestId("mobile-table");

		// Check headers are displayed
		expect(within(desktopTable).getByText("Name")).toBeInTheDocument();
		expect(within(desktopTable).getByText("Age")).toBeInTheDocument();

		// Check if rows are displayed
		expect(within(desktopTable).getByText("John Doe")).toBeInTheDocument();
		expect(within(desktopTable).getByText("Jane Doe")).toBeInTheDocument();

		// Check if rows are displayed
		expect(within(mobileTable).getByText("John Doe")).toBeInTheDocument();
		expect(within(mobileTable).getByText("Jane Doe")).toBeInTheDocument();
	});

	it("should add a new row", async () => {
		render(
			<SmartTable
				actionsConfig={actionsConfig}
				rows={rowsMock}
				headers={headersMock}
				canAdd={true}
			/>
		);

		const desktopTable = screen.getByTestId("desktop-table");

		// Use `queryByRole` or `getByRole` to find the button
		const addRowButton = await within(desktopTable).findByTestId(
			"add-row-button"
		); // Assuming you've added data-testid to the button

		// Simulate clicking the add row button
		fireEvent.click(addRowButton);

		// Input for new row data (confirm these placeholders align with your components)
		const newRowInputName = within(desktopTable).getByPlaceholderText(/name/i);
		const newRowInputAge = within(desktopTable).getByPlaceholderText(/age/i);
		fireEvent.change(newRowInputName, { target: { value: "Tom Smith" } });
		fireEvent.change(newRowInputAge, { target: { value: "40" } });

		// Assume there's a save button after entering new row data
		const saveRowButton = within(desktopTable).getByText(/add new/i);

		fireEvent.click(saveRowButton);

		// Check if the new row appears in the document
		expect(within(desktopTable).getByText("Tom Smith")).toBeInTheDocument();
		expect(within(desktopTable).getByText("40")).toBeInTheDocument();
	});

	it("should sort the table by column", () => {
		render(
			<SmartTable
				actionsConfig={actionsConfig}
				rows={rowsMock}
				headers={headersMock}
			/>
		);

		const ageColumnHeader = screen.getByText("Age");
		fireEvent.click(ageColumnHeader); // Sort ascending

		// Add assertions to verify sorting
		const firstRowAfterSorting = screen.getAllByRole("row")[1]; // Skipping header row
		expect(firstRowAfterSorting).toHaveTextContent("Jane Doe");
	});

	it("should delete a row", async () => {
		render(
			<SmartTable
				actionsConfig={actionsConfig}
				rows={rowsMock}
				headers={headersMock}
				canEdit={true}
				canDelete={true}
			/>
		);

		const desktopTable = screen.getByTestId("desktop-table");
		const rowToDelete = within(desktopTable).getByText("John Doe");

		fireEvent.click(rowToDelete);

		const deleteButton = screen.getByText("Delete");
		fireEvent.click(deleteButton);

		expect(
			within(desktopTable).queryByText("John Doe")
		).not.toBeInTheDocument();
	});

	it("should select a row", () => {
		render(
			<SmartTable
				actionsConfig={actionsConfig}
				rows={rowsMock}
				headers={headersMock}
				canEdit={true}
				canSelect={true}
			/>
		);

		const desktopTable = screen.getByTestId("desktop-table");

		let checkbox;
		const checkboxes = within(desktopTable).getAllByRole("checkbox");

		if (
			checkboxes.length > 1 &&
			checkboxes[0].getAttribute("data-testid")?.includes("select-all")
		) {
			checkbox = checkboxes[1];
		} else {
			checkbox = checkboxes[0];
		}

		fireEvent.click(checkbox);

		expect(checkbox).toBeChecked();
	});

	it("should show hidden columns list", () => {
		render(
			<SmartTable
				actionsConfig={actionsConfig}
				rows={rowsMock}
				headers={headersMock}
				canHideColumns={true}
			/>
		);

		// Assuming you have a way to hide columns, simulate that
		const hideColumnButton = screen.getByTestId("hide-column-button-name");
		fireEvent.click(hideColumnButton);

		expect(screen.getByTestId("hidden-columns-list")).toBeInTheDocument();
	});

	it("should render shape rounded", () => {
		render(
			<SmartTable
				shape={Shape.ROUNDED}
				actionsConfig={actionsConfig}
				rows={rowsMock}
				headers={headersMock}
				canHideColumns={true}
			/>
		);

		const desktopTable = screen.getByTestId("desktop-table");

		expect(desktopTable).toHaveClass("rounded-[24px]");
	});

	it("should render shape default", () => {
		render(
			<SmartTable
				actionsConfig={actionsConfig}
				rows={rowsMock}
				headers={headersMock}
				canHideColumns={true}
			/>
		);

		const desktopTable = screen.getByTestId("desktop-table");

		expect(desktopTable).toHaveClass("rounded-lg");
	});

	it("should render shape square", () => {
		render(
			<SmartTable
				shape={Shape.SQUARE}
				actionsConfig={actionsConfig}
				rows={rowsMock}
				headers={headersMock}
				canHideColumns={true}
			/>
		);

		const desktopTable = screen.getByTestId("desktop-table");

		expect(desktopTable).toHaveClass("rounded-none");
	});

	it("should render stripped table", () => {
		render(
			<SmartTable
				stripped
				actionsConfig={actionsConfig}
				rows={rowsMock}
				headers={headersMock}
				canHideColumns={true}
			/>
		);

		const desktopTable = screen.getByTestId("desktop-table");
		const tbody = desktopTable.querySelector("tbody");
		const rows = tbody ? Array.from(tbody.querySelectorAll("tr")) : [];

		// Check that at least one row has the stripped classes in its className
		const hasStrippedClass = rows.some((row) => {
			const className = row.getAttribute("class") || "";
			return (
				className.includes("odd:bg-white") &&
				className.includes("even:bg-gray-50")
			);
		});

		expect(hasStrippedClass).toBe(true);
	});
});
