import {
	ChangeEvent,
	forwardRef,
	HTMLProps,
	ReactNode,
	useCallback,
	useId,
	useState,
} from "react";
import classNames from "classnames";
import DataAttributes from "../../../types/DataAttributes";
import { Shape } from "../../../types/Shape";
import { CheckIcon, MinusIcon } from "@heroicons/react/24/solid";

interface CheckboxProps
	extends Omit<
			HTMLProps<HTMLInputElement>,
			"value" | "onChange" | "defaultValue" | "className"
		>,
		DataAttributes {
	value?: boolean | "indeterminate";
	defaultValue?: boolean | "indeterminate";
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
	children?: ReactNode;
	error?: boolean;
	errorMsg?: string;
	shape?: Shape;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	function Checkbox(
		{
			value,
			defaultValue,
			onChange,
			onChangeEvent,
			name,
			id,
			className,
			disabled,
			error,
			errorMsg,
			children,
			dataAttributes,
			shape = Shape.DEFAULT,
			...props
		},
		ref
	) {
		const [innerValue, setInnerValue] = useState<boolean | "indeterminate">(
			defaultValue ?? false
		);
		const uniqueId = useId();
		const [withinFocus, setWithinFocus] = useState(false);
		const finalValue = value ?? innerValue;
		const checkboxId = id ?? uniqueId;

		const handleChange = useCallback(
			(event: ChangeEvent<HTMLInputElement>) => {
				setInnerValue(event.target.checked);
				if (!disabled) {
					if (onChange) onChange(event.target.checked);
					if (onChangeEvent) onChangeEvent(event);
				}
			},
			[onChange, onChangeEvent, disabled]
		);

		const classes = classNames("flex items-center gap-2", className, {
			// checked: finalValue,
			"opacity-50": disabled,
			"cursor-pointer": !disabled,
		});

		const checkMarkClasses = classNames(
			"border border-gray-300 w-4 h-4 flex items-center justify-center",
			{
				indeterminate: finalValue === "indeterminate",
				"bg-white dark:bg-gray-900": !finalValue,
				"bg-primary-500": finalValue,
				"cursor-pointer": !disabled,
				"ring-2 ring-primary-200": withinFocus,
				"rounded-sm": shape === Shape.ROUNDED || shape === Shape.DEFAULT,
				"rounded-none": shape === Shape.SQUARE,
			}
		);

		return (
			<div
				{...dataAttributes}
				onFocus={() => setWithinFocus(true)}
				onBlur={() => setWithinFocus(false)}
			>
				<div className={classes}>
					<div className={checkMarkClasses}>
						{finalValue === true && (
							<CheckIcon className="w-3 h-3 text-white" />
						)}
						{finalValue === "indeterminate" && (
							<MinusIcon className="w-3 h-3 text-white" />
						)}
						<input
							role="checkbox"
							style={{ zIndex: 1 }}
							className="-z-1 absolute opacity-0"
							id={checkboxId}
							name={name}
							ref={ref}
							type="checkbox"
							onChange={handleChange}
							checked={finalValue == "indeterminate" ? false : finalValue}
							aria-checked={
								finalValue == "indeterminate" ? "mixed" : finalValue
							}
							disabled={disabled}
							data-testid={checkboxId}
							{...props}
						/>
					</div>
					{children && (
						<label
							className={classNames({
								"cursor-pointer": !disabled,
							})}
							htmlFor={checkboxId}
						>
							{children}
						</label>
					)}
				</div>
				{errorMsg && error && (
					<p className="text-red-500 text-sm">{errorMsg}</p>
				)}
			</div>
		);
	}
);
