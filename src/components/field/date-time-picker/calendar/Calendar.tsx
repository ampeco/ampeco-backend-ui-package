import {
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronUpIcon,
} from "@heroicons/react/24/solid";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FieldBase } from "../../field-base/FieldBase";
import classNames from "classnames";
import { CalendarDate, SimpleDate } from "../../../../types/internal/DateTime";
import { DAYS_OF_WEAK, MONTHS } from "../../../../constants/Dates";
import DataAttributes from "../../../../types/DataAttributes";
import { Size } from "../../../../types/Size";

// Get the difference in months between two dates, factoring in difference in years
const differenceInMonths = (date1: Date, date2: Date) => {
	return (
		date1.getMonth() -
		date2.getMonth() +
		(date1.getFullYear() - date2.getFullYear()) * 12
	);
};

interface CalendarProps extends DataAttributes {
	date: SimpleDate | null;
	onChange: (date: SimpleDate) => void;
	maxDate?: SimpleDate | null;
	minDate?: SimpleDate | null;
}

export const Calendar = ({
	date,
	onChange,
	minDate,
	maxDate,
	dataAttributes,
}: CalendarProps) => {
	const [month, setMonth] = useState(() => new Date().getMonth());
	const [year, setYear] = useState(() => new Date().getFullYear());

	useEffect(() => {
		if (date && date.month != null && date.year != null) {
			setMonth(date.month);
			setYear(date.year);
		}
	}, [date]);

	const getDay = useCallback((date: Date) => {
		const offset = -1; // Sunday start of week -> Monday start of week

		let day = date.getDay() + offset;
		if (day < 0) {
			day = day + 7;
		}

		return day;
	}, []);

	const dates = useMemo(() => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const initialDate = new Date(year, month, 1);

		const startDate = new Date(initialDate);
		startDate.setDate(-getDay(startDate) + 1);

		const lastDate = new Date(year, month + 1, 0);
		lastDate.setDate(lastDate.getDate() + (6 - getDay(lastDate)));

		const currentDate = new Date(startDate);

		const days: CalendarDate[] = [];

		while (currentDate <= lastDate) {
			const day: CalendarDate = {
				dayOfWeek: getDay(currentDate),
				date: currentDate.getDate(),
				month: currentDate.getMonth(),
				year: currentDate.getFullYear(),
				monthDiff: differenceInMonths(currentDate, initialDate),
				isToday: currentDate.getTime() == today.getTime(),
			};
			days.push(day);
			currentDate.setDate(currentDate.getDate() + 1);

			if (days.length > 100) {
				break;
			}
		}
		return days;
	}, [getDay, month, year]);

	const handleSetYear = useCallback((newYear: number) => {
		if (newYear > 9999) {
			setYear(9999);
		} else if (newYear < 1900) {
			setYear(1900);
		} else {
			setYear(newYear);
		}
	}, []);

	const handleChangeMonth = useCallback(
		(newMonth: number) => {
			if (newMonth > 11) {
				setMonth(newMonth - 12);
				handleSetYear(year + 1);
			} else if (newMonth < 0) {
				setMonth(newMonth + 12);
				handleSetYear(year - 1);
			} else {
				setMonth(newMonth);
			}
		},
		[handleSetYear, year]
	);

	const isMinDateValid = (day: CalendarDate) => {
		return (
			minDate &&
			Date.UTC(minDate.year, minDate.month, minDate.date) >
				Date.UTC(day.year, day.month, day.date)
		);
	};

	const isMaxDateValid = (day: CalendarDate) => {
		return (
			maxDate &&
			Date.UTC(maxDate.year, maxDate.month, maxDate.date) <
				Date.UTC(day.year, day.month, day.date)
		);
	};

	return (
		<div className="flex flex-col gap-4" {...dataAttributes}>
			<div className="flex justify-between items-center gap-2 w-full">
				<div className="flex justify-between items-center w-1/2">
					<ChevronLeftIcon
						onClick={() => handleChangeMonth(month - 1)}
						className="w-4 h-4 cursor-pointer hover:text-primary-500"
					/>
					{MONTHS[month]}
					<ChevronRightIcon
						onClick={() => handleChangeMonth(month + 1)}
						className="w-4 h-4 cursor-pointer hover:text-primary-500"
					/>
				</div>

				<FieldBase
					className="flex justify-between items-center w-1/2"
					size={Size.SMALL}
				>
					{year}
					<div className="flex flex-col h-full justify-self-right">
						<ChevronUpIcon
							onClick={() => handleSetYear(year + 1)}
							className="w-4 h-4 cursor-pointer hover:text-primary-500"
						/>
						<ChevronDownIcon
							onClick={() => handleSetYear(year - 1)}
							className="w-4 h-4 cursor-pointer hover:text-primary-500"
						/>
					</div>
				</FieldBase>
			</div>

			<div className="grid grid-cols-7 grid-rows-1 gap-2 items-center justify-items-center">
				{DAYS_OF_WEAK.map((day) => (
					<span key={day} className="font-bold">
						{day}
					</span>
				))}

				{dates.map((item, index) => {
					const classes = classNames(
						"text-center hover:ring-3 hover:ring-primary-200 cursor-pointer rounded-md",
						{
							"text-gray-200 dark:text-gray-600": item.monthDiff != 0,
							"text-primary-500": item.isToday,
							"bg-primary-500 text-white":
								date &&
								date.year == item.year &&
								date.month == item.month &&
								date.date == item.date,
							"text-gray-400 dark:text-gray-600":
								item && (isMinDateValid(item) || isMaxDateValid(item)),
						}
					);
					return (
						<span
							key={index}
							className={classes}
							onClick={() => onChange(item)}
						>
							<span className="w-8 h-8 flex items-center justify-center">
								{item.date}
							</span>
						</span>
					);
				})}
			</div>
		</div>
	);
};
