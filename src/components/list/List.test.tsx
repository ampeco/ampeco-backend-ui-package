import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { List } from "./List";
import { PlusIcon } from "@heroicons/react/24/solid";

const itemTemplateRef = (data: { name: string }) => <span>{data.name}</span>;
const items = [
	{ id: 0, name: "Item 1" },
	{ id: 1, name: "Item 2" },
];
const mockOnAdd = vi.fn();
const mockOnEdit = vi.fn();
const mockOnDelete = vi.fn();

describe("List Component", () => {
	it("renders items", () => {
		render(
			<List
				heading="Test List"
				addIcon={<PlusIcon className="w-4 h-4" />}
				items={items}
				itemTemplateRef={itemTemplateRef}
				onAdd={mockOnAdd}
				onEdit={mockOnEdit}
				onDelete={mockOnDelete}
			/>
		);

		items.forEach((item) => {
			expect(screen.getByText(item.name)).toBeInTheDocument();
		});
	});

	it("invokes onAdd when icon is clicked", () => {
		const { container } = render(
			<List
				heading="Test List"
				addIcon={<PlusIcon className="w-4 h-4" />}
				items={items}
				itemTemplateRef={itemTemplateRef}
				onAdd={mockOnAdd}
				onEdit={mockOnEdit}
				onDelete={mockOnDelete}
			/>
		);

		// Find the button containing the add icon
		const addButton = container.querySelector("button");
		expect(addButton).toBeInTheDocument();
		fireEvent.click(addButton!);
		expect(mockOnAdd).toHaveBeenCalled();
	});
});
