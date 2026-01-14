import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Select } from "./Select";
import { test, expect, assert, describe } from "vitest";
import { SelectOption } from "../../../types/SelectOption";
import { XMarkIcon } from "@heroicons/react/24/solid";

describe("Select", () => {
	test("renders Select component with default props", () => {
		const { container } = render(<Select options={[]} />);
		// Select wrapper has class "w-max flex flex-col gap-2"
		const selectElement = container.querySelector(
			'[class*="w-max flex flex-col gap-2"]'
		);
		assert(selectElement !== null, "Select component should be rendered");
	});

	test("calls onChange callback when an option is selected", async () => {
		const options: SelectOption<string>[] = [
			{ label: "Option 1", value: "option1" },
			{ label: "Option 2", value: "option2" },
		];

		let selectedValue: string | string[] | null = null;
		const handleChange = (value: string | string[] | null) => {
			selectedValue = value;
		};

		const { container, getByRole } = render(
			<Select options={options} onChange={handleChange} />
		);

		// Click on the FieldBase to open the dropdown
		const fieldBase = container.querySelector(
			'[class*="flex gap-2 items-center"]'
		);
		fireEvent.click(fieldBase!);

		// Wait for dropdown to open and options to appear
		await waitFor(() => {
			const option1 = screen.getByText("Option 1");
			expect(option1).toBeInTheDocument();
		});

		const option1 = screen.getByText("Option 1");
		fireEvent.click(option1);

		assert(
			selectedValue === "option1",
			"onChange callback should be called with selected value"
		);
	});

	test("allows selecting multiple options in multi-select mode", async () => {
		const options: SelectOption<string>[] = [
			{ label: "Option 1", value: "option1" },
			{ label: "Option 2", value: "option2" },
			{ label: "Option 3", value: "option3" },
		];

		let selectedValues: string | string[] | null = [];
		const handleChange = (values: string | string[] | null) => {
			selectedValues = values;
		};

		const { container } = render(
			<Select options={options} onChange={handleChange} multi />
		);

		// Click on the FieldBase to open the dropdown
		const fieldBase = container.querySelector(
			'[class*="flex gap-2 items-center"]'
		);
		fireEvent.click(fieldBase!);

		// Wait for dropdown to open
		await waitFor(() => {
			const option1 = screen.getByText("Option 1");
			expect(option1).toBeInTheDocument();
		});

		const option1 = screen.getByText("Option 1");
		const option2 = screen.getByText("Option 2");
		fireEvent.click(option1);
		fireEvent.click(option2);

		assert(
			Array.isArray(selectedValues) && selectedValues.includes("option1"),
			"Option 1 should be selected"
		);
		assert(
			Array.isArray(selectedValues) && selectedValues.includes("option2"),
			"Option 2 should be selected"
		);
	});

	test("displays error message when error prop is true", () => {
		const { getByText } = render(
			<Select options={[]} error errorMsg="Invalid selection" />
		);
		const errorMessage = getByText("Invalid selection");
		assert(errorMessage !== null, "Error message should be displayed");
	});

	test("disables select when disabled prop is true", async () => {
		const options: SelectOption<string>[] = [
			{ label: "Option 1", value: "option1" },
		];

		let selectedValue: string | string[] | null = null;
		const handleChange = (value: string | string[] | null) => {
			selectedValue = value;
		};

		const { container } = render(
			<Select
				options={options}
				onChange={handleChange}
				disabled
				dataAttributes={{ "data-testid": "select" }}
			/>
		);

		// When disabled, clicking should not open the dropdown
		const fieldBase = container.querySelector(
			'[class*="flex gap-2 items-center"]'
		);
		fireEvent.click(fieldBase!);

		// Wait a bit to ensure dropdown doesn't open
		await new Promise((resolve) => setTimeout(resolve, 100));

		// Options should not be visible when disabled
		expect(screen.queryByText("Option 1")).not.toBeInTheDocument();

		assert(
			selectedValue === null,
			"No option should be selected when select is disabled"
		);
	});

	test("implements defined class name", () => {
		const customClassName = "custom-select";
		const { container } = render(<Select className={customClassName} />);
		const selectWrapper = container.querySelector(
			'[class*="w-max flex flex-col gap-2"]'
		);

		expect(selectWrapper).toHaveClass("custom-select");
	});

	test("renders renderOption in options list and as field display", async () => {
		const options: SelectOption<string>[] = [
			{
				label: "Option 1",
				value: "option1",
				renderOption: (
					<span>
						<XMarkIcon className="w-4 h-4" data-testid="icon" />
						<span>Option 1</span>
					</span>
				),
			},
			{ label: "Option 2", value: "option2" },
		];

		const { container } = render(<Select options={options} />);

		// Click on the FieldBase to open the dropdown
		const fieldBase = container.querySelector(
			'[class*="flex gap-2 items-center"]'
		);
		fireEvent.click(fieldBase!);

		// Wait for dropdown to open
		await waitFor(() => {
			const icon = screen.getByTestId("icon");
			expect(icon).toBeInTheDocument();
		});

		// Custom icon from renderOption should be present in the options list
		const icon = screen.getByTestId("icon");
		assert(icon !== null, "Custom reactNode content should be rendered");

		// Clicking the option selects it - find the parent div with flex items-center gap-2
		const optionContainer = icon.closest('[class*="flex items-center gap-2"]');
		fireEvent.click(optionContainer as Element);

		// When renderOption is provided, it should be displayed in a span with flex items-center
		await waitFor(() => {
			const displayNode = container.querySelector(
				'span[class*="flex items-center"]'
			);
			assert(
				displayNode !== null,
				"Display node should be rendered in the field"
			);
			// Ensure our icon is inside the display node
			const iconInField = (displayNode as Element).querySelector(
				'[data-testid="icon"]'
			);
			assert(
				iconInField !== null,
				"Icon should be rendered inside the display node"
			);
		});
	});

	test("uses label as display value when no renderOption is provided", async () => {
		const options: SelectOption<string>[] = [
			{ label: "Option 1", value: "option1" },
			{ label: "Option 2", value: "option2" },
		];

		const { container, getByRole, getByText } = render(
			<Select options={options} />
		);

		// Click on the FieldBase to open the dropdown
		const fieldBase = container.querySelector(
			'[class*="flex gap-2 items-center"]'
		);
		fireEvent.click(fieldBase!);

		// Wait for dropdown to open
		await waitFor(() => {
			const option1 = getByText("Option 1");
			expect(option1).toBeInTheDocument();
		});

		const option1 = getByText("Option 1");
		fireEvent.click(option1);

		const selectInput = getByRole("textbox");
		expect((selectInput as HTMLInputElement).value).toBe("Option 1");
	});
});
