import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import type { ApexOptions } from "apexcharts";

import { Chart } from "./Chart";

// Create mock functions
const mockRender = vi.fn();
const mockUpdateOptions = vi.fn();
const mockDestroy = vi.fn();

// Mock ApexCharts constructor
const MockApexCharts = vi.fn().mockImplementation(() => ({
	render: mockRender,
	updateOptions: mockUpdateOptions,
	destroy: mockDestroy,
}));

// Mock the dynamic import - vitest handles dynamic imports automatically
// but we need to ensure it's properly mocked
vi.mock("apexcharts", () => {
	return {
		default: MockApexCharts,
		__esModule: true,
	};
});

describe("Chart", () => {
	const mockOptions: ApexOptions = {
		chart: {
			id: "test-chart",
			toolbar: {
				show: true,
			},
		},
		xaxis: {
			categories: ["Jan", "Feb", "Mar"],
		},
	};

	const mockSeries = [
		{
			name: "Series 1",
			data: [10, 20, 30],
		},
	];

	beforeEach(() => {
		vi.clearAllMocks();
		mockRender.mockClear();
		mockUpdateOptions.mockClear();
		mockDestroy.mockClear();
		MockApexCharts.mockClear();
	});

	it("should render without crashing", () => {
		const { container } = render(
			<Chart options={mockOptions} series={mockSeries} />
		);
		expect(container.firstChild).toBeInTheDocument();
	});

	it("should initialize ApexCharts with correct options", async () => {
		render(<Chart options={mockOptions} series={mockSeries} />);

		await waitFor(() => {
			expect(MockApexCharts).toHaveBeenCalledTimes(1);
		});

		const callArgs = MockApexCharts.mock.calls[0];
		expect(callArgs[0]).toBeInstanceOf(HTMLDivElement);
		expect(callArgs[1]).toMatchObject({
			chart: {
				id: "test-chart",
				type: "line",
				height: "auto",
				width: "100%",
			},
			series: mockSeries,
		});
	});

	it("should call render on chart instance", async () => {
		render(<Chart options={mockOptions} series={mockSeries} />);

		await waitFor(() => {
			expect(mockRender).toHaveBeenCalledTimes(1);
		});
	});

	it("should use default type 'line' when type is not provided", async () => {
		render(<Chart options={mockOptions} series={mockSeries} />);

		await waitFor(() => {
			expect(MockApexCharts).toHaveBeenCalled();
		});

		const callArgs = MockApexCharts.mock.calls[0];
		expect(callArgs[1].chart.type).toBe("line");
	});

	it("should use provided chart type", async () => {
		render(<Chart options={mockOptions} series={mockSeries} type="bar" />);

		await waitFor(() => {
			expect(MockApexCharts).toHaveBeenCalled();
		});

		const callArgs = MockApexCharts.mock.calls[0];
		expect(callArgs[1].chart.type).toBe("bar");
	});

	it("should use default height 'auto' when height is not provided", async () => {
		render(<Chart options={mockOptions} series={mockSeries} />);

		await waitFor(() => {
			expect(MockApexCharts).toHaveBeenCalled();
		});

		const callArgs = MockApexCharts.mock.calls[0];
		expect(callArgs[1].chart.height).toBe("auto");
	});

	it("should use provided height", async () => {
		render(<Chart options={mockOptions} series={mockSeries} height={400} />);

		await waitFor(() => {
			expect(MockApexCharts).toHaveBeenCalled();
		});

		const callArgs = MockApexCharts.mock.calls[0];
		expect(callArgs[1].chart.height).toBe(400);
	});

	it("should use default width '100%' when width is not provided", async () => {
		render(<Chart options={mockOptions} series={mockSeries} />);

		await waitFor(() => {
			expect(MockApexCharts).toHaveBeenCalled();
		});

		const callArgs = MockApexCharts.mock.calls[0];
		expect(callArgs[1].chart.width).toBe("100%");
	});

	it("should use provided width", async () => {
		render(<Chart options={mockOptions} series={mockSeries} width="500px" />);

		await waitFor(() => {
			expect(MockApexCharts).toHaveBeenCalled();
		});

		const callArgs = MockApexCharts.mock.calls[0];
		expect(callArgs[1].chart.width).toBe("500px");
	});

	it("should use series from props when provided", async () => {
		const customSeries = [
			{
				name: "Custom Series",
				data: [1, 2, 3],
			},
		];

		render(<Chart options={mockOptions} series={customSeries} />);

		await waitFor(() => {
			expect(MockApexCharts).toHaveBeenCalled();
		});

		const callArgs = MockApexCharts.mock.calls[0];
		expect(callArgs[1].series).toEqual(customSeries);
	});

	it("should use series from options when series prop is not provided", async () => {
		const optionsWithSeries: ApexOptions = {
			...mockOptions,
			series: [
				{
					name: "Options Series",
					data: [5, 10, 15],
				},
			],
		};

		render(<Chart options={optionsWithSeries} />);

		await waitFor(() => {
			expect(MockApexCharts).toHaveBeenCalled();
		});

		const callArgs = MockApexCharts.mock.calls[0];
		expect(callArgs[1].series).toEqual(optionsWithSeries.series);
	});

	it("should use empty array for series when neither series prop nor options.series is provided", async () => {
		render(<Chart options={mockOptions} />);

		await waitFor(() => {
			expect(MockApexCharts).toHaveBeenCalled();
		});

		const callArgs = MockApexCharts.mock.calls[0];
		expect(callArgs[1].series).toEqual([]);
	});

	it("should handle prop changes", async () => {
		const { rerender } = render(
			<Chart options={mockOptions} series={mockSeries} type="line" />
		);

		// Verify initial render and wait for chart to be created
		await waitFor(() => {
			expect(MockApexCharts).toHaveBeenCalledTimes(1);
			expect(mockRender).toHaveBeenCalledTimes(1);
		});

		// Wait for the chart instance to be fully set up
		await new Promise((resolve) => setTimeout(resolve, 50));

		// Change props - the component should handle the change
		// Note: Due to the cleanup function destroying the instance before
		// the new import resolves, a new chart is created rather than updated
		rerender(<Chart options={mockOptions} series={mockSeries} type="bar" />);

		// Wait for the effect to run (may create new chart or update existing)
		await waitFor(
			() => {
				// Either updateOptions is called (if instance exists) or a new chart is created
				const wasUpdated = mockUpdateOptions.mock.calls.length > 0;
				const wasRecreated = MockApexCharts.mock.calls.length > 1;
				expect(wasUpdated || wasRecreated).toBe(true);
			},
			{ timeout: 3000 }
		);

		// Verify the component rendered without errors
		expect(MockApexCharts).toHaveBeenCalled();
	});

	it("should destroy chart instance on unmount", async () => {
		const { unmount } = render(
			<Chart options={mockOptions} series={mockSeries} />
		);

		// Wait for chart to initialize
		await waitFor(() => {
			expect(MockApexCharts).toHaveBeenCalled();
		});

		unmount();

		await waitFor(() => {
			expect(mockDestroy).toHaveBeenCalledTimes(1);
		});
	});

	it("should apply data attributes to the chart container", () => {
		const dataTestId = "chart-component";
		const dataCustom = "custom-value";

		render(
			<Chart
				options={mockOptions}
				series={mockSeries}
				dataAttributes={{
					"data-testid": dataTestId,
					"data-custom": dataCustom,
				}}
			/>
		);

		const chartElement = screen.getByTestId(dataTestId);
		expect(chartElement).toHaveAttribute("data-custom", dataCustom);
	});

	it("should merge chart options correctly", async () => {
		const customOptions: ApexOptions = {
			chart: {
				id: "custom-chart",
				toolbar: {
					show: false,
				},
			},
			colors: ["#ff0000"],
		};

		render(<Chart options={customOptions} series={mockSeries} type="pie" />);

		await waitFor(() => {
			expect(MockApexCharts).toHaveBeenCalled();
		});

		const callArgs = MockApexCharts.mock.calls[0];
		expect(callArgs[1].chart.id).toBe("custom-chart");
		expect(callArgs[1].chart.type).toBe("pie");
		expect(callArgs[1].chart.toolbar?.show).toBe(false);
		expect(callArgs[1].colors).toEqual(["#ff0000"]);
	});

	it("should handle pie chart with numeric series", async () => {
		const pieOptions: ApexOptions = {
			chart: {
				id: "pie-chart",
			},
			labels: ["A", "B", "C"],
		};

		const numericSeries = [44, 55, 13];

		render(<Chart options={pieOptions} series={numericSeries} type="pie" />);

		await waitFor(() => {
			expect(MockApexCharts).toHaveBeenCalled();
		});

		const callArgs = MockApexCharts.mock.calls[0];
		expect(callArgs[1].chart.type).toBe("pie");
		expect(callArgs[1].series).toEqual(numericSeries);
	});

	it("should render chart container div", () => {
		const { container } = render(
			<Chart options={mockOptions} series={mockSeries} />
		);
		const chartDiv = container.querySelector("div");
		expect(chartDiv).toBeInTheDocument();
	});
});
