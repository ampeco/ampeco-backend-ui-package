import { FieldBase } from "../field-base/FieldBase";
import { ChangeEvent, forwardRef, ReactNode, useId, useState } from "react";
import classNames from "classnames";
import { InputTypes } from "../../../types/InputTypes";
import { Affix } from "../affix/Affix";
import { Label } from "../label/Label";
import { ErrorMessage } from "../error-message/ErrorMessage";
import DataAttributes from "../../../types/DataAttributes";
import { Size } from "../../../types/Size";
import { Shape } from "../../../types/Shape";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface InputProps extends DataAttributes {
	id?: string;
	value?: string | number;
	/**
	 * @deprecated Use `onChangeEvent` to receive the full `ChangeEvent<HTMLInputElement>`.
	 * The legacy `onChange` only returns the string value for backward compatibility
	 * and will be removed in a future major release. Switching to `onChangeEvent`
	 * enables unified handlers that can process multiple inputs.
	 */
	onChange?: (value: string) => void;
	onChangeEvent?: (e: ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	readonly?: boolean;
	required?: boolean;
	error?: boolean;
	clearable?: boolean;
	inputType?: InputTypes;
	placeholder?: string;
	suffix?: ReactNode;
	prefix?: ReactNode;
	className?: classNames.Argument;
	errorMsg?: string;
	label?: string;
	autocomplete?: string;
	size?: Size;
	shape?: Shape;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
	{
		id,
		value,
		onChange,
		onChangeEvent,
		onBlur,
		disabled,
		readonly,
		required,
		error,
		clearable,
		inputType,
		placeholder,
		suffix,
		prefix,
		className,
		errorMsg,
		label,
		autocomplete,
		dataAttributes,
		size = Size.MEDIUM,
		shape = Shape.DEFAULT,
	},
	ref
) {
	const uniqueId = useId();
	const classes = classNames("flex flex-col gap-2", className);
	const [withinFocus, setWithinFocus] = useState(false);

	return (
		<div className={classes} {...dataAttributes}>
			{label && (
				<Label id={uniqueId} required={required}>
					{label}
				</Label>
			)}
			<FieldBase
				disabled={disabled}
				readonly={readonly}
				error={error}
				label={label}
				shape={shape}
				size={size}
				className="px-1!"
				activated={withinFocus}
			>
				{prefix}
				<input
					id={uniqueId}
					ref={ref}
					className="border-none bg-transparent! outline-none w-full focus:ring-0 focus:ring-offset-0 h-8"
					value={value}
					type={inputType}
					onChange={
						onChange || onChangeEvent
							? (e) => {
									if (onChange) onChange(e.target.value);
									if (onChangeEvent) onChangeEvent(e);
							  }
							: undefined
					}
					placeholder={placeholder}
					readOnly={readonly}
					disabled={disabled}
					autoComplete={autocomplete}
					onFocus={() => setWithinFocus(true)}
					onBlur={(e) => {
						setWithinFocus(false);
						onBlur?.(e as ChangeEvent<HTMLInputElement>);
					}}
				/>
				{clearable && (
					<Affix
						className={{
							"cursor-pointer": true,
							visible: value !== "",
						}}
						onClick={() =>
							onChangeEvent &&
							onChangeEvent({
								target: { value: "" },
							} as ChangeEvent<HTMLInputElement>)
						}
					>
						<XMarkIcon className="w-4 h-4" data-testid="clear-button" />
					</Affix>
				)}
				{suffix}
			</FieldBase>
			{errorMsg && error && <ErrorMessage>{errorMsg}</ErrorMessage>}
		</div>
	);
});
