import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ListItem from "./ListItem";

const item = { id: 1, name: "Item 1" };
const template = (data: { name: string }) => <span>{data.name}</span>;
const mockOnEdit = vi.fn();
const mockOnDelete = vi.fn();

describe("ListItem Component", () => {
	it("renders with item data", () => {
		render(
			<ListItem
				item={item}
				template={template}
				onEdit={mockOnEdit}
				onDelete={mockOnDelete}
			/>
		);

		expect(screen.getByText("Item 1")).toBeInTheDocument();
	});

	it("applies item template correctly", () => {
		render(
			<ListItem
				item={item}
				template={template}
				onEdit={mockOnEdit}
				onDelete={mockOnDelete}
			/>
		);

		const renderedTemplate = screen.getByText("Item 1");
		expect(renderedTemplate).toBeInTheDocument();
		expect(renderedTemplate.tagName).toBe("SPAN");
	});

	it("renders dropdown toggle icon", () => {
		const { container } = render(
			<ListItem
				item={item}
				template={template}
				onEdit={mockOnEdit}
				onDelete={mockOnDelete}
			/>
		);

		// Find the SVG icon (OverflowMenuVertical) within the dropdown
		const svgIcon = container.querySelector("svg");
		expect(svgIcon).toBeInTheDocument();
	});

	it("triggers onEdit when edit option is clicked", () => {
		const { container } = render(
			<ListItem
				item={item}
				template={template}
				onEdit={mockOnEdit}
				onDelete={mockOnDelete}
			/>
		);

		// Find and click the dropdown toggle (the inner div with onClick handler that contains the SVG)
		const dropdownToggle = container.querySelector("svg")?.parentElement;
		expect(dropdownToggle).toBeInTheDocument();
		fireEvent.click(dropdownToggle!);

		expect(screen.getByText("Edit")).toBeInTheDocument();

		fireEvent.click(screen.getByText("Edit"));
		expect(mockOnEdit).toHaveBeenCalledTimes(1);
		expect(screen.queryByText("Edit")).not.toBeInTheDocument();
	});

	it("triggers onDelete when delete option is clicked", () => {
		const { container } = render(
			<ListItem
				item={item}
				template={template}
				onEdit={mockOnEdit}
				onDelete={mockOnDelete}
			/>
		);

		// Find and click the dropdown toggle (the inner div with onClick handler that contains the SVG)
		const dropdownToggle = container.querySelector("svg")?.parentElement;
		expect(dropdownToggle).toBeInTheDocument();
		fireEvent.click(dropdownToggle!);

		expect(screen.getByText("Delete")).toBeInTheDocument();

		fireEvent.click(screen.getByText("Delete"));
		expect(mockOnDelete).toHaveBeenCalledTimes(1);
		expect(screen.queryByText("Delete")).not.toBeInTheDocument();
	});
});