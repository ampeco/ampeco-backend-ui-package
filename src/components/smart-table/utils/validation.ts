import { FormFieldConfig, ValidatorConfig, ValidatorsEnum } from '../types';

const validators = {
	[ValidatorsEnum.MIN]: (value: any, param: number) => value >= param,
	[ValidatorsEnum.MAX]: (value: any, param: number) => value <= param,
	[ValidatorsEnum.REQUIRED]: (value: any) => value !== null && value !== undefined && value !== '',
	[ValidatorsEnum.EMAIL]: (value: any) => /\S+@\S+\.\S+/.test(value),
	[ValidatorsEnum.MIN_LENGTH]: (value: any, param: number) => typeof value === 'string' && value.length >= param,
	[ValidatorsEnum.MAX_LENGTH]: (value: any, param: number) => typeof value === 'string' && value.length <= param,
	[ValidatorsEnum.PATTERN]: (value: any, param: RegExp) => param.test(value),
};

const validateField = (value: any, config: ValidatorConfig): string | null => {
	const { validatorType, errorMessage, param } = config;
	const isValid = validators[validatorType](value, param);
	return isValid ? null : errorMessage;
};

export const validateRow = <T>(rowData: T, fieldConfigs: FormFieldConfig<T>[]): { [key: string]: string } => {
	const errors: { [key: string]: string } = {};

	fieldConfigs.forEach(({ key, validators }) => {
		for (const config of validators) {
			const error = validateField(rowData[key], config);
			if (error) {
				errors[key as string] = error;
				break; // Stop at the first failed validation for the field
			}
		}
	});

	return errors;
};