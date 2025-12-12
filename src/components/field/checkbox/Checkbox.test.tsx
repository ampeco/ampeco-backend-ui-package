import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, test, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
	test('renders and toggles value', () => {
		render(<Checkbox>Label</Checkbox>);
		const checkbox = screen.getByRole('checkbox');
		expect(checkbox).toBeInTheDocument();
	});

	test('fires onChangeEvent with full event and coexists with onChange', () => {
		const onChange = vi.fn();
		const onChangeEvent = vi.fn();
		render(<Checkbox onChange={onChange} onChangeEvent={onChangeEvent}>Label</Checkbox>);
		const checkbox = screen.getByRole('checkbox');

		fireEvent.click(checkbox);
		expect(onChange).toHaveBeenCalledWith(true);
		expect(onChangeEvent).toHaveBeenCalledTimes(1);
		const eventArg = onChangeEvent.mock.calls[0][0];
		expect(eventArg.target.checked).toBe(true);
	});
});
