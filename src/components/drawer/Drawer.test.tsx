import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Drawer } from "./Drawer";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("Drawer", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("should render the drawer with the provided header and children", () => {
		const headerText = "Drawer Header";
		const childrenText = "Drawer Content";

		render(
			<Drawer header={<h2>{headerText}</h2>}>
				<p>{childrenText}</p>
			</Drawer>
		);

		const headerElement = screen.getByText(headerText);
		const childrenElement = screen.getByText(childrenText);

		expect(headerElement).toBeInTheDocument();
		expect(childrenElement).toBeInTheDocument();
	});

	it("should call onClose when the close button is clicked", () => {
		const onCloseMock = vi.fn();

		render(<Drawer onClose={onCloseMock} />);

		const closeButton = screen.getByLabelText("Close");

		fireEvent.click(closeButton);

		// Advance timers to trigger the setTimeout in handleClose
		vi.advanceTimersByTime(300);

		expect(onCloseMock).toHaveBeenCalledTimes(1);
		expect(onCloseMock).toHaveBeenCalledWith("button");
	});

	it("should call onClose when the backdrop is clicked", () => {
		const onCloseMock = vi.fn();

		const { container } = render(<Drawer onClose={onCloseMock} />);

		const backdrop = container.firstChild as HTMLElement;

		fireEvent.mouseDown(backdrop);

		// Advance timers to trigger the setTimeout in handleClose
		vi.advanceTimersByTime(300);

		expect(onCloseMock).toHaveBeenCalledTimes(1);
		expect(onCloseMock).toHaveBeenCalledWith("backdrop");
	});

	it("should call onClose when the Escape key is pressed", () => {
		const onCloseMock = vi.fn();

		render(<Drawer onClose={onCloseMock} />);

		fireEvent.keyDown(document, { key: "Escape" });

		// Advance timers to trigger the setTimeout in handleClose
		vi.advanceTimersByTime(300);

		expect(onCloseMock).toHaveBeenCalledTimes(1);
		expect(onCloseMock).toHaveBeenCalledWith("key");
	});
});
