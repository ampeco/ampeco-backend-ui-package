import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";
import { describe, vi, it, expect } from "vitest";
import { Size } from "../../../types/Size";
import { Shape } from "../../../types/Shape";

describe("Button", () => {
	it("renders button with correct text", () => {
		render(<Button>Click me</Button>);

		const buttonElement = screen.getByText(/Click me/i);
		expect(buttonElement).toBeInTheDocument();
	});

	it("calls onClick handler when clicked", () => {
		const handleClick = vi.fn();
		render(<Button onClick={handleClick}>Click me</Button>);
		const buttonElement = screen.getByText(/Click me/i);
		fireEvent.click(buttonElement);

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("applies correct variant class", () => {
		render(<Button variant="outline">Outlined Button</Button>);

		const buttonElement = screen.getByText(/Outlined Button/i); // Query by text content
		expect(buttonElement).toHaveClass("border-2");
		expect(buttonElement).toHaveClass("border-gray-200");
	});

	it("when button is disabled, it should not be clickable", () => {
		const handleClick = vi.fn();
		render(
			<Button disabled onClick={handleClick}>
				Click me
			</Button>
		);

		const buttonElement = screen.getByText(/click me/i);
		fireEvent.click(buttonElement);

		expect(handleClick).not.toHaveBeenCalled();
	});

	it("when button is in loading state, it apply the spinner class", () => {
		render(<Button loading>Button</Button>);

		const buttonElement = screen.getByRole("button", { name: /Button/i });
		const loaderElement = buttonElement.querySelector("span.loader");

		expect(loaderElement).toBeInTheDocument();
		expect(loaderElement).toHaveClass("loader");
	});

	it("when button size is set to small it needs to have button-small class", () => {
		render(<Button size={Size.SMALL}>Small button</Button>);

		const buttonElement = screen.getByText("Small button");
		expect(buttonElement).toHaveClass("text-xs");
		expect(buttonElement).toHaveClass("px-2");
		expect(buttonElement).toHaveClass("h-7");
	});

	it("when button size is set to medium it needs to have button-medium class", () => {
		render(<Button size={Size.MEDIUM}>Medium button</Button>);

		const buttonElement = screen.getByText("Medium button");
		expect(buttonElement).toHaveClass("text-sm");
		expect(buttonElement).toHaveClass("px-4");
		expect(buttonElement).toHaveClass("h-9");
	});

	it("when button size is set to large it needs to have ph-button-large class", () => {
		render(<Button size={Size.LARGE}>Large button</Button>);

		const buttonElement = screen.getByText("Large button");
		expect(buttonElement).toHaveClass("text-base");
		expect(buttonElement).toHaveClass("px-6");
		expect(buttonElement).toHaveClass("h-11");
	});

	it("when button shape is set to round it needs to have shape-rounded class", () => {
		render(<Button shape={Shape.ROUNDED}>Round button</Button>);

		const buttonElement = screen.getByText("Round button");
		expect(buttonElement).toHaveClass("rounded-full");
	});
});
