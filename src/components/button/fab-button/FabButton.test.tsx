import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FabButton } from "./FabButton";
import { describe, vi, it, expect } from "vitest";
import { Size } from "../../../types/Size";

describe("FabButton", () => {
	it("renders button with correct text", () => {
		render(<FabButton>Click me</FabButton>);

		const buttonElement = screen.getByText(/Click me/i);
		expect(buttonElement).toBeInTheDocument();
	});

	it("calls onClick handler when clicked", () => {
		const handleClick = vi.fn();
		render(<FabButton onClick={handleClick}>Click me</FabButton>);
		const buttonElement = screen.getByText(/Click me/i);
		fireEvent.click(buttonElement);

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("applies correct variant class", () => {
		const { container } = render(<FabButton variant="outline">Outlined Button</FabButton>);

		const buttonElement = container.querySelector("button");
		expect(buttonElement).toHaveClass("border-2");
		expect(buttonElement).toHaveClass("border-gray-200");
	});

	it("when button is disabled, it should not be clickable", () => {
		const handleClick = vi.fn();
		render(
			<FabButton disabled onClick={handleClick}>
				Click me
			</FabButton>
		);

		const buttonElement = screen.getByText(/click me/i);
		fireEvent.click(buttonElement);

		expect(handleClick).not.toHaveBeenCalled();
	});

	it("when button is in loading state, it apply the spinner class", () => {
		render(<FabButton loading>Button</FabButton>);

		const buttonElement = screen.getByRole("button", { name: /Button/i });
		const loaderElement = buttonElement.querySelector("span.loader");

		expect(loaderElement).toBeInTheDocument();
		expect(loaderElement).toHaveClass("loader");
	});

	it("when button size is set to small it needs to have button-small class", () => {
		const { container } = render(<FabButton size={Size.SMALL}>Small button</FabButton>);

		const buttonElement = container.querySelector("button");
		expect(buttonElement).toHaveClass("text-xs");
		expect(buttonElement).toHaveClass("px-2");
		expect(buttonElement).toHaveClass("h-7");
	});

	it("when button size is set to medium it needs to have button-medium class", () => {
		const { container } = render(<FabButton size={Size.MEDIUM}>Medium button</FabButton>);

		const buttonElement = container.querySelector("button");
		expect(buttonElement).toHaveClass("text-sm");
		expect(buttonElement).toHaveClass("px-4");
		expect(buttonElement).toHaveClass("h-9");
	});

	it("when button size is set to large it needs to have ph-button-large class", () => {
		const { container } = render(<FabButton size={Size.LARGE}>Large button</FabButton>);

		const buttonElement = container.querySelector("button");
		expect(buttonElement).toHaveClass("text-base");
		expect(buttonElement).toHaveClass("px-6");
		expect(buttonElement).toHaveClass("h-11");
	});
});
