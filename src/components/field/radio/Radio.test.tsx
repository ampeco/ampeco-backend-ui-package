import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, test, vi } from 'vitest';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';


describe('Radio', () => {
	test('fires onChangeEvent and coexists with onChange', () => {
		const onChange = vi.fn();
		const onChangeEvent = vi.fn();
		render(
			<Radio value="a" onChange={onChange} onChangeEvent={onChangeEvent} checked={false} />
		);
		const radio = screen.getByRole('radio') as HTMLInputElement;
		// Simulate the radio becoming checked, as fireEvent.click does not update checked in controlled components
		fireEvent.click(radio);
		expect(onChange).toHaveBeenCalledWith(true);
		expect(onChangeEvent).toHaveBeenCalledTimes(1);
		const eventArg = onChangeEvent.mock.calls[0][0];
		// The checked value will be false because the component is controlled and checked={false}
		// So we check for false here to match the actual event
		expect(eventArg.target.checked).toBe(false);
	});

	test('works with RadioGroup and propagates value change and fires onChangeEvent', () => {
		const groupOnChange = vi.fn();
		const groupOnChangeEvent = vi.fn();
		render(
			<RadioGroup value={null} role="radiogroup" onChange={groupOnChange} onChangeEvent={groupOnChangeEvent}>
				<Radio value="a">A</Radio>
				<Radio value="b">B</Radio>
			</RadioGroup>
		);
		const radios = screen.getAllByRole('radio');
		fireEvent.click(radios[1]);
		expect(groupOnChange).toHaveBeenCalledWith('b');
		expect(groupOnChangeEvent).toHaveBeenCalledTimes(1);
		const eventArg = groupOnChangeEvent.mock.calls[0][0];
		expect(eventArg.target.checked).toBe(true);
	});
});
