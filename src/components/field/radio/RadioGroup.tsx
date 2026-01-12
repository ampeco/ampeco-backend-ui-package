import {
	ChangeEvent,
	createContext,
	ReactNode,
	useCallback,
	useId,
	useState,
} from "react";
import { ErrorMessage } from "../error-message/ErrorMessage";

interface RadioContextType {
	name?: string;
	value: string | null;
	ariaLabelledby: string;
	role: string;
	onChange: (value: string) => void;
	onChangeEvent: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const RadioContext = createContext<RadioContextType | null>(null);

interface RadioGroupProps {
	value: string | null;
	role: string;
	/**
	 * @deprecated Use `onChangeEvent` on `Radio` items to receive the full event.
	 * `RadioGroup` continues to aggregate value changes; prefer event handlers on `Radio` when needed.
	 */
	onChange?: (value: string) => void;
	onChangeEvent?: (e: ChangeEvent<HTMLInputElement>) => void;
	name?: string;
	children?: ReactNode;
	className?: string;
	error?: boolean;
	errorMsg?: string;
}

export const RadioGroup = ({
	value,
	role = "radiogroup",
	onChange,
	onChangeEvent,
	name,
	children,
	className,
	error,
	errorMsg,
}: RadioGroupProps) => {
	const uniqueName = useId();
	const finalName = name ?? uniqueName;
	const [currentValue, setCurrentValue] = useState(value);

	const handleChange = useCallback(
		(value: string) => {
			if (onChange) {
				onChange(value);
			}
			setCurrentValue(value);
		},
		[onChange]
	);

	const handleChangeEvent = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			if (onChangeEvent) {
				onChangeEvent(e);
			}
		},
		[onChangeEvent]
	);

	return (
		<RadioContext.Provider
			value={{
				value: currentValue,
				role: role,
				ariaLabelledby: finalName || "",
				name: finalName,
				onChange: handleChange,
				onChangeEvent: handleChangeEvent,
			}}
		>
			<div className={className}>
				{children}
				{errorMsg && error && <ErrorMessage>{errorMsg}</ErrorMessage>}
			</div>
		</RadioContext.Provider>
	);
};
