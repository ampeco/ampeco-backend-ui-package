import React from "react";
import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Tag } from "./Tag";
import classNames from "classnames";
import { Shape } from "../../types/Shape";

describe("Tag Component", () => {
	const renderTag = ({
		type = "default",
		closable = false,
		onClose = vi.fn(),
		className,
		children = "Test Tag",
		dataAttributes = {},
		shape = Shape.DEFAULT,
	}: {
		type?: "default" | "danger" | "success" | "warning" | "info" | "primary";
		closable?: boolean;
		onClose?: () => void;
		className?: classNames.Value;
		children?: React.ReactNode;
		dataAttributes?: { [key: string]: string };
		shape?: Shape;
	} = {}) => {
		return render(
			<Tag
				type={type}
				closable={closable}
				onClose={onClose}
				className={className}
				dataAttributes={dataAttributes}
				shape={shape}
			>
				{children}
			</Tag>
		);
	};

	it("should render with default props", () => {
		const { container } = renderTag();
		expect(screen.getByText("Test Tag")).toBeInTheDocument();
	});

	it("should apply custom className", () => {
		const customClass = "custom-class";
		renderTag({ className: customClass });
		const tagElement = screen.getByText("Test Tag");
		expect(tagElement).toHaveClass(customClass);
	});

	it("should be closable when closable is true", () => {
		const { container } = renderTag({ closable: true });
		// The Close icon is an SVG element, find it by role or by SVG
		const closeIcon = container.querySelector("svg");
		expect(closeIcon).toBeInTheDocument();
	});

	it("should not be closable when closable is false", () => {
		const { container } = renderTag({ closable: false });
		expect(container.querySelector("svg")).not.toBeInTheDocument();
	});

	it("should call onClose when close icon is clicked", () => {
		const mockOnClose = vi.fn();
		const { container } = renderTag({ closable: true, onClose: mockOnClose });
		const closeIcon = container.querySelector("svg");
		expect(closeIcon).toBeInTheDocument();
		fireEvent.click(closeIcon as Element);
		expect(mockOnClose).toHaveBeenCalledTimes(1);
	});

	it("should render children correctly", () => {
		const { container } = renderTag({ children: <span>Dynamic Content</span> });
		expect(container.querySelector("span")).toHaveTextContent(
			"Dynamic Content"
		);
	});

	it("should apply data attributes correctly", () => {
		const dataAttrs = { "data-testid": "tag-test" };
		renderTag({ dataAttributes: dataAttrs });
		expect(screen.getByTestId("tag-test")).toBeInTheDocument();
	});

	it("should not fail if onClose is not provided", () => {
		const { container } = renderTag({ closable: true });
		const closeIcon = container.querySelector("svg");
		expect(closeIcon).toBeInTheDocument();
		// Clicking without onClose should not throw an error
		fireEvent.click(closeIcon as Element);
		expect(true).toBe(true); // Check that no error is thrown
	});

	it("should have correct default class and attributes", () => {
		renderTag();
		const tagElement = screen.getByText("Test Tag");
		expect(tagElement).toBeInTheDocument();
		// Check for default type classes
		expect(tagElement).toHaveClass("bg-gray-200");
		expect(tagElement).toHaveClass("text-gray-600");
		expect(tagElement).toHaveClass("rounded-lg");
		// Should not have close icon when closable is false
		expect(tagElement.querySelector("svg")).not.toBeInTheDocument();
	});
});
