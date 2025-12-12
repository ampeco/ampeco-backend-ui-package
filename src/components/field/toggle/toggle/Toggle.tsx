import {
	forwardRef,
	ReactNode,
	useCallback,
	useState,
	ChangeEvent,
	useId,
} from "react";
import classNames from "classnames";
import DataAttributes from "../../../../types/DataAttributes";

interface Toggle extends DataAttributes {
	value?: boolean;
	defaultValue?: boolean;
	/**
	 * @deprecated Use `onChangeEvent` to receive the full `ChangeEvent<HTMLInputElement>`.
	 * The legacy `onChange` only returns the boolean value for backward compatibility
	 * and will be removed in a future major release. Switching to `onChangeEvent`
	 * enables unified handlers that can process multiple inputs.
	 */
	onChange?: (value: boolean) => void;
	onChangeEvent?: (e: ChangeEvent<HTMLInputElement>) => void;
	name?: string;
	id?: string;
	className?: classNames.Value;
	disabled?: boolean;
	isCompact?: boolean;
	children?: ReactNode;
}

export const Toggle = forwardRef<HTMLInputElement, Toggle>(function Toggle(
	{
		value,
		defaultValue,
		onChange,
		onChangeEvent,
		name,
		id,
		className,
		disabled,
		isCompact = true,
		children,
		dataAttributes,
	},
	ref
) {
	const [innerValue, setInnerValue] = useState(defaultValue ?? false);
	const uniqueId = useId();
	const [withinFocus, setWithinFocus] = useState(false);
	const finalValue = value ?? innerValue;

	const handleChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			setInnerValue(event.target.checked);
			if (onChange) onChange(event.target.checked);
			if (onChangeEvent) onChangeEvent(event);
		},
		[onChange, onChangeEvent]
	);

	return (
		<label
			className={classNames(
				"relative inline-flex items-center gap-2 cursor-pointer user-select-none",
				className
			)}
			{...dataAttributes}
		>
			<span
				className={classNames(
					"rounded-full relative",
					"transition-all duration-400",
					{ "ring-3 ring-primary-200": withinFocus },
					{ "bg-gray-200 dark:bg-gray-800": !finalValue },
					{ "bg-primary-500": finalValue },
					{ "cursor-pointer": !disabled },
					{ "opacity-50": disabled },
					{ "w-10 h-6": !isCompact },
					{ "w-6 h-4": isCompact }
				)}
			>
				<span
					className={classNames(
						"bg-white dark:bg-gray-900 text-white dark:text-gray-900 rounded-full absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2",
						"transition-all duration-400",
						{ "left-3": !isCompact && !finalValue },
						{ "left-7": !isCompact && finalValue },
						{ "left-2": isCompact && !finalValue },
						{ "left-4": isCompact && finalValue },
						{ "w-5 h-5": !isCompact },
						{ "w-3 h-3": isCompact }
					)}
				></span>
			</span>

			<input
				ref={ref}
				type="checkbox"
				checked={finalValue}
				id={id ?? uniqueId}
				name={name}
				disabled={disabled}
				onChange={handleChange}
				onFocus={() => setWithinFocus(true)}
				onBlur={() => setWithinFocus(false)}
				className="absolute opacity-0 -z-1"
			/>

			{children}
		</label>
	);
});
