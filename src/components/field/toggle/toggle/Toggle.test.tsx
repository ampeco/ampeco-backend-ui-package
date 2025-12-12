import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Toggle } from "./Toggle";
import { describe, expect, test, vi } from "vitest";

describe("Toggle Component", () => {
	test("renders correctly with default props", () => {
		render(<Toggle>Toggle Label</Toggle>);
		expect(screen.getByLabelText("Toggle Label")).toBeInTheDocument();
	});

	test("toggles the checkbox state when clicked", () => {
		const handleChange = vi.fn();
		render(<Toggle onChange={handleChange}>Toggle Label</Toggle>);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).not.toBeChecked();

		fireEvent.click(checkbox);
		expect(checkbox).toBeChecked();
		expect(handleChange).toHaveBeenCalledWith(true);

		fireEvent.click(checkbox);
		expect(checkbox).not.toBeChecked();
		expect(handleChange).toHaveBeenCalledWith(false);
	});

	test("respects the disabled prop", () => {
		render(<Toggle disabled>Toggle Label</Toggle>);
		const checkbox = screen.getByRole("checkbox");

		expect(checkbox).toBeDisabled();
	});

	test("renders custom class names", () => {
		render(<Toggle className="custom-class">Toggle Label</Toggle>);
		const checkbox = screen.getByRole("checkbox");
		const label = checkbox.closest("label");
		expect(label).toHaveClass("custom-class");
	});

	test("uses the provided id and name", () => {
		render(
			<Toggle id="custom-id" name="custom-name">
				Toggle Label
			</Toggle>
		);
		const checkbox = screen.getByRole("checkbox");

		expect(checkbox).toHaveAttribute("id", "custom-id");
		expect(checkbox).toHaveAttribute("name", "custom-name");
	});

	test("renders children correctly", () => {
		render(<Toggle>Toggle Custom Label</Toggle>);
		expect(screen.getByLabelText("Toggle Custom Label")).toBeInTheDocument();
	});

	test("applies data attributes correctly", () => {
		render(
			<Toggle dataAttributes={{ "data-test": "test-value" }}>
				Toggle Label
			</Toggle>
		);
		const checkbox = screen.getByRole("checkbox");
		const label = checkbox.closest("label");

		expect(label).toHaveAttribute("data-test", "test-value");
	});

	test("fires onChangeEvent with full event and coexists with onChange", () => {
		const onChange = vi.fn();
		const onChangeEvent = vi.fn();
		render(
			<Toggle onChange={onChange} onChangeEvent={onChangeEvent}>
				Toggle Label
			</Toggle>
		);
		const checkbox = screen.getByRole("checkbox");

		fireEvent.click(checkbox);
		expect(onChange).toHaveBeenCalledWith(true);
		expect(onChangeEvent).toHaveBeenCalledTimes(1);
		const eventArg = onChangeEvent.mock.calls[0][0];
		expect(eventArg.target.checked).toBe(true);
	});
});
