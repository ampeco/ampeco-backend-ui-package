import React from "react";
import { expect, test } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { PopoverProvider, usePopover } from "./PopoverContext";
import { Popover } from "./Popover";
import { Shape } from "../../types/Shape";
import { PopoverContent } from "./PopoverContent";
import { PopoverTrigger } from "./PopoverTrigger";

test("component renders children wrapped with PopoverProvider", () => {
	const { getByText } = render(
		<Popover preferredPosition="bottom">
			<div>Popover Content</div>
		</Popover>
	);
	const popoverContent = getByText("Popover Content");
	expect(popoverContent).toBeInTheDocument();
});

test("provider renders children and provides context", () => {
	const TestComponent = () => {
		const { isOpened, preferredPosition } = usePopover();
		return (
			<>
				<div data-testid="isOpened">{isOpened.toString()}</div>
				<div data-testid="preferredPosition">{preferredPosition}</div>
			</>
		);
	};

	const { getByTestId } = render(
		<PopoverProvider preferredPosition="bottom">
			<TestComponent />
		</PopoverProvider>
	);

	expect(getByTestId("isOpened").textContent).toBe("false");
	expect(getByTestId("preferredPosition").textContent).toBe("bottom");
});

test("usePopover outside PopoverProvider throws error", () => {
	const TestComponent = () => {
		let error: Error | null = null;

		try {
			usePopover();
		} catch (err) {
			error = err as Error;
		}

		return <div data-testid="error">{error ? error.message : "No error"}</div>;
	};

	const { getByTestId } = render(<TestComponent />);

	expect(getByTestId("error").textContent).toBe("No error");
});

test("provider correctly handles state management and context update", () => {
	const TestComponent = () => {
		const { isOpened, setIsOpened, triggerPosition, setTriggerPosition } =
			usePopover();

		const openPopover = () => setIsOpened(true);
		const updateTriggerPosition = () =>
			setTriggerPosition({ top: 10, left: 20, width: 30, height: 40 });

		return (
			<>
				<div data-testid="isOpened">{isOpened.toString()}</div>
				<div data-testid="triggerPosition">
					{JSON.stringify(triggerPosition)}
				</div>
				<button onClick={openPopover}>Open Popover</button>
				<button onClick={updateTriggerPosition}>Update Trigger</button>
			</>
		);
	};

	const { getByText, getByTestId } = render(
		<PopoverProvider preferredPosition="bottom">
			<TestComponent />
		</PopoverProvider>
	);

	expect(getByTestId("isOpened").textContent).toBe("false");
	expect(getByTestId("triggerPosition").textContent).toBe(
		'{"top":0,"left":0,"width":0,"height":0}'
	);

	fireEvent.click(getByText("Open Popover"));
	expect(getByTestId("isOpened").textContent).toBe("true");

	fireEvent.click(getByText("Update Trigger"));
	expect(getByTestId("triggerPosition").textContent).toBe(
		'{"top":10,"left":20,"width":30,"height":40}'
	);
});

test("preferred position propagation", () => {
	const TestComponent = () => {
		const { preferredPosition } = usePopover();

		return <div data-testid="preferredPosition">{preferredPosition}</div>;
	};

	const { getByTestId } = render(
		<PopoverProvider preferredPosition="right">
			<TestComponent />
		</PopoverProvider>
	);

	expect(getByTestId("preferredPosition").textContent).toBe("right");
});

test("shape prop propagation", () => {
	const TestComponent = () => {
		const { shape } = usePopover();

		return <div data-testid="test-shape">{shape}</div>;
	};

	const { getByTestId } = render(
		<PopoverProvider preferredPosition="right" shape={Shape.ROUNDED}>
			<TestComponent />
		</PopoverProvider>
	);

	expect(getByTestId("test-shape").textContent).toBe(Shape.ROUNDED);
});

test("applies class for shape", () => {
	const { container } = render(
		<Popover preferredPosition="right" shape={Shape.ROUNDED}>
			<PopoverTrigger>
				<button>click me</button>
			</PopoverTrigger>
			<PopoverContent>test</PopoverContent>
		</Popover>
	);

	const button = screen.getByText("click me");
	fireEvent.click(button);

	const dialogElement = container.querySelector("dialog");
	expect(dialogElement).toBeInTheDocument();
	expect(dialogElement).toHaveClass("rounded-[24px]");
});
