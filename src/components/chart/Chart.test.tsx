import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import type { ApexOptions } from "apexcharts";

import { Chart } from "./Chart";

// Create mock functions
const mockRender = vi.fn();
const mockUpdateOptions = vi.fn();
const mockDestroy = vi.fn();

// Mock ApexCharts
vi.mock("apexcharts", () => {
	return {
		default: vi.fn().mockImplementation(() => ({
			render: mockRender,
			updateOptions: mockUpdateOptions,
			destroy: mockDestroy,
		})),
	};
});

// Import after mock
import ApexCharts from "apexcharts";

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
	});

	it("should render without crashing", () => {
		const { container } = render(
			<Chart options={mockOptions} series={mockSeries} />
		);
		expect(container.firstChild).toBeInTheDocument();
	});

	it("should initialize ApexCharts with correct options", () => {
		render(<Chart options={mockOptions} series={mockSeries} />);

		expect(ApexCharts).toHaveBeenCalledTimes(1);
		const callArgs = (ApexCharts as unknown as ReturnType<typeof vi.fn>).mock
			.calls[0];
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

	it("should call render on chart instance", () => {
		render(<Chart options={mockOptions} series={mockSeries} />);

		expect(mockRender).toHaveBeenCalledTimes(1);
	});

	it("should use default type 'line' when type is not provided", () => {
		render(<Chart options={mockOptions} series={mockSeries} />);

		const callArgs = (ApexCharts as unknown as ReturnType<typeof vi.fn>).mock
			.calls[0];
		expect(callArgs[1].chart.type).toBe("line");
	});

	it("should use provided chart type", () => {
		render(<Chart options={mockOptions} series={mockSeries} type="bar" />);

		const callArgs = (ApexCharts as unknown as ReturnType<typeof vi.fn>).mock
			.calls[0];
		expect(callArgs[1].chart.type).toBe("bar");
	});

	it("should use default height 'auto' when height is not provided", () => {
		render(<Chart options={mockOptions} series={mockSeries} />);

		const callArgs = (ApexCharts as unknown as ReturnType<typeof vi.fn>).mock
			.calls[0];
		expect(callArgs[1].chart.height).toBe("auto");
	});

	it("should use provided height", () => {
		render(<Chart options={mockOptions} series={mockSeries} height={400} />);

		const callArgs = (ApexCharts as unknown as ReturnType<typeof vi.fn>).mock
			.calls[0];
		expect(callArgs[1].chart.height).toBe(400);
	});

	it("should use default width '100%' when width is not provided", () => {
		render(<Chart options={mockOptions} series={mockSeries} />);

		const callArgs = (ApexCharts as unknown as ReturnType<typeof vi.fn>).mock
			.calls[0];
		expect(callArgs[1].chart.width).toBe("100%");
	});

	it("should use provided width", () => {
		render(<Chart options={mockOptions} series={mockSeries} width="500px" />);

		const callArgs = (ApexCharts as unknown as ReturnType<typeof vi.fn>).mock
			.calls[0];
		expect(callArgs[1].chart.width).toBe("500px");
	});

	it("should use series from props when provided", () => {
		const customSeries = [
			{
				name: "Custom Series",
				data: [1, 2, 3],
			},
		];

		render(<Chart options={mockOptions} series={customSeries} />);

		const callArgs = (ApexCharts as unknown as ReturnType<typeof vi.fn>).mock
			.calls[0];
		expect(callArgs[1].series).toEqual(customSeries);
	});

	it("should use series from options when series prop is not provided", () => {
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

		const callArgs = (ApexCharts as unknown as ReturnType<typeof vi.fn>).mock
			.calls[0];
		expect(callArgs[1].series).toEqual(optionsWithSeries.series);
	});

	it("should use empty array for series when neither series prop nor options.series is provided", () => {
		render(<Chart options={mockOptions} />);

		const callArgs = (ApexCharts as unknown as ReturnType<typeof vi.fn>).mock
			.calls[0];
		expect(callArgs[1].series).toEqual([]);
	});

	it("should handle prop changes", () => {
		const { rerender } = render(
			<Chart options={mockOptions} series={mockSeries} type="line" />
		);

		// Verify initial render
		expect(ApexCharts).toHaveBeenCalledTimes(1);

		// Change props - the component should handle the change
		rerender(<Chart options={mockOptions} series={mockSeries} type="bar" />);

		// Component should still render without errors
		expect(ApexCharts).toHaveBeenCalled();
	});

	it("should destroy chart instance on unmount", () => {
		const { unmount } = render(
			<Chart options={mockOptions} series={mockSeries} />
		);

		unmount();

		expect(mockDestroy).toHaveBeenCalledTimes(1);
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

	it("should merge chart options correctly", () => {
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

		const callArgs = (ApexCharts as unknown as ReturnType<typeof vi.fn>).mock
			.calls[0];
		expect(callArgs[1].chart.id).toBe("custom-chart");
		expect(callArgs[1].chart.type).toBe("pie");
		expect(callArgs[1].chart.toolbar?.show).toBe(false);
		expect(callArgs[1].colors).toEqual(["#ff0000"]);
	});

	it("should handle pie chart with numeric series", () => {
		const pieOptions: ApexOptions = {
			chart: {
				id: "pie-chart",
			},
			labels: ["A", "B", "C"],
		};

		const numericSeries = [44, 55, 13];

		render(<Chart options={pieOptions} series={numericSeries} type="pie" />);

		const callArgs = (ApexCharts as unknown as ReturnType<typeof vi.fn>).mock
			.calls[0];
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
