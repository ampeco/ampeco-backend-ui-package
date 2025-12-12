import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useCallback, useMemo } from "react";
import { SimpleTime } from "../../../../types/internal/DateTime";
import DataAttributes from "../../../../types/DataAttributes";

interface ClockProps extends DataAttributes {
	value?: SimpleTime | null;
	onChange?: (time: SimpleTime) => void;
	minuteStep?: number;
}

export const Clock = ({
	value: valueProp,
	onChange,
	minuteStep = 5,
	dataAttributes,
}: ClockProps) => {
	const value = useMemo(() => {
		if (!valueProp || valueProp.hours == null || valueProp.minutes == null) {
			return { hours: 0, minutes: 0 };
		}
		return valueProp;
	}, [valueProp]);

	const handleChange = useCallback(
		(hours: number, minutes: number) => {
			if (minutes > 59) {
				minutes = minutes - 60;
				hours = hours + 1;
			}
			if (minutes < 0) {
				minutes = minutes + 60;
				hours = hours - 1;
			}
			if (hours > 23) {
				hours = hours - 24;
			}
			if (hours < 0) {
				hours = hours + 24;
			}
			onChange && onChange({ hours, minutes });
		},
		[onChange]
	);

	return (
		<div
			className="flex items-center justify-items-center gap-4 p-2"
			{...dataAttributes}
		>
			<div className="flex flex-col items-center justify-items-center gap-4">
				<ChevronUpIcon
					onClick={() => handleChange(value.hours + 1, value.minutes)}
					className="w-4 h-4 cursor-pointer"
				/>
				<span>{value.hours.toString().padStart(2, "0")}</span>
				<ChevronDownIcon
					onClick={() => handleChange(value.hours - 1, value.minutes)}
					className="w-4 h-4 cursor-pointer"
				/>
			</div>
			<span className="">:</span>
			<div className="flex flex-col items-center justify-items-center gap-4">
				<ChevronUpIcon
					onClick={() => handleChange(value.hours, value.minutes + minuteStep)}
					className="w-4 h-4 cursor-pointer"
				/>
				<span>{value.minutes.toString().padStart(2, "0")}</span>
				<ChevronDownIcon
					onClick={() => handleChange(value.hours, value.minutes - minuteStep)}
					className="w-4 h-4 cursor-pointer"
				/>
			</div>
		</div>
	);
};
