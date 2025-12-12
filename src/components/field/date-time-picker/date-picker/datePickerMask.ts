import {IMask} from 'react-imask';

const getValueFromPattern = (pattern: string, value: string, search: string) => {
	const index = pattern.indexOf(search);
	if (index == -1) return null;
	
	const result = value.slice(index, index + search.length);
	
	if (result.length < search.length) return null;
	return result;
};

const getDateFromString = (value: string, pattern: string) => {
	const dateStr = getValueFromPattern(pattern, value, 'DD');
	const monthStr = getValueFromPattern(pattern, value, 'MM');
	const yearStr = getValueFromPattern(pattern, value, 'YYYY');
	const hourStr = getValueFromPattern(pattern, value, 'HH');
	const minuteStr = getValueFromPattern(pattern, value, 'mm');

	if (!dateStr || !monthStr || !yearStr)
		return null;

	const date = parseInt(dateStr);
	const month = parseInt(monthStr) - 1;
	const year = parseInt(yearStr);
	const hours = parseInt(hourStr || '0');
	const minutes = parseInt(minuteStr || '0');

	const validate = new Date(year, month, date, hours, minutes);

	if(typeof validate === 'string')
		return null;

	if(
		validate.getDate() != date ||
		validate.getMonth() != month ||
		validate.getFullYear() != year ||
		validate.getHours() != hours ||
		validate.getMinutes() != minutes
	)
		return null;

	return validate;
};

export const getStringFromDate = (date: string | number | Date | null, pattern: string): string => {
	if (!date) return '';
	const dateObj = new Date(date);
	const days = dateObj.getDate().toString().padStart(2, '0');
	const months = (dateObj.getMonth() + 1).toString().padStart(2, '0');
	const year = dateObj.getFullYear().toString();
	const hours = dateObj.getHours().toString().padStart(2,'0');
	const minutes = dateObj.getMinutes().toString().padStart(2, '0');

	return pattern
		.replace('DD', days)
		.replace('MM', months)
		.replace('YYYY', year)
		.replace('HH', hours)
		.replace('mm', minutes)
};

export const createDateMask = (pattern: string, withTime?: boolean) => {
	const maskOption = withTime ? 'DD.MM.YYYY. HH:mm' : 'DD.MM.YYYY';
	const maskConfig = {
		mask: maskOption,
		pattern,
		format: (date: Date | null) => getStringFromDate(date, pattern),
		parse: (str: string) => getDateFromString(str, pattern),
		blocks: withTime ? {
			DD: {
				mask: IMask.MaskedRange,
				from: 1,
				to: 31,
				autofix: true
			},
			MM: {
				mask: IMask.MaskedRange,
				from: 1,
				to: 12,
				autofix: true
			},
			YYYY: {
				mask: IMask.MaskedRange,
				from: 1900,
				to: 9999,
				autofix: true
			},
			HH: {
				mask: new IMask.MaskedRange({
					from: 0,
					to: 23,
					autofix: 'pad'
				})
			},
			mm: new IMask.MaskedRange({
				from: 0,
				to: 59,
				autofix: 'pad'
			})
		} : {
			DD: {
				mask: IMask.MaskedRange,
				from: 1,
				to: 31,
				autofix: true
			},
			MM: {
				mask: IMask.MaskedRange,
				from: 1,
				to: 12,
				autofix: true
			},
			YYYY: {
				mask: IMask.MaskedRange,
				from: 1900,
				to: 9999,
				autofix: true
			},
		},
		overwrite: true
	}
	// @ts-ignore
	return IMask.createMask(maskConfig) 
};
