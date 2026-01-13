import classNames from "classnames";
import {
	MouseEvent,
	useCallback,
	useEffect,
	useId,
	useMemo,
	useState,
} from "react";
import { useIMask } from "react-imask";
import { useDefaultValueState } from "../../../../hooks/internal/useDefaultValueState";
// SimpleDate is only used internally for Calendar component compatibility
import { SimpleDate } from "../../../../types/internal/DateTime";
import FieldBaseProps from "../../../../types/internal/FieldBaseProps";
import { Dropdown } from "../../dropdown/Dropdown";
import { FieldBase } from "../../field-base/FieldBase";
import { Calendar } from "../calendar/Calendar";
import { createDateMask, getStringFromDate } from "./datePickerMask";
import { Label } from "../../label/Label";
import { ErrorMessage } from "../../error-message/ErrorMessage";
import DataAttributes from "../../../../types/DataAttributes";
import { Clock } from "../clock/Clock";
import { Shape } from "../../../../types/Shape";
import { Affix } from "../../affix/Affix";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface DatePickerProps
	extends Omit<FieldBaseProps, "readonly">,
		DataAttributes {
	/**
	 * Datepicker value as Date object
	 */
	value?: Date | null;
	id?: string;
	/**
	 * Fires when a valid date is entered or the field is cleared
	 */
	onChange?: (value: Date | null) => void;
	/**
	 * Date pattern
	 *
	 * Default is: `DD.MM.YYYY`, with timepicker: `DD.MM.YYYY. HH:mm`
	 *
	 * Supported blocks:
	 * 	- DD: 2 digit day - 01-31
	 * 	- MM: 2 digit month - 01-12
	 * 	- YYYY: 4 digit year - 1900-9999
	 *  - HH: 2 digit hours 0-23
	 *  - mm: 2 digit minutes 0-59
	 *
	 * 	Separator can be any character(s) expect 0, a, *, backtick, () or []
	 */
	pattern?: string;
	placeholder?: string;
	className?: classNames.Value;
	clearable?: boolean;
	errorMsg?: string;
	label?: string;
	required?: boolean;
	maxDate?: Date | null;
	minDate?: Date | null;
	showTimePicker?: boolean;
}

export const DatePicker = ({
	value: valueProp,
	id,
	onChange,
	pattern = "DD.MM.YYYY",
	disabled,
	error,
	placeholder,
	className,
	clearable,
	errorMsg,
	label,
	required,
	maxDate,
	minDate,
	dataAttributes,
	showTimePicker,
	shape = Shape.DEFAULT,
	size,
}: DatePickerProps) => {
	const [rawValue, setValue] = useDefaultValueState<Date | null>(
		null,
		valueProp,
		onChange
	);
	// Internal time state (only used for Clock component)
	const [clockValue, setClockValue] = useState<{
		hours: number;
		minutes: number;
	} | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	const defaultPattern = showTimePicker ? "DD.MM.YYYY. HH:mm" : pattern;

	// Convert Date to SimpleDate for Calendar component
	const calendarDate: SimpleDate | null = useMemo(() => {
		if (!rawValue) {
			return null;
		}
		return {
			date: rawValue.getDate(),
			month: rawValue.getMonth(),
			year: rawValue.getFullYear(),
			hours: clockValue?.hours,
			minutes: clockValue?.minutes,
		};
	}, [rawValue, clockValue]);

	// Convert Date to SimpleDate for maxDate/minDate
	const calendarMaxDate: SimpleDate | null = useMemo(() => {
		if (!maxDate) return null;
		return {
			date: maxDate.getDate(),
			month: maxDate.getMonth(),
			year: maxDate.getFullYear(),
		};
	}, [maxDate]);

	const calendarMinDate: SimpleDate | null = useMemo(() => {
		if (!minDate) return null;
		return {
			date: minDate.getDate(),
			month: minDate.getMonth(),
			year: minDate.getFullYear(),
		};
	}, [minDate]);

	const maskOptions = useMemo(() => {
		return {
			mask: createDateMask(defaultPattern, showTimePicker),
		};
	}, [defaultPattern, showTimePicker]);

	const defaultValue = useMemo(() => {
		if (!rawValue) {
			return "";
		}
		return getStringFromDate(rawValue, defaultPattern);
	}, [defaultPattern, rawValue]);

	const {
		ref,
		typedValue,
		setTypedValue,
		value: maskedValue,
	} = useIMask(maskOptions, {
		onComplete: (_, maskRef) => {
			const date = maskRef.typedValue;
			if (!date) {
				return;
			}
			// Always set as Date object
			setValue(date);
		},
		onAccept: (value) => {
			if (value.length === 0) {
				setValue(null);
			}
		},
	});

	useEffect(() => {
		// Update typedValue and clockValue when value changes
		if (rawValue) {
			const hours = rawValue.getHours();
			const minutes = rawValue.getMinutes();
			// Only update clockValue if it actually changed to prevent loops
			setClockValue((prev) => {
				if (prev?.hours === hours && prev?.minutes === minutes) {
					return prev;
				}
				return { hours, minutes };
			});
			setTypedValue(rawValue);
		} else {
			setTypedValue(null);
			setClockValue({ hours: 0, minutes: 0 });
		}
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rawValue]);

	const isInRange = useMemo(() => {
		if (!typedValue) {
			return true;
		}
		const dateTime = typedValue.getTime();
		if (maxDate) {
			if (dateTime > maxDate.getTime()) {
				return false;
			}
		}

		if (minDate) {
			if (dateTime < minDate.getTime()) {
				return false;
			}
		}

		return true;
	}, [maxDate, minDate, typedValue]);

	const handleInputBlur = useCallback(() => {
		// If the input has incorrect value, onBlur set value to the current value
		if (!typedValue && rawValue) {
			setTypedValue(rawValue);
		}
	}, [setTypedValue, rawValue, typedValue]);

	const handleRequestOpenChange = useCallback((isOpen: boolean) => {
		setIsOpen(isOpen);
	}, []);

	const handleDateChange = useCallback(
		(date: SimpleDate) => {
			setIsOpen(false);
			// Convert SimpleDate from Calendar to Date object
			const dateObj = new Date(
				date.year,
				date.month,
				date.date,
				clockValue?.hours || 0,
				clockValue?.minutes || 0
			);
			setValue(dateObj);
			setTypedValue(dateObj);
		},
		[setTypedValue, clockValue, setValue]
	);

	const handleClickClear = useCallback(
		(event: MouseEvent) => {
			setValue(null);
			event.stopPropagation();
		},
		[setValue]
	);

	const handleClockChange = useCallback(
		(clockValue: { hours: number; minutes: number }) => {
			setClockValue(clockValue);
			// Update the date with new time immediately
			if (rawValue) {
				const newDate = new Date(
					rawValue.getFullYear(),
					rawValue.getMonth(),
					rawValue.getDate(),
					showTimePicker ? clockValue.hours : 0,
					showTimePicker ? clockValue.minutes : 0
				);
				setValue(newDate);
			}
		},
		[setClockValue, rawValue, showTimePicker, setValue]
	);

	const finalError =
		error || !isInRange || (!typedValue && maskedValue.length > 0);
	const finalErrorMessage =
		errorMsg ?? (!isInRange ? "Date is out of range" : undefined);

	const classes = classNames(
		"form-field datepicker flex flex-col gap-2",
		className,
		{
			open: isOpen,
		}
	);

	const dropdownInnerClasses = classNames(
		"bg-white dark:bg-gray-800 shadow isolate px-6 py-4",
		"flex gap-4",
		{
			"rounded-[24px]": shape === Shape.ROUNDED,
			"rounded-lg": shape === Shape.DEFAULT,
			"rounded-none": shape === Shape.SQUARE,
		}
	);

	const uniqueId = useId();
	return (
		<div className={classes} {...dataAttributes}>
			{label && (
				<Label id={uniqueId} required={required}>
					{label}
				</Label>
			)}
			<Dropdown
				isOpen={isOpen && !disabled}
				onRequestOpenChange={handleRequestOpenChange}
				handle={
					<FieldBase
						className="datepicker-field"
						disabled={disabled}
						error={finalError}
						activated={isOpen}
						label={label}
						shape={shape}
						size={size}
					>
						<input
							id={uniqueId}
							ref={ref as React.Ref<HTMLInputElement>}
							placeholder={
								placeholder ||
								(showTimePicker ? "Enter date and time" : "Enter date")
							}
							disabled={disabled}
							required={required}
							onBlur={handleInputBlur}
							defaultValue={defaultValue}
							maxLength={17}
							className="border-none bg-transparent outline-none w-full"
						/>

						{clearable && calendarDate && (
							<Affix className="datepicker-clear" onClick={handleClickClear}>
								<XMarkIcon className="w-4 h-4" />
							</Affix>
						)}
					</FieldBase>
				}
			>
				<div className="datepicker-dropdown absolute z-50">
					<div className={dropdownInnerClasses}>
						<Calendar
							date={calendarDate}
							onChange={handleDateChange}
							maxDate={calendarMaxDate}
							minDate={calendarMinDate}
						/>
						{showTimePicker && (
							<Clock value={clockValue} onChange={handleClockChange} />
						)}
					</div>
				</div>
			</Dropdown>
			{finalErrorMessage && finalError && (
				<ErrorMessage>{finalErrorMessage}</ErrorMessage>
			)}
		</div>
	);
};
