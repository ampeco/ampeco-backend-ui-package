import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Accordion, TogglerOrigin } from "./Accordion";
import { describe, it, expect, vi, afterEach } from "vitest";
import { Shape } from "../../types/Shape";

describe("Accordion", () => {
	afterEach(() => {
		vi.useRealTimers();
	});

	it("should render without crashing", () => {
		const { getByText } = render(<Accordion header={<span>My Text</span>} />);
		expect(getByText(/My Text/i)).toBeInTheDocument();
	});

	it("should render the header text", () => {
		const { getByText } = render(
			<Accordion header={<span>Additional Header</span>}>
				Test Content
			</Accordion>
		);
		expect(getByText("Additional Header")).toBeInTheDocument();
	});

	it("should toggle open state when header is clicked", async () => {
		const { getByText, queryByText } = render(
			<Accordion
				header={<span>My Header</span>}
				defaultOpen={false}
				togglerOrigin={TogglerOrigin.HEADER}
			>
				Test Content
			</Accordion>
		);
		const header = getByText(/My Header/i);

		// Initially, the accordion content should not be rendered
		expect(queryByText("Test Content")).not.toBeInTheDocument();

		// Click on the header
		fireEvent.click(header);

		// Need to wait for animations or transitions if any
		await new Promise((r) => setTimeout(r, 500));

		// Check if content is now visible and headerClickHandler called once
		expect(queryByText("Test Content")).toBeInTheDocument();
	});

	it("should render accordion content when defaultOpen is true", () => {
		const { getByText } = render(
			<Accordion header={<span>My Header</span>} defaultOpen={true}>
				Test Content
			</Accordion>
		);
		expect(getByText("Test Content")).toBeInTheDocument();
	});

	it("should have the correct data attributes", () => {
		const { getByTestId } = render(
			<Accordion
				header={<span>My Header</span>}
				dataAttributes={{ "data-testid": "my-accordion" }}
			>
				Test Content
			</Accordion>
		);

		const accordion = getByTestId("my-accordion");
		expect(accordion).toBeInTheDocument();
	});

	it("should have rounded class if shape is rounded", () => {
		const clickHandler = vi.fn();
		const { getByText } = render(
			<Accordion
				header={<span>My Header</span>}
				defaultOpen={true}
				shape={Shape.ROUNDED}
				clickHandler={clickHandler}
			>
				Test Content
			</Accordion>
		);

		const headerElement = getByText("My Header").parentNode?.parentNode;
		expect(headerElement).toHaveClass("rounded-[24px]");
	});
});
