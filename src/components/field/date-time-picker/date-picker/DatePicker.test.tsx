import { render, fireEvent } from '@testing-library/react';
import { DatePicker } from './DatePicker';
import { test, assert, describe } from 'vitest';

describe('DatePicker', () => {
	test('renders DatePicker component with default props', () => {
		const { container } = render(<DatePicker />);
		const datePickerElement = container.querySelector('.datepicker');
		assert(datePickerElement !== null, 'DatePicker component should be rendered');
	});

	test('calls onChange callback when a valid date is entered', () => {
		let selectedValue: Date | null = null;
		const handleChange = (value: Date | null) => {
			selectedValue = value;
		};

		const { getByRole, getByText } = render(
			<DatePicker onChange={handleChange} />
		);

		const input = getByRole('textbox');
		fireEvent.focus(input);

		// Select a date in the calendar dropdown
		const dateOption = getByText('15');
		fireEvent.click(dateOption);
		const selectedDate = 15;

		assert(selectedValue !== null, 'onChange callback should be called with selected value');
		const date = selectedValue as Date;
		assert(date instanceof Date, 'Selected value should be a Date object');
		assert(date.getDate() === selectedDate, 'Selected date should match expected value');
	});

	test('displays error message when date is out of range', () => {
		const { getByRole, getByText } = render(
			<DatePicker value={new Date(2023, 0, 31)} maxDate={new Date(2022, 11, 31)} />
		);

		const input = getByRole('textbox');
		fireEvent.focus(input);

		const errorMessage = getByText('Date is out of range');
		assert(errorMessage !== null, 'Error message should be displayed for out of range date');
	});

	test('disables date picker when disabled prop is true', () => {
		let selectedValue: Date | null = null;
		const handleChange = (value: Date | null) => {
			selectedValue = value;
		};

		const { getByRole, container } = render(
			<DatePicker onChange={handleChange} disabled />
		);

		const input = getByRole('textbox');
		fireEvent.focus(input);

		const dateOption = container.querySelector('.ph-calendar-day');
		assert(dateOption === null, 'No date options should be selectable when date picker is disabled');
	});

	test('displays placeholder text when placeholder prop is provided', () => {
		const placeholderText = 'Select a date';
		const { getByRole } = render(
			<DatePicker placeholder={placeholderText} />
		);

		const input = getByRole('textbox') as HTMLInputElement;
		assert(input.placeholder === placeholderText, 'Placeholder text should be displayed in the input field');
	});

	test('selects time and updates hours and minutes when showTimePicker is true', () => {
		let selectedValue: Date | null = null;
		const handleChange = (value: Date | null) => {
			selectedValue = value;
		};

		const { getByRole } = render(
			<DatePicker onChange={handleChange} showTimePicker />
		);

		const input = getByRole('textbox');

		fireEvent.focus(input);
		fireEvent.input(input, { target: { value: '12.07.2023. 15:30' } });

		assert(selectedValue !== null, 'onChange callback should be called with selected value');
		const date = selectedValue as Date;
		assert(date instanceof Date, 'Selected value should be a Date object');
		assert(date.getHours() === 15 && date.getMinutes() === 30, 'Selected hours and minutes should match expected values');
	});

	test('calls onChange with null when value is set to null externally', () => {
		let selectedValue: Date | null = new Date(2023, 0, 1);
		const handleChange = (value: Date | null) => {
			selectedValue = value;
		};

		const { rerender, getByRole } = render(
			<DatePicker value={selectedValue} onChange={handleChange} />
		);

		rerender(<DatePicker value={null} onChange={handleChange} />);
		const input = getByRole('textbox') as HTMLInputElement;
		assert(input.value === '', 'Input should be cleared when value is set to null externally');
	});

	test('calls onChange with null when clear button is clicked', () => {
		let selectedValue: Date | null = new Date(2024, 5, 10);
		const handleChange = (value: Date | null) => {
			selectedValue = value;
		};

		const { getByRole, container } = render(
			<DatePicker value={selectedValue} onChange={handleChange} clearable />
		);

		const clearButton = container.querySelector('.datepicker-clear');
		assert(clearButton !== null, 'Clear button should be rendered when clearable and value is set');
		if (clearButton) {
			fireEvent.click(clearButton);
		}
		assert(selectedValue === null, 'onChange should be called with null when clear button is clicked');
	});
});
