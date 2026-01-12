import { FieldBase } from "../field-base/FieldBase";
import { ChangeEvent, forwardRef, useId, useState } from "react";
import classNames from "classnames";
import { Label } from "../label/Label";
import { ErrorMessage } from "../error-message/ErrorMessage";
import DataAttributes from "../../../types/DataAttributes";
import { Size } from "../../../types/Size";
import { Shape } from "../../../types/Shape";

interface TextareaProps extends DataAttributes {
	id?: string;
	value?: string;
	/**
	 * @deprecated Use `onChangeEvent` to receive the full `ChangeEvent<HTMLTextAreaElement>`.
	 * The legacy `onChange` only returns the string value for backward compatibility
	 * and will be removed in a future major release. Switching to `onChangeEvent`
	 * enables unified handlers that can process multiple inputs.
	 */
	onChange?: (value: string) => void;
	onChangeEvent?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	onBlur?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	disabled?: boolean;
	readonly?: boolean;
	required?: boolean;
	error?: boolean;
	placeholder?: string;
	className?: classNames.Argument;
	errorMsg?: string;
	label?: string;
	rows?: number;
	cols?: number;
	size?: Size;
	shape?: Shape;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	function Textarea(
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
			placeholder,
			className,
			errorMsg,
			label,
			rows = 4,
			cols,
			dataAttributes,
			size = Size.MEDIUM,
			shape = Shape.DEFAULT,
		},
		ref
	) {
		const classes = classNames("flex flex-col gap-2", className);
		const uniqueId = useId();
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
					className="px-1! py-1!"
					activated={withinFocus}
				>
					<textarea
						id={uniqueId}
						ref={ref}
						className="border-none bg-transparent! outline-none w-full resize-none focus:ring-0 focus:ring-offset-0"
						value={value}
						rows={rows}
						cols={cols}
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
						required={required}
						onFocus={() => setWithinFocus(true)}
						onBlur={(e) => {
							setWithinFocus(false);
							onBlur?.(e as ChangeEvent<HTMLTextAreaElement>);
						}}
					/>
				</FieldBase>
				{errorMsg && error && <ErrorMessage>{errorMsg}</ErrorMessage>}
			</div>
		);
	}
);
