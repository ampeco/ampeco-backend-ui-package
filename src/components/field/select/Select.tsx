import { SelectOption } from "../../../types/SelectOption";
import FieldBaseProps from "../../../types/internal/FieldBaseProps";
import {
	KeyboardEvent,
	MouseEvent,
	useCallback,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from "react";
import { useDefaultValueState } from "../../../hooks/internal/useDefaultValueState";
import { Dropdown } from "../dropdown/Dropdown";
import { FieldBase } from "../field-base/FieldBase";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Affix } from "../affix/Affix";
import { Checkbox } from "../checkbox/Checkbox";
import classNames from "classnames";
import { Label } from "../label/Label";
import { ErrorMessage } from "../error-message/ErrorMessage";
import DataAttributes from "../../../types/DataAttributes";
import { Shape } from "../../../types/Shape";

type SelectValue<T extends string | number, M extends boolean> = M extends true
	? T[] | null
	: T | null;

interface SelectProps<T extends string | number, M extends boolean>
	extends FieldBaseProps,
		DataAttributes {
	value?: SelectValue<T, M>;
	onChange?: (value: SelectValue<T, M>) => void;
	options?: SelectOption<T>[];
	multi?: M;
	searchable?: boolean;
	allowDynamicOptions?: boolean;
	clearable?: boolean;
	placeholder?: string;
	selectedLabel?: string | ((count: number) => string);
	errorMsg?: string;
	label?: string;
	required?: boolean;
	className?: classNames.Argument;
	onNewSelectOptionEntered?: (searchTerm: string) => void; // <-- New prop for custom handling
}

export const Select = <T extends string | number, Multi extends boolean>({
	value: valueProp,
	onChange,
	options,
	multi,
	searchable,
	allowDynamicOptions,
	clearable,
	disabled,
	readonly,
	error,
	errorMsg,
	label,
	required,
	placeholder = "Select option(s)",
	selectedLabel = "Selected option(s)",
	className,
	dataAttributes,
	shape,
	size,
	onNewSelectOptionEntered,
}: SelectProps<T, Multi>) => {
	const [value, setValue] = useDefaultValueState(null, valueProp, onChange);
	const [isOpen, setIsOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [highlightedOptionIndex, setHighlightedOptionIndex] = useState(-1);
	const inputRef = useRef<HTMLInputElement>(null);

	const optionsRef = useRef<HTMLDivElement>(null);
	const searchRef = useRef<HTMLInputElement>(null);

	// Value to display in the input element
	const displayValue = useMemo(() => {
		if (!options || value == null) return "";

		if (multi) {
			const count = Array.isArray(value) ? value.length : 0;
			if (typeof selectedLabel == "string") {
				return `${count} ${selectedLabel}`;
			} else {
				return selectedLabel(count);
			}
		}

		const option = options.find((option) => option.value === value);
		if (!option) return "";

		return option.label;
	}, [options, value, multi, selectedLabel]);

	// Selected option reference for rendering rich content when available
	const selectedOption = useMemo(() => {
		if (!options || value == null || Array.isArray(value)) return undefined;
		return options.find((option) => option.value === value);
	}, [options, value]);

	const selectAllCheckboxValue = useMemo(() => {
		if (Array.isArray(value)) {
			if (
				value.length == options?.filter((option) => !option.disabled).length
			) {
				return true;
			}
			if (value.length == 0) {
				return false;
			}
			return "indeterminate";
		}
		return false;
	}, [options, value]);

	// Filtered options based on the search value if the select is searchable
	const filteredOptions = useMemo(() => {
		if (!options) {
			return [];
		}
		if (searchable) {
			return options.filter((option) => option.label.includes(search));
		} else {
			return options;
		}
	}, [options, search, searchable]);

	const handleSelectOption = useCallback(
		(option: SelectOption<T>) => {
			if (readonly || option.disabled) {
				return;
			}

			if (multi) {
				// If multi select is enabled
				if (Array.isArray(value)) {
					// If value is array add/remove the option
					if (value.includes(option.value)) {
						// If the option is included in the value - remove it
						setValue(
							value.filter(
								(selected) => selected != option.value
							) as SelectValue<T, Multi>
						);
					} else {
						// If the option is not included in the value - add it
						setValue([...value, option.value] as SelectValue<T, Multi>);
					}
				} else {
					// If the value is not an array - create new array with the selected option
					setValue([option.value] as SelectValue<T, Multi>);
				}
			} else {
				// If multi select is not enabled - set the option as value
				inputRef.current?.focus();
				setValue(option.value as SelectValue<T, Multi>);
				setIsOpen(false);
			}
		},
		[multi, readonly, setValue, value]
	);

	const handleRequestOpenChange = useCallback(
		(isOpen: boolean) => {
			// If disabled deny open request
			if (disabled) {
				return;
			}

			setIsOpen(isOpen);
			if (isOpen && options && !multi) {
				// Highlight the selected option if not in multi select mode
				setHighlightedOptionIndex(
					options.findIndex((option) => option.value === value)
				);
			}
			// Clear the search field
			setSearch("");
		},
		[disabled, multi, options, value]
	);

	const handleClickClear = useCallback(
		(event: MouseEvent) => {
			setValue(null);
			event.stopPropagation();
		},
		[setValue]
	);

	const handleChangeSelectAll = useCallback(
		(selectAll: boolean) => {
			if (!options || !multi) {
				return;
			}
			if (selectAll) {
				setValue(
					options
						.filter((option) => !option.disabled)
						.map((option) => option.value) as SelectValue<T, Multi>
				);
			} else {
				setValue([] as any);
			}
		},
		[multi, options, setValue]
	);

	// Clear the highlighted option when searching
	useEffect(() => {
		setHighlightedOptionIndex(-1);
		optionsRef.current?.scroll(0, 0);
	}, [search]);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (isOpen) {
				switch (event.key) {
					case "ArrowDown":
						event.preventDefault();
						if (readonly) {
							break;
						}
						setHighlightedOptionIndex((index) =>
							Math.min((filteredOptions?.length ?? 0) - 1, index + 1)
						);
						break;
					case "ArrowUp":
						event.preventDefault();
						if (readonly) {
							break;
						}
						setHighlightedOptionIndex((index) => Math.max(0, index - 1));
						break;
					case "Enter": {
						event.preventDefault();

						if (event.repeat) {
							break;
						}
						// If a custom handler is provided, call it for adding a new option
						if (onNewSelectOptionEntered && search.trim()) {
							onNewSelectOptionEntered(search); // Pass the search term to the custom handler
						} else {
							// Default behavior for handling selection
							let option =
								filteredOptions[highlightedOptionIndex] ?? filteredOptions[0];

							// TODO chek angular behaviour
							if (
								onNewSelectOptionEntered &&
								allowDynamicOptions &&
								search.trim()
							) {
								// filteredOptions.push()
								option = {
									value: search as T,
									label: search,
								} as SelectOption<T>;
								onNewSelectOptionEntered(search);
							}

							if (!option) break;
							handleSelectOption(option);
						}
						break;
					}
					case "Escape": {
						event.preventDefault();
						if (event.repeat) {
							break;
						}
						inputRef.current?.focus();
						setIsOpen(false);
						break;
					}
				}
			} else {
				switch (event.key) {
					case "ArrowDown":
					case "Enter": {
						event.preventDefault();
						if (event.repeat || disabled) {
							break;
						}
						setIsOpen(true);
						break;
					}
				}
			}
		},
		[
			disabled,
			filteredOptions,
			handleSelectOption,
			highlightedOptionIndex,
			isOpen,
			readonly,
			onNewSelectOptionEntered,
			search,
		]
	);

	const handleClickField = useCallback(() => {
		setIsOpen((open) => !open && !disabled);
		if (!isOpen) {
			inputRef.current?.focus();
		}
	}, [disabled]);

	// Scroll the highlighted option in to view
	useEffect(() => {
		if (highlightedOptionIndex >= 0 && optionsRef.current) {
			optionsRef.current.children[highlightedOptionIndex]?.scrollIntoView({
				block: "nearest",
			});
		}
	}, [isOpen, highlightedOptionIndex, searchable]);

	const classes = classNames(
		"relative w-max flex flex-col gap-2",
		{
			readonly: readonly,
		},
		className
	);

	const dropdownClasses = classNames(
		"absolute top-full right-0 left-0 min-w-[10rem]",
		"scroll-wrap overflow-x-hidden overflow-hidden overflow-y-auto select-none px-2 py-2 bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg max-h-[300px]"
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
				isOpen={isOpen}
				onRequestOpenChange={handleRequestOpenChange}
				onKeyDown={handleKeyDown}
				handle={
					<FieldBase
						className="flex-1 flex items-center gap-2 bg-transparent"
						disabled={disabled}
						readonly={readonly}
						error={error}
						activated={isOpen}
						onClick={handleClickField}
						shape={shape}
						size={size}
					>
						{multi && (
							<Checkbox
								className="-mb-1"
								value={selectAllCheckboxValue}
								tabIndex={-1}
								onChangeEvent={(e) => handleChangeSelectAll(e.target.checked)}
								onMouseDown={(event) => {
									// Prevent checkbox from gaining focus
									event.preventDefault();
									event.stopPropagation();
								}}
								onClick={(event) =>
									// Prevent the onClick event handler on the field base from triggering
									event.stopPropagation()
								}
							/>
						)}
						{selectedOption?.renderOption && !multi ? (
							<span className="flex items-center">
								{selectedOption.renderOption}
							</span>
						) : (
							<input
								id={uniqueId}
								ref={inputRef}
								value={displayValue}
								readOnly
								required={required}
								placeholder={placeholder}
								tabIndex={isOpen ? -1 : 0}
								className="border-none bg-transparent outline-none w-full"
							/>
						)}

						{clearable &&
							(Array.isArray(value) ? value.length > 0 : value != null) && (
								<Affix
									className="select-clear"
									tight
									onClick={handleClickClear}
								>
									<XMarkIcon className="w-4 h-4 cursor-pointer" />
								</Affix>
							)}
						<Affix className="select-chevron">
							<ChevronDownIcon className="w-4 h-4 cursor-pointer" />
						</Affix>
					</FieldBase>
				}
			>
				<div className={dropdownClasses}>
					{searchable && (
						<input
							className="border border-gray-300 bg-white dark:bg-gray-900 outline-none  w-full px-2 py-2 mb-2 rounded-lg focus:ring-3 focus:ring-primary-200"
							autoFocus
							ref={searchRef}
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					)}
					<div className="flex flex-col gap-1" ref={optionsRef}>
						{filteredOptions.map((option, index) => (
							<div
								key={option.value}
								role="menuitem"
								className={classNames(
									"flex items-center gap-2",
									highlightedOptionIndex == index &&
										"bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white ",
									!option.disabled && "cursor-pointer",
									option.disabled &&
										"bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
								)}
								onClick={() => handleSelectOption(option)}
							>
								{multi && (
									<Checkbox
										className="-mb-1"
										value={Array.isArray(value) && value.includes(option.value)}
										tabIndex={-1}
									/>
								)}
								{option.renderOption ?? option.label}
							</div>
						))}
					</div>
				</div>
			</Dropdown>
			{errorMsg && error && <ErrorMessage>{errorMsg}</ErrorMessage>}
		</div>
	);
};
