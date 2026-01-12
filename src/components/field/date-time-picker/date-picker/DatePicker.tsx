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
import { SimpleDate, SimpleTime } from "../../../../types/internal/DateTime";
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

interface DatePickerProps<V extends SimpleDate | Date>
	extends Omit<FieldBaseProps, "readonly">,
		DataAttributes {
	/**
	 * Datepicker value in `Date` or `SimpleDate` format
	 *
	 * ### NOTE: SimpleDate format uses a 0 indexed month value
	 */
	value?: V | null;
	id?: string;
	/**
	 * Fires when a valid date is entered or the field is cleared
	 *
	 * ### NOTE: SimpleDate format uses a 0 indexed month value
	 */
	onChange?: (value: V | null) => void;
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
	maxDate?: SimpleDate | null;
	minDate?: SimpleDate | null;
	showTimePicker?: boolean;
}

// TODO Remove support for SimpleDate
export const DatePicker = <V extends SimpleDate | Date>({
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
}: DatePickerProps<V>) => {
	const [rawValue, setValue] = useDefaultValueState(null, valueProp, onChange);
	const [clockValue, setClockValue] = useState<SimpleTime | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	const defaultPattern = showTimePicker ? "DD.MM.YYYY. HH:mm" : pattern;

	const value: SimpleDate | null = useMemo(() => {
		if (!rawValue) {
			return null;
		}

		if (rawValue instanceof Date) {
			return {
				date: rawValue.getDate(),
				month: rawValue.getMonth(),
				year: rawValue.getFullYear(),
				hours: clockValue?.hours,
				minutes: clockValue?.minutes,
			};
		}

		return rawValue as SimpleDate;
	}, [rawValue, clockValue]);

	const maskOptions = useMemo(() => {
		return {
			mask: createDateMask(defaultPattern, showTimePicker),
		};
	}, [defaultPattern, showTimePicker]);

	const defaultValue = useMemo(() => {
		if (!value) {
			return "";
		}
		const date = new Date(
			value.year,
			value.month,
			value.date,
			clockValue?.hours || 0,
			clockValue?.minutes || 0
		);
		return getStringFromDate(date, defaultPattern);
	}, [defaultPattern, value, clockValue]);

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
			if (rawValue instanceof Date) {
				setValue(date as V);
			} else {
				const simpleDate = {
					date: date.getDate(),
					month: date.getMonth(),
					year: date.getFullYear(),
					hours: date.getHours(),
					minutes: date.getMinutes(),
				};
				setValue(simpleDate as any);
			}
		},
		onAccept: (value) => {
			if (value.length === 0) {
				setValue(null);
			}
		},
	});

	useEffect(() => {
		// Update typedValue and clockValue when value changes
		if (value) {
			setClockValue({ hours: value.hours || 0, minutes: value.minutes || 0 });
			const valueDate = new Date(
				value.year,
				value.month,
				value.date,
				value.hours || 0,
				value.minutes || 0
			).getTime();
			const maskDate = typedValue ? new Date(typedValue).getTime() : null;
			if (maskDate !== valueDate) {
				setTypedValue(new Date(valueDate));
			}
		} else {
			setTypedValue(null);
			setClockValue({ hours: 0, minutes: 0 });
		}
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	useEffect(() => {
		// update date and time when clock value changes
		if (clockValue && typedValue) {
			const date = typedValue.getDate();
			const month = typedValue.getMonth();
			const year = typedValue.getFullYear();
			setTypedValue(
				new Date(
					year,
					month,
					date,
					showTimePicker ? clockValue.hours : 0,
					showTimePicker ? clockValue.minutes : 0
				)
			);
		}
	}, [clockValue, showTimePicker]);

	const isInRange = useMemo(() => {
		if (!typedValue) {
			return true;
		}
		const dateTime = new Date(typedValue).getTime();
		if (maxDate) {
			if (
				dateTime > new Date(maxDate.year, maxDate.month, maxDate.date).getTime()
			) {
				return false;
			}
		}

		if (minDate) {
			if (
				dateTime < new Date(minDate.year, minDate.month, minDate.date).getTime()
			) {
				return false;
			}
		}

		return true;
	}, [maxDate, minDate, typedValue]);

	const handleInputBlur = useCallback(() => {
		// If the input has incorrect value, onBlur set value to the current value
		if (!typedValue && value) {
			setTypedValue(new Date(value.year, value.month, value.date));
		}
	}, [setTypedValue, value, typedValue]);

	const handleRequestOpenChange = useCallback((isOpen: boolean) => {
		setIsOpen(isOpen);
	}, []);

	const handleDateChange = useCallback(
		(date: any) => {
			setIsOpen(false);
			setValue(date);
			setTypedValue(
				new Date(
					date.year,
					date.month,
					date.date,
					clockValue?.hours || 0,
					clockValue?.minutes || 0
				)
			);
		},
		[setTypedValue, clockValue]
	);

	const handleClickClear = useCallback(
		(event: MouseEvent) => {
			setValue(null);
			event.stopPropagation();
		},
		[setValue]
	);

	const handleClockChange = useCallback(
		(clockValue: SimpleTime) => {
			setClockValue(clockValue);
		},
		[setClockValue]
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

						{clearable && value && (
							<Affix className="datepicker-clear" onClick={handleClickClear}>
								<XMarkIcon className="w-4 h-4" />
							</Affix>
						)}
					</FieldBase>
				}
			>
				<div className="datepicker-dropdown absolute">
					<div className={dropdownInnerClasses}>
						<Calendar
							date={value}
							onChange={handleDateChange}
							maxDate={maxDate}
							minDate={minDate}
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
