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
	onChangeEvent?: (e: ChangeEvent<HTMLInputElement>) => void;
	name?: string;
	id?: string;
	className?: classNames.Value;
	disabled?: boolean;
	required?: boolean;
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
			onChangeEvent,
			name,
			id,
			className,
			disabled,
			required,
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
		const handleChange = useCallback(
			(event: ChangeEvent<HTMLInputElement>) => {
				setInnerValue(event.target.checked);
				if (!disabled && onChangeEvent) {
					onChangeEvent(event);
				}
			},
			[onChangeEvent, disabled]
		);

		const classes = classNames("flex items-center gap-2", className, {
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
				<label className={classes}>
					<div className={checkMarkClasses}>
						{finalValue === true && (
							<CheckIcon className="w-3 h-3 text-white" />
						)}
						{finalValue === "indeterminate" && (
							<MinusIcon className="w-3 h-3 text-white" />
						)}
						<input
							role="checkbox"
							className="-z-1 absolute opacity-0"
							id={uniqueId}
							name={name}
							ref={ref}
							type="checkbox"
							checked={finalValue == "indeterminate" ? false : finalValue}
							aria-checked={
								finalValue == "indeterminate" ? "mixed" : finalValue
							}
							disabled={disabled}
							required={required}
							data-testid={uniqueId}
							{...props}
							onChange={handleChange}
						/>
					</div>
					{children}
				</label>
				{errorMsg && error && (
					<p className="text-red-500 text-sm">{errorMsg}</p>
				)}
			</div>
		);
	}
);
