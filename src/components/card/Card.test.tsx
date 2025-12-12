import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { Card } from "./Card";
import { Shape } from "../../types/Shape";

describe("Card", () => {
	it("should render without crashing", () => {
		const { container } = render(<Card />);
		const cardElement = container.querySelector(
			'[class*="bg-white dark:bg-gray-800"]'
		);
		expect(cardElement).toBeInTheDocument();
	});

	it("should conditionally render the header", () => {
		const headerText = "Test Header";
		const { rerender } = render(<Card showHeader={true} header={headerText} />);
		expect(screen.getByText(headerText)).toBeInTheDocument();

		rerender(<Card showHeader={false} header={headerText} />);
		expect(screen.queryByText(headerText)).not.toBeInTheDocument();
	});

	it("should conditionally render the body", () => {
		const bodyContent = "Test Body";
		const { rerender } = render(<Card showBody={true}>{bodyContent}</Card>);
		expect(screen.getByText(bodyContent)).toBeInTheDocument();

		rerender(<Card showBody={false}>{bodyContent}</Card>);
		expect(screen.queryByText(bodyContent)).not.toBeInTheDocument();
	});

	it("should conditionally render the footer", () => {
		const footerText = "Test Footer";
		const { rerender } = render(<Card showFooter={true} footer={footerText} />);
		expect(screen.getByText(footerText)).toBeInTheDocument();

		rerender(<Card showFooter={false} footer={footerText} />);
		expect(screen.queryByText(footerText)).not.toBeInTheDocument();
	});

	describe("divider", () => {
		const checkIfElementContainsBorderClass = (
			element: Element | null | undefined,
			contains: boolean
		) => {
			expect(element).toBeInTheDocument();
			const hasBorderClass = element?.className.includes(
				"border-t border-gray-200"
			);
			expect(hasBorderClass).toBe(contains);
		};

		it("should render for all elements which support it and are visible", () => {
			const { container } = render(<Card />);
			// Find body div (it has flex items-center classes)
			const bodyElement = Array.from(container.querySelectorAll("div")).find(
				(div) => div.className.includes("flex items-center space-x-4")
			);
			checkIfElementContainsBorderClass(bodyElement, true);

			// Find footer div
			const footerElement =
				Array.from(container.querySelectorAll("div")).find(
					(div) => div.textContent === "" && div.className.includes("border-t")
				) ||
				Array.from(container.querySelectorAll("div")).find((div) =>
					div.className.includes("border-t border-gray-200")
				);
			checkIfElementContainsBorderClass(footerElement, true);
		});

		it("should render when there are more than two elements visible", () => {
			const { container, rerender } = render(<Card showHeader={false} />);

			// Body should not have border when header is hidden
			const bodyElement = Array.from(container.querySelectorAll("div")).find(
				(div) => div.className.includes("flex items-center space-x-4")
			);
			if (bodyElement) {
				const hasBorderClass = bodyElement.className.includes(
					"border-t border-gray-200"
				);
				expect(hasBorderClass).toBe(false);
			}

			// Footer should have border (showBody is true by default, so footer gets border)
			const footerWithBorder = Array.from(
				container.querySelectorAll("div")
			).find((div) => div.className.includes("border-t border-gray-200"));
			expect(footerWithBorder).toBeInTheDocument();

			rerender(<Card showBody={false} />);

			// Footer should still have border when body is hidden but header is visible
			const footerWithBorder2 = Array.from(
				container.querySelectorAll("div")
			).find((div) => div.className.includes("border-t border-gray-200"));
			expect(footerWithBorder2).toBeInTheDocument();

			rerender(<Card showHeader={false} showBody={false} />);

			// Footer should not have border when both header and body are hidden
			const footerWithoutBorder = Array.from(
				container.querySelectorAll("div")
			).find((div) => div.className.includes("border-t border-gray-200"));
			expect(footerWithoutBorder).toBeUndefined();
		});

		it("shouldn't render when there are no elements to divide", () => {
			const { container } = render(
				<Card showHeader={false} showBody={false} showFooter={false} />
			);

			const borderElement = container.querySelector(
				'[class*="border-t border-gray-200"]'
			);
			expect(borderElement).not.toBeInTheDocument();
		});
	});

	it("should toggle correctly the `disabled` state", () => {
		const { container, rerender } = render(<Card />);
		const element = container.querySelector(
			'[class*="bg-white dark:bg-gray-800"]'
		) as HTMLElement;

		expect(element?.classList.contains("disabled")).toBe(false);

		rerender(<Card disabled />);
		expect(element?.classList.contains("disabled")).toBe(true);
	});

	it("should toggle correctly the `selected` state", () => {
		const { container, rerender } = render(<Card />);
		const element = container.querySelector(
			'[class*="bg-white dark:bg-gray-800"]'
		) as HTMLElement;

		expect(element?.classList.contains("selected")).toBe(false);

		rerender(<Card selected />);
		expect(element?.classList.contains("selected")).toBe(true);
	});

	it("should render actions", () => {
		const actions = "Test Actions";
		render(<Card actions={actions} />);
		expect(screen.getByText(actions)).toBeInTheDocument();
	});

	it("should apply data attributes to the card component", () => {
		const dataTestId = "card-component";
		const dataCustom = "custom-value";
		render(
			<Card
				dataAttributes={{
					"data-testid": `${dataTestId}`,
					"data-custom": `${dataCustom}`,
				}}
			/>
		);

		const cardElement = screen.getByTestId(dataTestId);
		expect(cardElement).toHaveAttribute("data-custom", dataCustom);
	});

	it("should apply the specific shape class when shape is provided", () => {
		const dataTestId = "card-component";
		render(
			<Card
				shape={Shape.ROUNDED}
				dataAttributes={{ "data-testid": dataTestId }}
			/>
		);

		const cardElement = screen.getByTestId(dataTestId);
		expect(cardElement).toHaveClass("rounded-[24px]");
	});
});
