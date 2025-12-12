import {
	forwardRef,
	HTMLProps,
	ReactNode,
	useCallback,
	useContext,
	useId,
	ChangeEvent,
	useState,
} from "react";
import classNames from "classnames";
import { RadioContext } from "./RadioGroup";
import DataAttributes from "../../../types/DataAttributes";

interface RadioProps
	extends Omit<
			HTMLProps<HTMLInputElement>,
			"value" | "onChange" | "checked" | "name" | "id"
		>,
		DataAttributes {
	value: string;
	checked?: boolean;
	/**
	 * @deprecated Use `onChangeEvent` to receive the full change event.
	 * The legacy `onChange` only returns a boolean for backward compatibility
	 * and will be removed in a future major release. Prefer `onChangeEvent` for unified handlers.
	 */
	onChange?: (value: boolean) => void;
	onChangeEvent?: (e: ChangeEvent<HTMLInputElement>) => void;
	name?: string;
	id?: string;
	disabled?: boolean;
	children?: ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
	{
		value,
		checked,
		onChange,
		onChangeEvent,
		name,
		id,
		disabled,
		children,
		dataAttributes,
		...props
	},
	ref
) {
	const radioContext = useContext(RadioContext);
	const uniqueId = useId();
	const [withinFocus, setWithinFocus] = useState(false);

	const isChecked = radioContext
		? radioContext.value == value
		: checked ?? false;
	const finalName = radioContext ? radioContext.name : name;

	const handleChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			if (onChange) onChange(true);
			if (onChangeEvent) onChangeEvent(event);
			if (radioContext) {
				radioContext.onChange(value);
				radioContext.onChangeEvent(event);
			}
		},
		[onChange, onChangeEvent, radioContext, value]
	);

	const classes = classNames("flex items-center gap-2", {
		"opacity-50": disabled,
		"cursor-pointer": !disabled,
	});

	const circleClasses = classNames(
		"border border-gray-300 w-4 h-4 flex items-center justify-center rounded-full focus:ring-2 focus:ring-primary-500",
		{
			"ring-2 ring-primary-200": withinFocus,
			"opacity-50": disabled,
			"cursor-pointer": !disabled,
		}
	);

	return (
		<div
			className={classes}
			{...dataAttributes}
			onFocus={() => setWithinFocus(true)}
			onBlur={() => setWithinFocus(false)}
		>
			<div className={circleClasses}>
				{isChecked && (
					<span
						className={classNames("w-2 h-2 bg-primary-500 rounded-full", {
							"opacity-50": disabled,
							"cursor-pointer": !disabled,
						})}
					/>
				)}
				<input
					ref={ref}
					type="radio"
					value={value}
					id={id ?? uniqueId}
					name={finalName}
					checked={isChecked}
					disabled={disabled}
					onChange={handleChange}
					className="-z-1 absolute opacity-0"
					{...props}
				/>
			</div>
			<label
				className={classNames({
					"cursor-pointer": !disabled,
				})}
				htmlFor={id ?? uniqueId}
			>
				{children}
			</label>
		</div>
	);
});
