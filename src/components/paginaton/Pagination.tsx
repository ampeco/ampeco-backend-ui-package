import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { useMemo } from "react";
import { useDefaultValueState } from "../../hooks/internal/useDefaultValueState";
import DataAttributes from "../../types/DataAttributes";
import { Shape } from "../../types/Shape";

// Create an array from [start, ..., end]
const getNumbersArray = (start: number, end: number): number[] => {
	const numbers: number[] = [];
	for (let i = start; i <= end; i++) {
		numbers.push(i);
	}
	return numbers;
};

interface PaginationProps extends DataAttributes {
	/**
	 * Current page number (1 indexed)
	 */
	page?: number;
	totalItems: number;
	pageSize: number;
	onChange?: (value: number) => void;
	visiblePages?: number;
	shape?: Shape;
}

export const Pagination = ({
	page: pageProp,
	totalItems,
	pageSize = 20,
	visiblePages = 4,
	onChange,
	shape = Shape.DEFAULT,
	dataAttributes,
}: PaginationProps) => {
	const [currentPage, setCurrentPage] = useDefaultValueState(
		1,
		pageProp,
		onChange
	);

	const totalPages = Math.ceil(totalItems / pageSize);

	const handleSetPage = (page: number) => {
		if (page < 1 || page > totalPages) {
			return;
		}
		setCurrentPage(page);
	};

	const pages = useMemo(() => {
		// Generate number from -visiblePages ... +visiblePages
		// This is done so when these numbers are offset by the current page, the current page is in the center of the array
		// Ex: pages = [-3,-2,-1,0,1,2,3]
		// If the current page is 4, after the numbers are offset by the current page they would look like [1,2,3,4,5,6,7]
		// And the current page is in the center
		let pages = getNumbersArray(-visiblePages, visiblePages) as any[];

		// The offset is equal to the current page
		const offset = currentPage;

		// The minimum offset is equal to the visiblePages count + 1
		// This is done to avoid negative numbers
		const offsetMin = visiblePages + 1;

		// The maximum offset is equal to the totalPages - visiblePages
		// This is done to avoid displaying pages higher than the allowed range
		const offsetMax = totalPages - visiblePages;

		const finalOffset = Math.max(offsetMin, Math.min(offset, offsetMax));
		pages = pages.map((page) => page + finalOffset);

		// Filter any pages bigger than the total number of pages
		// This usually happens when the total number of pages is smaller than 2*visiblePages
		pages = pages.filter((page) => page <= totalPages);

		// Set the first page to be equal to one and add overflow indicators
		const firstPage = pages[0];
		if (firstPage > 1) {
			pages[0] = 1;
			pages[1] = "..";
		}

		// Set the last page in the generated number to be equal to the final page and add overflow indicator
		const lastPage = pages[pages.length - 1];
		if (lastPage < totalPages) {
			pages[pages.length - 1] = totalPages;
			pages[pages.length - 2] = "..";
		}

		return pages;
	}, [currentPage, totalPages, visiblePages]);

	if (totalPages < 2) {
		return null;
	}

	return (
		<ul
			className="flex items-center gap-2"
			aria-label="pagination"
			{...dataAttributes}
		>
			<li
				aria-label="Previous page"
				className={classNames(
					"flex items-center justify-center w-8 h-8 cursor-pointer",
					shape === Shape.DEFAULT && "rounded-md",
					shape === Shape.ROUNDED && "rounded-full",
					shape === Shape.SQUARE && "rounded-none",
					currentPage == 1 && "hidden"
				)}
				onClick={() => handleSetPage(currentPage - 1)}
			>
				<ChevronLeftIcon className="w-4 h-4" />
			</li>
			{pages.map((page, index) => (
				<li
					aria-label={`Go to page ${page}`}
					aria-current={page === currentPage}
					key={index}
					className={classNames(
						"flex items-center justify-center w-8 h-8 cursor-pointer",
						shape === Shape.DEFAULT && "rounded-md",
						shape === Shape.ROUNDED && "rounded-full",
						shape === Shape.SQUARE && "rounded-none",
						page === currentPage && "bg-primary-500 text-white"
					)}
					onClick={() => typeof page == "number" && handleSetPage(page)}
				>
					{page}
				</li>
			))}
			<li
				aria-label="Next page"
				className={classNames(
					"flex items-center justify-center w-8 h-8 cursor-pointer",
					shape === Shape.DEFAULT && "rounded-md",
					shape === Shape.ROUNDED && "rounded-full",
					shape === Shape.SQUARE && "rounded-none",
					currentPage == totalPages && "hidden"
				)}
				onClick={() => handleSetPage(currentPage + 1)}
			>
				<ChevronRightIcon className="w-4 h-4" />
			</li>
		</ul>
	);
};
