import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { FieldBase } from "./FieldBase";
import { Shape } from "../../../types/Shape";
import { Size } from "../../../types/Size";

describe("FieldBase", () => {
	it("renders without errors", () => {
		const { container } = render(<FieldBase />);
		expect(container.firstChild).toBeInTheDocument();
	});

	it("renders children correctly", () => {
		const { getByDisplayValue } = render(
			<FieldBase>
				<input defaultValue="Hello World!" />
			</FieldBase>
		);

		expect(getByDisplayValue("Hello World!")).toBeInTheDocument();
	});

	it("applies default classNames", () => {
		const { container } = render(<FieldBase />);
		const element = container.firstChild as HTMLElement;

		// Check for default Tailwind classes
		expect(element).toHaveClass("flex");
		expect(element).toHaveClass("gap-2");
		expect(element).toHaveClass("items-center");
		expect(element).toHaveClass("border");
		expect(element).toHaveClass("border-gray-300");
		expect(element).toHaveClass("bg-white");

		// Check for default size (MEDIUM)
		expect(element).toHaveClass("text-sm");
		expect(element).toHaveClass("px-4");
		expect(element).toHaveClass("h-9");

		// Check for default shape (DEFAULT)
		expect(element).toHaveClass("rounded-lg");

		// Should not have state classes
		expect(element).not.toHaveClass("bg-gray-100");
		expect(element).not.toHaveClass("bg-gray-50");
		expect(element).not.toHaveClass("ring-3");
		expect(element).not.toHaveClass("ring-danger-200");
		expect(element).not.toHaveClass("ring-primary-200");
	});

	it("applies classNames based on props", () => {
		const { container } = render(
			<FieldBase disabled error activated readonly />
		);
		const element = container.firstChild as HTMLElement;

		// Check for base classes
		expect(element).toHaveClass("flex");
		expect(element).toHaveClass("border");

		// Check for state classes
		expect(element).toHaveClass("bg-gray-100");
		expect(element).toHaveClass("border-gray-200");
		expect(element).toHaveClass("bg-gray-50");
		expect(element).toHaveClass("ring-3");
		expect(element).toHaveClass("ring-danger-200");
		expect(element).toHaveClass("ring-primary-200");
	});

	it("handles custom className prop", () => {
		const { container } = render(<FieldBase className="custom-class" />);
		expect(container.firstChild).toHaveClass("custom-class");
	});

	it("handles data attributes correctly", () => {
		const dataAttrs = {
			"data-test-id": "field-base",
		};

		const { container } = render(<FieldBase dataAttributes={dataAttrs} />);
		expect(container.firstChild).toHaveAttribute("data-test-id", "field-base");
	});

	it("renders with shape prop correctly", () => {
		const { container } = render(<FieldBase shape={Shape.ROUNDED} />);
		const element = container.firstChild as HTMLElement;
		expect(element).toHaveClass("rounded-[24px]");
	});
});
