import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "./Pagination";
import { describe, vi, it, expect } from "vitest";
import { Shape } from "../../types/Shape";

describe("Pagination", () => {
	it("renders pagination component", () => {
		render(<Pagination totalItems={100} pageSize={10} />);

		// Assert that the pagination component is rendered
		const paginationElement = screen.getByRole("list");
		expect(paginationElement).toBeInTheDocument();
	});

	it("renders correct number of pages", () => {
		const pageSize = 10;
		render(<Pagination totalItems={100} pageSize={pageSize} />);

		// Assert that the correct number of page buttons are rendered
		const lastButton = screen.getByLabelText(`Go to page ${pageSize}`);
		expect(lastButton.textContent).toBe("10");
	});

	it("renders correct selected page", () => {
		render(<Pagination totalItems={100} pageSize={10} page={2} />);
		const selectedPage = screen.getByText("2");
		expect(selectedPage).toHaveClass("bg-primary-500");
		expect(selectedPage).toHaveClass("text-white");
	});

	it("calls onChange callback when page button 2 is clicked and moves current to page 2", () => {
		const onChangeMock = vi.fn();
		render(
			<Pagination totalItems={100} pageSize={10} onChange={onChangeMock} />
		);

		// Simulate clicking on a page button
		const pageButton = screen.getByLabelText("Go to page 2");
		fireEvent.click(pageButton);
		// Assert that the onChange callback is called with the correct value
		expect(onChangeMock).toHaveBeenCalledWith(2);
	});

	it("calls onChange callback when right arrow button is clicked and moves current to next page", () => {
		const onChangeMock = vi.fn();
		render(
			<Pagination totalItems={100} pageSize={10} onChange={onChangeMock} />
		);

		// Simulate clicking on the right arrow button
		const rightArrowButton = screen.getByLabelText("Next page");
		fireEvent.click(rightArrowButton);

		// Assert that the onChange callback is called with the correct value
		expect(onChangeMock).toHaveBeenCalledWith(2);
	});

	it("calls onChange callback when left arrow button is clicked and moves current to previous page", () => {
		const onChangeMock = vi.fn();
		render(
			<Pagination
				totalItems={100}
				pageSize={10}
				onChange={onChangeMock}
				page={2}
			/>
		);

		// Simulate clicking on the right arrow button
		const leftArrowButton = screen.getByLabelText("Previous page");
		fireEvent.click(leftArrowButton);

		// Assert that the onChange callback is called with the correct value
		expect(onChangeMock).toHaveBeenCalledWith(1);
	});

	it("sets the rounded shape to items", () => {
		render(
			<Pagination
				shape={Shape.ROUNDED}
				totalItems={100}
				pageSize={10}
				page={2}
			/>
		);
		const roundedSelected = screen.getByLabelText("Go to page 2");
		expect(roundedSelected).toHaveClass("rounded-full");
	});

	it("sets the square shape to items", () => {
		render(
			<Pagination
				shape={Shape.SQUARE}
				totalItems={100}
				pageSize={10}
				page={2}
			/>
		);
		const roundedSelected = screen.getByLabelText("Go to page 2");
		expect(roundedSelected).toHaveClass("rounded-none");
	});

	it("sets the default shape to items", () => {
		render(
			<Pagination
				shape={Shape.DEFAULT}
				totalItems={100}
				pageSize={10}
				page={2}
			/>
		);
		const roundedSelected = screen.getByLabelText("Go to page 2");
		expect(roundedSelected).toHaveClass("rounded-md");
	});
});
