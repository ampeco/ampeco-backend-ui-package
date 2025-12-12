import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Dialog } from "./Dialog";
import { describe, it, expect, vi } from "vitest";
import { Shape } from "../../types/Shape";

describe("Dialog", () => {
	it("should render the dialog with the provided header and children", () => {
		const headerText = "Dialog Header";
		const childrenText = "Dialog Content";

		render(
			<Dialog header={<h2>{headerText}</h2>}>
				<p>{childrenText}</p>
			</Dialog>
		);

		const headerElement = screen.getByText(headerText);
		const childrenElement = screen.getByText(childrenText);

		expect(headerElement).toBeInTheDocument();
		expect(childrenElement).toBeInTheDocument();
	});

	it("should call onClose when the close button is clicked", () => {
		const onCloseMock = vi.fn();

		render(<Dialog onClose={onCloseMock} />);

		const closeButton = screen.getByLabelText("Close");

		fireEvent.click(closeButton);

		expect(onCloseMock).toHaveBeenCalledTimes(1);
		expect(onCloseMock).toHaveBeenCalledWith("button");
	});

	it("should call onClose when the backdrop is clicked", () => {
		const onCloseMock = vi.fn();

		const { container } = render(<Dialog onClose={onCloseMock} />);

		const backdrop = container.firstChild as HTMLElement;

		fireEvent.mouseDown(backdrop);

		expect(onCloseMock).toHaveBeenCalledTimes(1);
		expect(onCloseMock).toHaveBeenCalledWith("backdrop");
	});

	it("should call onClose when the Escape key is pressed", () => {
		const onCloseMock = vi.fn();

		render(<Dialog onClose={onCloseMock} />);

		fireEvent.keyDown(document, { key: "Escape" });

		expect(onCloseMock).toHaveBeenCalledTimes(1);
		expect(onCloseMock).toHaveBeenCalledWith("key");
	});

	it("should apply classes for shape", () => {
		render(
			<Dialog
				dataAttributes={{ "data-testid": "my-dialog" }}
				shape={Shape.ROUNDED}
			>
				<p>This is rounded dialog</p>
			</Dialog>
		);

		const dialogWrapper = screen.getByTestId("my-dialog").children[0];
		expect(dialogWrapper).toHaveClass("rounded-[24px]");
	});
});
