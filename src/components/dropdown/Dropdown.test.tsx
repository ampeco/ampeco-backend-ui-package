/* eslint-disable @typescript-eslint/no-empty-function */
import { describe, expect, vi, it } from "vitest";
import { Dropdown } from "./Dropdown";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Dropdown", () => {
	it("should render custom toggle element using renderToggle", () => {
		const renderToggle = ({ isOpen }: { isOpen: boolean }) => (
			<button>{isOpen ? "Open" : "Closed"}</button>
		);
		render(
			<Dropdown
				position="left"
				renderToggle={renderToggle}
				options={[{ label: "Option 1", onClick: vi.fn() }]}
			/>
		);
		expect(screen.getByText("Closed")).toBeInTheDocument();
	});

	it("should update toggle element when open state changes using renderToggle", () => {
		const renderToggle = ({ isOpen }: { isOpen: boolean }) => (
			<button>{isOpen ? "Open" : "Closed"}</button>
		);
		render(
			<Dropdown
				position="left"
				renderToggle={renderToggle}
				options={[{ label: "Option 1", onClick: vi.fn() }]}
			/>
		);
		const toggleButton = screen.getByText("Closed");
		fireEvent.click(toggleButton);
		expect(screen.getByText("Open")).toBeInTheDocument();
		expect(screen.getByText("Option 1")).toBeInTheDocument();
	});

	it("should call onClick handler from option when using renderToggle", () => {
		const optionClick = vi.fn();
		const renderToggle = ({ isOpen }: { isOpen: boolean }) => (
			<button>{isOpen ? "Open" : "Closed"}</button>
		);
		render(
			<Dropdown
				position="left"
				renderToggle={renderToggle}
				options={[{ label: "Option 1", onClick: optionClick }]}
			/>
		);
		const toggleButton = screen.getByText("Closed");
		fireEvent.click(toggleButton);
		const option = screen.getByText("Option 1");
		fireEvent.click(option);
		expect(optionClick).toHaveBeenCalledTimes(1);
		expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
	});

	it("should render without crashing", () => {
		const { getByText } = render(
			<Dropdown
				toggleElement={<div>Action Menu</div>}
				options={[]}
				position="left"
			/>
		);
		expect(getByText("Action Menu")).toBeInTheDocument();
	});

	it("should display toggle element, but not options when not open", () => {
		const optionClick = vi.fn();
		render(
			<Dropdown
				position="left"
				toggleElement={<div>Action Menu</div>}
				options={[{ label: "Option 1", onClick: optionClick }]}
			/>
		);
		expect(screen.getByText("Action Menu")).toBeInTheDocument();
		expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
	});

	it("should display options when open", () => {
		const optionClick = vi.fn();
		render(
			<Dropdown
				position="left"
				toggleElement={<div>Action Menu</div>}
				options={[{ label: "Option 1", onClick: optionClick }]}
			/>
		);

		fireEvent.click(screen.getByText("Action Menu"));

		expect(screen.getByText("Option 1")).toBeInTheDocument();
	});

	it("should call onClick handler and hide options when an option is clicked", async () => {
		const optionClick = vi.fn();
		render(
			<Dropdown
				position="left"
				toggleElement={<div>Action Menu</div>}
				options={[{ label: "Option 1", onClick: optionClick }]}
			/>
		);

		fireEvent.click(screen.getByText("Action Menu"));
		expect(screen.getByText("Option 1")).toBeInTheDocument();

		fireEvent.click(screen.getByText("Option 1"));
		expect(optionClick).toHaveBeenCalledTimes(1);
		expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
	});

	it("should not display options with `hidden: true`", () => {
		const optionClick = vi.fn();
		render(
			<Dropdown
				position="left"
				toggleElement={<div>Action Menu</div>}
				options={[
					{ label: "Option 1", onClick: optionClick },
					{ label: "Option 2", onClick: optionClick, hidden: true },
				]}
			/>
		);

		fireEvent.click(screen.getByText("Action Menu"));
		expect(screen.getByText("Option 1")).toBeInTheDocument();
		expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
	});

	it("should close options when clicked outside of the menu", async () => {
		vi.useFakeTimers();
		const optionClick = vi.fn();
		render(
			<Dropdown
				position="left"
				toggleElement={<div>Action Menu</div>}
				options={[{ label: "Option 1", onClick: optionClick }]}
			/>
		);

		fireEvent.click(screen.getByText("Action Menu"));
		expect(screen.getByText("Option 1")).toBeInTheDocument();

		fireEvent.click(document.body);
		vi.runAllTimers();
		expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
	});

	it("should apply custom class to action menu", () => {
		const { container } = render(
			<Dropdown
				position="left"
				toggleElement={<div>Action Menu</div>}
				options={[]}
				className="custom-class"
			/>
		);
		expect(container.querySelector(".custom-class")).toBeInTheDocument();
	});

	it("should render all visible options", () => {
		const { getByText } = render(
			<Dropdown
				position="left"
				toggleElement={<div>Action Menu</div>}
				options={[
					{ label: "Option 1", onClick: () => {} },
					{ label: "Option 2", onClick: () => {} },
					{ label: "Option 3", onClick: () => {} },
				]}
			/>
		);
		fireEvent.click(getByText("Action Menu"));

		expect(getByText("Option 1")).toBeInTheDocument();
		expect(getByText("Option 2")).toBeInTheDocument();
		expect(getByText("Option 3")).toBeInTheDocument();
	});

	it("should apply data attributes to the action menu", () => {
		const { container } = render(
			<Dropdown
				position="left"
				toggleElement={<div>Action Menu</div>}
				options={[{ label: "Option 1", onClick: () => {} }]}
				dataAttributes={{
					"data-testid": "action-menu",
					"data-custom": "custom-value",
				}}
			/>
		);

		const element = container.firstChild;
		expect(element).toHaveAttribute("data-testid", "action-menu");
		expect(element).toHaveAttribute("data-custom", "custom-value");
	});
});
