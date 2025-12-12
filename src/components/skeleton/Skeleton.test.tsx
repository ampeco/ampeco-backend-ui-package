import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, afterEach, expect } from "vitest";
import { Skeleton, SkeletonProps } from "./Skeleton"; // Adjust the path as needed
import { DataAttributesType } from "../../types/DataAttributes"; // Adjust the path as needed

describe("Skeleton component", () => {
	afterEach(cleanup);

	const defaultProps: SkeletonProps<"span"> = {
		Component: "span",
	};

	it("renders without crashing", () => {
		const dataAttributes: DataAttributesType = {
			"data-testid": "skeleton-element",
		};
		render(<Skeleton {...defaultProps} dataAttributes={dataAttributes} />);
		const element = screen.getByTestId("skeleton-element");
		expect(element).toBeInTheDocument();
	});

	it("applies default classes correctly", () => {
		const dataAttributes: DataAttributesType = {
			"data-testid": "skeleton-element",
		};
		render(<Skeleton {...defaultProps} dataAttributes={dataAttributes} />);
		const element = screen.getByTestId("skeleton-element");
		expect(element).toHaveClass("block");
		expect(element).toHaveClass("bg-gray-200");
		expect(element).toHaveClass("dark:bg-gray-700");
		expect(element).toHaveClass("w-max");
		expect(element).toHaveClass("rounded-lg");
		expect(element).toHaveClass("animate-pulse");
	});

	it("renders with a different component type", () => {
		type ComponentType = "div" | "p" | "section";
		const components: Array<ComponentType> = ["div", "p", "section"];

		components.forEach((Component) => {
			const dataAttributes: DataAttributesType = {
				"data-testid": `skeleton-element-${Component}`,
			};
			render(
				<Skeleton Component={Component} dataAttributes={dataAttributes} />
			);
			const element = screen.getByTestId(`skeleton-element-${Component}`);
			expect(element.nodeName.toLowerCase()).toBe(Component);
			cleanup();
		});
	});

	it("renders with children", () => {
		const customProps: SkeletonProps<"span"> = {
			...defaultProps,
			children: <div>Hidden content</div>,
		};
		const dataAttributes: DataAttributesType = {
			"data-testid": "skeleton-element",
		};
		render(<Skeleton {...customProps} dataAttributes={dataAttributes} />);
		const element = screen.getByTestId("skeleton-element");
		expect(element).toHaveClass("max-w-fit");
		expect(element).toHaveClass("h-auto");
		const childElement = screen.getByText(/Hidden content/i);
		expect(childElement).toBeInTheDocument();
		// The invisible class is on the wrapper span, not the child
		const invisibleWrapper = childElement.closest("span.invisible");
		expect(invisibleWrapper).toBeInTheDocument();
	});

	it("renders loading text for screen readers when no children", () => {
		const dataAttributes: DataAttributesType = {
			"data-testid": "skeleton-element",
		};
		render(<Skeleton {...defaultProps} dataAttributes={dataAttributes} />);
		const loadingText = screen.getByText("Loading...");
		expect(loadingText).toBeInTheDocument();
		expect(loadingText).toHaveClass("invisible");
	});

	it("applies w-full class when fullWidth is true", () => {
		const dataAttributes: DataAttributesType = {
			"data-testid": "skeleton-element",
		};
		render(
			<Skeleton
				{...defaultProps}
				fullWidth={true}
				dataAttributes={dataAttributes}
			/>
		);
		const element = screen.getByTestId("skeleton-element");
		expect(element).toHaveClass("w-full");
		expect(element).not.toHaveClass("w-max");
		expect(element).not.toHaveClass("max-w-fit");
	});

	it("applies w-full class when fullWidth is true even with children", () => {
		const customProps: SkeletonProps<"span"> = {
			...defaultProps,
			children: <div>Hidden content</div>,
			fullWidth: true,
		};
		const dataAttributes: DataAttributesType = {
			"data-testid": "skeleton-element",
		};
		render(<Skeleton {...customProps} dataAttributes={dataAttributes} />);
		const element = screen.getByTestId("skeleton-element");
		expect(element).toHaveClass("w-full");
		expect(element).not.toHaveClass("max-w-fit");
		expect(element).not.toHaveClass("h-auto");
	});
});
