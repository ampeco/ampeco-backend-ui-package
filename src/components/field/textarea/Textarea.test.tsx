import { render, fireEvent } from "@testing-library/react";
import { Textarea } from "./Textarea";
import { test, expect, assert, describe, vi } from "vitest";

describe("Textarea", () => {
	test("renders Textarea component with default props", () => {
		const { getByRole } = render(<Textarea />);
		const textareaElement = getByRole("textbox");
		expect(textareaElement).toBeInTheDocument();
	});

	test("calls onChange callback when typing into textarea", () => {
		const onChangeMock = (value: string) => {
			assert(
				value === "Textarea test",
				"onChange callback should be called with correct value"
			);
		};
		const { getByRole } = render(<Textarea onChange={onChangeMock} />);
		const textareaElement = getByRole("textbox");

		fireEvent.input(textareaElement, { target: { value: "Textarea test" } });
	});

	test("displays error message when error prop is true", () => {
		const { getByText } = render(
			<Textarea error errorMsg="Invalid input" />
		);
		const errorMessage = getByText("Invalid input");
		assert(errorMessage !== null, "Error message should be displayed");
	});

	test("renders label when label prop is provided", () => {
		const { getByText } = render(<Textarea label="Description" />);
		const labelElement = getByText("Description");
		assert(labelElement !== null, "Label should be rendered");
	});

	test("disables textarea when disabled prop is true", () => {
		const { getByRole } = render(<Textarea disabled />);
		const textareaElement = getByRole("textbox") as HTMLTextAreaElement;
		assert(textareaElement.disabled, "Textarea should be disabled");
	});

	test("sets readonly when readonly prop is true", () => {
		const { getByRole } = render(<Textarea readonly />);
		const textareaElement = getByRole("textbox") as HTMLTextAreaElement;
		assert(textareaElement.readOnly, "Textarea should be readonly");
	});

	test("sets required when required prop is true", () => {
		const { getByRole } = render(<Textarea required />);
		const textareaElement = getByRole("textbox") as HTMLTextAreaElement;
		assert(textareaElement.required, "Textarea should be required");
	});

	test("implements defined class name", () => {
		const customClassName = "custom-textarea";
		const { container } = render(<Textarea className={customClassName} />);
		const textareaWrapper = container.querySelector(
			'[class*="flex flex-col gap-2"]'
		);

		expect(textareaWrapper).toHaveClass("custom-textarea");
	});

	test("calls onChangeEvent with the full event object", () => {
		const onChangeEvent = vi.fn();
		const { getByRole } = render(<Textarea onChangeEvent={onChangeEvent} />);
		const textareaElement = getByRole("textbox");

		fireEvent.input(textareaElement, { target: { value: "abc" } });

		expect(onChangeEvent).toHaveBeenCalledTimes(1);
		const eventArg = onChangeEvent.mock.calls[0][0];
		expect(eventArg).toBeDefined();
		expect(eventArg.target.value).toBe("abc");
	});

	test("calls both onChange and onChangeEvent when both are provided", () => {
		const onChange = vi.fn();
		const onChangeEvent = vi.fn();
		const { getByRole } = render(
			<Textarea onChange={onChange} onChangeEvent={onChangeEvent} />
		);
		const textareaElement = getByRole("textbox");

		fireEvent.input(textareaElement, { target: { value: "xyz" } });

		expect(onChange).toHaveBeenCalledWith("xyz");
		expect(onChangeEvent).toHaveBeenCalledTimes(1);
		const eventArg = onChangeEvent.mock.calls[0][0];
		expect(eventArg.target.value).toBe("xyz");
	});

	test("sets rows attribute correctly", () => {
		const { getByRole } = render(<Textarea rows={10} />);
		const textareaElement = getByRole("textbox") as HTMLTextAreaElement;
		expect(textareaElement.rows).toBe(10);
	});

	test("sets cols attribute correctly", () => {
		const { getByRole } = render(<Textarea cols={50} />);
		const textareaElement = getByRole("textbox") as HTMLTextAreaElement;
		expect(textareaElement.cols).toBe(50);
	});

	test("uses default rows value when not provided", () => {
		const { getByRole } = render(<Textarea />);
		const textareaElement = getByRole("textbox") as HTMLTextAreaElement;
		expect(textareaElement.rows).toBe(4);
	});

	test("calls onBlur callback when textarea loses focus", () => {
		const onBlurMock = vi.fn();
		const { getByRole } = render(<Textarea onBlur={onBlurMock} />);
		const textareaElement = getByRole("textbox");

		fireEvent.blur(textareaElement);

		expect(onBlurMock).toHaveBeenCalledTimes(1);
	});

	test("renders placeholder correctly", () => {
		const { getByRole } = render(
			<Textarea placeholder="Enter your message" />
		);
		const textareaElement = getByRole("textbox") as HTMLTextAreaElement;
		expect(textareaElement.placeholder).toBe("Enter your message");
	});
});

