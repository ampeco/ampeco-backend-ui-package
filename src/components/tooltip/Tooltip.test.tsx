import React from "react";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {describe, expect, test} from "vitest";
import "@testing-library/jest-dom";
import {Tooltip} from "./Tooltip";
import {TooltipPosition} from "./enums/TooltipPosition.enum";

describe("Tooltip Component", () => {
	test("renders children correctly", () => {
		render(
			<Tooltip message="Test message">
				<button>Hover me</button>
			</Tooltip>
		);
		expect(screen.getByText("Hover me")).toBeInTheDocument();
	});

	test("tooltip is initially hidden", async () => {
		render(
			<Tooltip message="Test message">
				<button>Hover me</button>
			</Tooltip>
		);
		const tooltipContainer = screen.queryByText("Test message");
		expect(tooltipContainer).not.toBeInTheDocument();
	});

	test("shows tooltip on mouse enter after a delay", async () => {
		render(
			<Tooltip message="Test message">
				<button>Hover me</button>
			</Tooltip>
		);

		const button = screen.getByText("Hover me");
		fireEvent.mouseEnter(button);

		await waitFor(() => {
			expect(screen.getByText("Test message")).toBeInTheDocument();
		}, { timeout: 600 });
	});

	test("hides tooltip on mouse leave", async () => {
		render(
			<Tooltip message="Test message">
				<button>Hover me</button>
			</Tooltip>
		);

		const button = screen.getByText("Hover me");
		fireEvent.mouseEnter(button);

		await waitFor(() => {
			expect(screen.getByText("Test message")).toBeInTheDocument();
		}, { timeout: 600 });

		fireEvent.mouseLeave(button);

		await waitFor(() => {
			expect(screen.queryByText("Test message")).not.toBeInTheDocument();
		});
	});

	test("renders multiline message correctly", async () => {
		const multilineMessage = "Line 1\nLine 2\nLine 3";
		render(
			<Tooltip message={multilineMessage}>
				<button>Hover me</button>
			</Tooltip>
		);

		const button = screen.getByText("Hover me");
		fireEvent.mouseEnter(button);

		await waitFor(() => {
			multilineMessage.split("\n").forEach(line => {
				expect(screen.getByText(line)).toBeInTheDocument();
			});
		});
	});

	test("applies custom className", async () => {
		render(
			<Tooltip message="Test message" className="custom-class">
				<button>Hover me</button>
			</Tooltip>
		);

		const button = screen.getByText("Hover me");
		fireEvent.mouseEnter(button);

		await waitFor(() => {
			const tooltipElement = screen.getByText("Test message").closest("span");
			expect(tooltipElement).toHaveClass("custom-class");
		});
	});

	test("applies data attributes", async () => {
		render(
			<Tooltip message="Test message" dataAttributes={{ "data-testid": "tooltip-test" }}>
				<button>Hover me</button>
			</Tooltip>
		);

		const button = screen.getByText("Hover me");
		fireEvent.mouseEnter(button);

		await waitFor(() => {
			expect(screen.getByTestId("tooltip-test")).toBeInTheDocument();
		});
	});

	test("renders tooltip in the correct position", async () => {
		const { rerender, container } = render(
			<Tooltip message="Test message" position={TooltipPosition.LEFT}>
				<button>Hover me</button>
			</Tooltip>
		);

		const wrapper = container.querySelector('[class*="inline-block relative"]');
		fireEvent.mouseEnter(wrapper!);

		await waitFor(() => {
			const tooltipElement = screen.getByText("Test message").closest("span");
			expect(tooltipElement).toHaveClass("right-full");
			expect(tooltipElement).toHaveClass("top-1/2");
			expect(tooltipElement).toHaveClass("-translate-y-1/2");
			expect(tooltipElement).toHaveClass("-translate-x-2");
		});

		rerender(
			<Tooltip message="Test message" position={TooltipPosition.BOTTOM}>
				<button>Hover me</button>
			</Tooltip>
		);

		const wrapper2 = container.querySelector('[class*="inline-block relative"]');
		fireEvent.mouseEnter(wrapper2!);

		await waitFor(() => {
			const tooltipElement = screen.getByText("Test message").closest("span");
			expect(tooltipElement).toHaveClass("top-full");
			expect(tooltipElement).toHaveClass("left-1/2");
			expect(tooltipElement).toHaveClass("-translate-x-1/2");
			expect(tooltipElement).toHaveClass("translate-y-2");
		});

		rerender(
			<Tooltip message="Test message" position={TooltipPosition.RIGHT}>
				<button>Hover me</button>
			</Tooltip>
		);

		const wrapper3 = container.querySelector('[class*="inline-block relative"]');
		fireEvent.mouseEnter(wrapper3!);

		await waitFor(() => {
			const tooltipElement = screen.getByText("Test message").closest("span");
			expect(tooltipElement).toHaveClass("left-full");
			expect(tooltipElement).toHaveClass("top-1/2");
			expect(tooltipElement).toHaveClass("-translate-y-1/2");
			expect(tooltipElement).toHaveClass("translate-x-2");
		});

		rerender(
			<Tooltip message="Test message" position={TooltipPosition.TOP}>
				<button>Hover me</button>
			</Tooltip>
		);

		const wrapper4 = container.querySelector('[class*="inline-block relative"]');
		fireEvent.mouseEnter(wrapper4!);

		await waitFor(() => {
			const tooltipElement = screen.getByText("Test message").closest("span");
			expect(tooltipElement).toHaveClass("bottom-full");
			expect(tooltipElement).toHaveClass("left-1/2");
			expect(tooltipElement).toHaveClass("-translate-x-1/2");
			expect(tooltipElement).toHaveClass("-translate-y-2");
		});
	});
});
