import { render, fireEvent, waitFor } from '@testing-library/react';
import { TimePicker, TimePickerProps } from './TimePicker';
import { test, describe, expect, vi } from 'vitest';
import { SimpleTime } from '../../../../types/internal/DateTime';

describe('TimePicker', () => {
	let selectedTime: SimpleTime | null = null;

	const defaultProps: TimePickerProps = {
		onChange: vi.fn((value) => selectedTime = value),
	};
	test('renders component without crashing', () => {
		const { getByRole } = render(<TimePicker />);

		const input = getByRole('textbox');
		expect(input).toBeInTheDocument();
	});
  
	test('selects time when user types into the input', async () => {
		const { getByRole } = render(<TimePicker />);
  
		const input = getByRole('textbox');
  
		fireEvent.change(input, { target: { value: '15:30' } });
    
		await waitFor(() => {
			const updatedValue = (input as any).value;
			expect(updatedValue).toBe('15:30');
		});
	});

	test('does not call onChange with invalid time input', async () => {
		const { getByRole } = render(<TimePicker {...defaultProps} />);

		const input = getByRole('textbox');
		fireEvent.focus(input);
		fireEvent.change(input, { target: { value: '25:30' } });

		await waitFor(() => {
			expect(defaultProps.onChange).not.toHaveBeenCalled();
			expect(selectedTime).toBe(null);
		});
	});

	test('maxTime validation', async () => {
		const { getByRole, getByText } = render(<TimePicker value={{ hours: 17, minutes: 30 }} maxTime={{ hours: 16, minutes: 0 }} />);

		const input = getByRole('textbox');
		fireEvent.focus(input);
    
		expect(getByText('Time not within valid range')).toBeInTheDocument();
	});

	test('minTime validation', async () => {
		const { getByRole, getByText } = render(<TimePicker value={{ hours: 7, minutes: 30 }} minTime={{ hours: 9, minutes: 0 }} />);

		const input = getByRole('textbox');
		fireEvent.focus(input);

		expect(getByText('Time not within valid range')).toBeInTheDocument();
	});

	test('renders in disabled state', async () => {
		const { getByRole } = render(<TimePicker {...defaultProps} disabled />);

		const input = getByRole('textbox');
		expect(input).toBeDisabled();
	});
});