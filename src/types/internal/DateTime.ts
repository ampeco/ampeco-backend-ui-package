export interface SimpleDate {
	date: number;
	// 0 indexed (0-11)
	month: number;
	year: number;
	hours?: number;
	minutes?: number;
}

export interface CalendarDate extends SimpleDate{
	dayOfWeek: number;
	monthDiff: number;
	isToday: boolean;
}

export interface SimpleTime {
	hours: number;
	minutes: number;
}
