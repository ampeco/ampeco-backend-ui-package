import {useCallback, useEffect, useRef, useState} from 'react';

/**
 * Creates a default state in the if no value and onChange handler are provided
 *
 * Useful for making uncontrolled/controlled components
 */
export const useDefaultValueState = <T, C extends T = T>(
	defaultValue: T,
	value?: T,
	onChange?: (value: C) => void
): [T, (value: C) => void] => {
	const [defaultState, setDefaultState] = useState<T>(defaultValue);
	const isControlled = useRef(value !== undefined);

	// Sync internal state when external value prop changes
	// This ensures the component responds to external value updates (including when cleared)
	useEffect(() => {
		// If the component was ever controlled or is currently controlled
		if (isControlled.current || value !== undefined) {
			isControlled.current = true;
			setDefaultState(value ?? defaultValue);
		}
	}, [value, defaultValue]);

	const setState = useCallback((newValue: C): void => {
		if(onChange) {
			onChange(newValue);
		}
		setDefaultState(() => newValue);
	}, [onChange]);

	return [value ?? defaultState, setState];
};
