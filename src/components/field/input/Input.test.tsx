import { render, fireEvent } from "@testing-library/react";
import { Input } from "./Input";
import { test, expect, assert, describe, vi } from "vitest";

describe("Input", () => {
	test("renders Input component with default props", () => {
		const { getByRole } = render(<Input />);
		const inputElement = getByRole("textbox");
		expect(inputElement).toBeInTheDocument();
	});

	test("calls onChange callback when typing into input", () => {
		const onChangeMock = (value: string) => {
			assert(
				value === "Input test",
				"onChange callback should be called with correct value"
			);
		};
		const { getByRole } = render(<Input onChange={onChangeMock} />);
		const inputElement = getByRole("textbox");

		fireEvent.input(inputElement, { target: { value: "Input test" } });
	});

	test("renders clear button and clears input on click", () => {
		const onChangeMock = (value: string) => {
			assert(
				value === "",
				"onChange callback should be called with empty string"
			);
		};
		const { getByTestId } = render(
			<Input value="Initial Value" onChange={onChangeMock} clearable />
		);
		const clearButton = getByTestId("clear-button");

		assert(clearButton !== null, "Clear button should be rendered");

		fireEvent.click(clearButton);
	});

	test("displays error message when error prop is true", () => {
		const { getByText } = render(<Input error errorMsg="Invalid input" />);
		const errorMessage = getByText("Invalid input");
		assert(errorMessage !== null, "Error message should be displayed");
	});

	test("renders label when label prop is provided", () => {
		const { getByText } = render(<Input label="Username" />);
		const labelElement = getByText("Username");
		assert(labelElement !== null, "Label should be rendered");
	});

	test("disables input when disabled prop is true", () => {
		const { getByRole } = render(<Input disabled />);
		const inputElement = getByRole("textbox") as HTMLInputElement;
		assert(inputElement.disabled, "Input should be disabled");
	});

	test("implements defined class name", () => {
		const customClassName = "custom-input";
		const { container } = render(<Input className={customClassName} />);
		const inputWrapper = container.querySelector(
			'[class*="flex flex-col gap-2"]'
		);

		expect(inputWrapper).toHaveClass("custom-input");
	});

	test("renders prefix and suffix props correctly", () => {
		const prefixText = "$";
		const suffixIcon = <span>@</span>;

		const { getByText, getByRole } = render(
			<Input prefix={prefixText} suffix={suffixIcon} />
		);

		const prefixElement = getByText(prefixText);
		const suffixElement = getByText("@");

		const inputElement = getByRole("textbox");

		expect(prefixElement).toBeInTheDocument();
		expect(suffixElement).toBeInTheDocument();

		expect(inputElement?.previousSibling?.textContent).toBe(prefixText);
		expect(inputElement?.nextSibling?.textContent).toBe("@");
	});

	test("calls onChangeEvent with the full event object", () => {
		const onChangeEvent = vi.fn();
		const { getByRole } = render(<Input onChangeEvent={onChangeEvent} />);
		const inputElement = getByRole("textbox");

		fireEvent.input(inputElement, { target: { value: "abc" } });

		expect(onChangeEvent).toHaveBeenCalledTimes(1);
		const eventArg = onChangeEvent.mock.calls[0][0];
		expect(eventArg).toBeDefined();
		expect(eventArg.target.value).toBe("abc");
	});

	test("calls both onChange and onChangeEvent when both are provided", () => {
		const onChange = vi.fn();
		const onChangeEvent = vi.fn();
		const { getByRole } = render(
			<Input onChange={onChange} onChangeEvent={onChangeEvent} />
		);
		const inputElement = getByRole("textbox");

		fireEvent.input(inputElement, { target: { value: "xyz" } });

		expect(onChange).toHaveBeenCalledWith("xyz");
		expect(onChangeEvent).toHaveBeenCalledTimes(1);
		const eventArg = onChangeEvent.mock.calls[0][0];
		expect(eventArg.target.value).toBe("xyz");
	});
});
