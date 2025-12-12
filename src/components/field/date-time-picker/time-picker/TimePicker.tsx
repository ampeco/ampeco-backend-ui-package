import classNames from "classnames";
import { LegacyRef, useCallback, useEffect, useState } from "react";
import FieldBaseProps from "../../../../types/internal/FieldBaseProps";
import { Dropdown } from "../../dropdown/Dropdown";
import { FieldBase } from "../../field-base/FieldBase";
import { Clock } from "../clock/Clock";
import { SimpleTime } from "../../../../types/internal/DateTime";
import { useIMask } from "react-imask";
import IMask from "imask";
import { useDefaultValueState } from "../../../../hooks/internal/useDefaultValueState";
import { ErrorMessage } from "../../error-message/ErrorMessage";
import { Label } from "../../label/Label";
import { ClockIcon } from "@heroicons/react/24/outline";
import DataAttributes from "../../../../types/DataAttributes";
import { Shape } from "../../../../types/Shape";

const timeMask = () =>
	new IMask.MaskedPattern<SimpleTime | null>({
		mask: "HH:MM",
		skipInvalid: true,
		format: (value: SimpleTime | null) => {
			if (!value) return "";
			const hours = value.hours.toString().padStart(2, "0");
			const minutes = value.minutes.toString().padStart(2, "0");
			return `${hours}:${minutes}`;
		},
		parse: (value: string) => {
			const parts = value.split(":");
			const hours = parseInt(parts[0]);
			const minutes = parseInt(parts[1]);
			if (isNaN(hours) || isNaN(minutes)) {
				return null;
			}
			return {
				hours: hours,
				minutes: minutes,
			};
		},
		blocks: {
			HH: {
				mask: new IMask.MaskedRange({
					from: 0,
					to: 23,
					autofix: "pad",
				}),
			},
			MM: new IMask.MaskedRange({
				from: 0,
				to: 59,
				autofix: "pad",
			}),
		},
	});

export interface TimePickerProps
	extends Omit<FieldBaseProps, "readonly">,
		DataAttributes {
	/**
	 * Value of the timepicker in `SimpleTime` format
	 */
	value?: SimpleTime | null;
	id?: string;
	/**
	 * Fires when a valid time is entered or the field is cleared
	 */
	onChange?: (value: SimpleTime | null) => void;
	placeholder?: string;
	className?: classNames.Value;
	errorMsg?: string;
	label?: string;
	minTime?: SimpleTime | null;
	maxTime?: SimpleTime | null;
}

export const TimePicker = ({
	value: valueProp,
	id,
	onChange,
	disabled,
	error,
	placeholder = "Enter time",
	className,
	errorMsg,
	label,
	minTime,
	maxTime,
	dataAttributes,
	shape = Shape.DEFAULT,
	size,
}: TimePickerProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [value, setValue] = useDefaultValueState(null, valueProp, onChange);
	const [timeRangeErrorMsg, setTimeRangeErrorMsg] = useState<string | null>(
		null
	);

	const handleRequestOpenChange = useCallback((isOpen: boolean) => {
		setIsOpen(isOpen);
	}, []);

	const {
		ref,
		setTypedValue,
		typedValue,
		value: maskedValue,
		setUnmaskedValue,
	} = useIMask({
		// @ts-ignore
		mask: timeMask(),
	});

	useEffect(() => {
		// TODO: this will disable typing on the input due to infinite rendering issue
		return;
		if (typedValue) {
			// @ts-ignore
			setValue(typedValue);
		} else if (maskedValue.length == 0) {
			setValue(null);
		}
	}, [maskedValue, setValue, typedValue]);

	// Update the input value from the time picker value
	useEffect(() => {
		let isTimeInRange = true;
		// If the value is not null, set the input value
		if (value) {
			// @ts-ignore
			setTypedValue(value);
			// validate time range
			if (maxTime) {
				isTimeInRange = maxTime.hours >= value.hours;
				// compare minutes only when in the same hour
				if (maxTime.hours === value.hours) {
					isTimeInRange = maxTime.minutes >= value.minutes;
				}
			}
			if (minTime) {
				// validate min time only if max time is validated
				if (isTimeInRange) {
					isTimeInRange = minTime.hours <= value.hours;
					if (minTime.hours === value.hours) {
						isTimeInRange = minTime.minutes <= value.minutes;
					}
				}
			}
		} else {
			// If the value is null, clear the input
			setUnmaskedValue("");
		}

		if (!isTimeInRange) {
			setTimeRangeErrorMsg("Time not within valid range");
		} else {
			setTimeRangeErrorMsg(null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value, minTime, maxTime]);

	const handleInputBlur = useCallback(() => {
		// If the input has incorrect value, onBlur set value to the currentTime
		if (!typedValue && value) {
			// @ts-ignore
			setTypedValue(value);
		}
	}, [setTypedValue, value, typedValue]);

	const handleClockVisibility = useCallback(() => {
		setIsOpen(!isOpen);
	}, [isOpen]);

	const classes = classNames(className, {
		open: isOpen,
	});

	const dropdownInnerClasses = classNames(
		"bg-white dark:bg-gray-800 shadow isolate px-6 py-4",
		{
			"rounded-[24px]": shape === Shape.ROUNDED,
			"rounded-lg": shape === Shape.DEFAULT,
			"rounded-none": shape === Shape.SQUARE,
		}
	);

	const finalError = !!timeRangeErrorMsg || error;
	const finalErrorMessage = timeRangeErrorMsg ?? errorMsg;

	return (
		<div className={classes} {...dataAttributes}>
			{label && <Label id={id}>{label}</Label>}
			<Dropdown
				isOpen={isOpen && !disabled}
				onRequestOpenChange={handleRequestOpenChange}
				handle={
					<FieldBase
						className="timepicker-field"
						disabled={disabled}
						error={finalError}
						activated={isOpen}
						label={label}
						shape={shape}
						size={size}
					>
						<input
							id={id}
							ref={ref as React.Ref<HTMLInputElement>}
							disabled={disabled}
							placeholder={placeholder}
							onBlur={handleInputBlur}
							className="border-none bg-transparent outline-none w-full"
						/>
						<div
							className="timepicker-field-icon"
							onClick={handleClockVisibility}
						>
							<ClockIcon className="w-4 h-4" />
						</div>
					</FieldBase>
				}
			>
				<div className="timepicker-dropdown absolute">
					<div className={dropdownInnerClasses}>
						<Clock value={value} onChange={setValue} />
					</div>
				</div>
			</Dropdown>
			{finalErrorMessage && finalError && (
				<ErrorMessage>{finalErrorMessage}</ErrorMessage>
			)}
		</div>
	);
};
