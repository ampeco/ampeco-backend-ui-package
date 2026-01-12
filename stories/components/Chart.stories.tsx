import React from "react";
import { Chart } from "../../src";
import type { ApexOptions } from "apexcharts";

const Template = (args) => {
	const {
		showLabels,
		showToolbar,
		showLegend,
		showAxisLabels,
		showTooltip,
		showGrid,
		type,
		...restArgs
	} = args;

	// Chart types that don't use xaxis/yaxis
	const noAxisTypes = ["pie", "donut", "radialBar", "polarArea"];

	const options: ApexOptions = {
		...restArgs.options,
		dataLabels: {
			enabled: showLabels,
		},
		chart: {
			...restArgs.options?.chart,
			toolbar: {
				show: showToolbar,
			},
			parentHeightOffset: 0,
		},
		tooltip: {
			...restArgs.options?.tooltip,
			enabled: showTooltip,
		},
		grid: {
			...restArgs.options?.grid,
			show: showGrid,
			padding: {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
			},
		},
	};

	// Only add xaxis/yaxis for chart types that support them
	if (!noAxisTypes.includes(type)) {
		options.xaxis = {
			...restArgs.options?.xaxis,
			labels: {
				...restArgs.options?.xaxis?.labels,
				show: showAxisLabels,
			},
			axisBorder: {
				...restArgs.options?.xaxis?.axisBorder,
				show: showGrid,
			},
			axisTicks: {
				...restArgs.options?.xaxis?.axisTicks,
				show: showGrid,
			},
		};
		options.yaxis = {
			...restArgs.options?.yaxis,
			labels: {
				...restArgs.options?.yaxis?.labels,
				show: showAxisLabels,
			},
			axisBorder: {
				...restArgs.options?.yaxis?.axisBorder,
				show: showGrid,
			},
			axisTicks: {
				...restArgs.options?.yaxis?.axisTicks,
				show: showGrid,
			},
		};
	}

	return <Chart {...restArgs} options={options} type={type} />;
};

export default {
	title: "Components/Chart",
	component: Chart,

	args: {
		showToolbar: true,
		showLabels: true,
		showAxisLabels: true,
		showTooltip: true,
		showGrid: true,
		height: 350,
		width: "100%",
		type: "line",
		options: {
			chart: {
				id: "basic-line",
			},
			xaxis: {
				categories: [
					"Jan",
					"Feb",
					"Mar",
					"Apr",
					"May",
					"Jun",
					"Jul",
					"Aug",
					"Sep",
				],
			},
			stroke: {
				curve: "smooth",
			},
			colors: ["#0ea5e9"],
		},
		series: [
			{
				name: "Series 1",
				data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
			},
		],
	},

	argTypes: {
		height: {
			control: "number",
			description: "Chart height",
		},
		width: {
			control: "text",
			description: "Chart width",
		},
		showToolbar: {
			control: "boolean",
			description: "Show toolbar",
		},
		showLegend: {
			control: "boolean",
			description: "Show legend",
		},
		showLabels: {
			control: "boolean",
			description: "Show labels",
		},
		showAxisLabels: {
			control: "boolean",
			description: "Show axis labels",
		},
		showTooltip: {
			control: "boolean",
			description: "Show tooltip",
		},
		showGrid: {
			control: "boolean",
			description: "Show grid",
		},
		type: {
			control: "select",
			description: "Chart type",
			options: [
				"line",
				"area",
				"bar",
				"pie",
				"donut",
				"radialBar",
				"polarArea",
			],
		},
		series: {
			control: "object",
			description: "Series data",
		},
	},
};

export const LineChart = {
	render: Template.bind({}),
	name: "Line Chart",
	args: {
		type: "line",
		options: {
			chart: {
				id: "line-chart",
			},
			xaxis: {
				categories: [
					"Jan",
					"Feb",
					"Mar",
					"Apr",
					"May",
					"Jun",
					"Jul",
					"Aug",
					"Sep",
				],
			},
			yaxis: {},
			stroke: {
				curve: "straight",
				width: 2,
			},
			fill: {
				type: "solid",
				opacity: 0.2,
			},
			markers: {
				size: 6,
				strokeWidth: 2,
				strokeColors: ["#0ea5e9"],
				hover: {
					size: 8,
				},
			},
			dataLabels: {
				enabled: true,
				style: {
					fontSize: "12px",
					fontWeight: 500,
					colors: ["#0ea5e9"],
				},
				offsetY: -5,
			},
			grid: {
				show: false,
			},
			tooltip: {
				enabled: false,
			},
			legend: {
				show: false,
			},
			colors: ["#0ea5e9"],
		},
		series: [
			{
				name: "Sales",
				data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
			},
		],
	},
};

export const AreaChart = {
	render: Template.bind({}),
	name: "Area Chart",
	args: {
		type: "area",
		options: {
			chart: {
				id: "area-chart",
				toolbar: {
					show: true,
				},
			},
			xaxis: {
				categories: [
					"Jan",
					"Feb",
					"Mar",
					"Apr",
					"May",
					"Jun",
					"Jul",
					"Aug",
					"Sep",
				],
			},
			markers: {
				size: 6,
				strokeWidth: 2,
				strokeColors: ["#0ea5e9"],
				hover: {
					size: 8,
				},
			},
			fill: {
				type: "gradient",
				gradient: {
					shadeIntensity: 1,
					gradientToColors: ["#0ea5e9"],
				},
			},
			colors: ["#0ea5e9"],
		},
		series: [
			{
				name: "Revenue",
				data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
			},
		],
	},
};

export const BarChart = {
	render: Template.bind({}),
	name: "Bar Chart",
	args: {
		type: "bar",
		options: {
			chart: {
				id: "bar-chart",
				toolbar: {
					show: true,
				},
			},
			xaxis: {
				categories: [
					"Jan",
					"Feb",
					"Mar",
					"Apr",
					"May",
					"Jun",
					"Jul",
					"Aug",
					"Sep",
				],
			},
			colors: ["#0ea5e9"],
		},
		series: [
			{
				name: "Sales",
				data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
			},
		],
	},
};

export const PieChart = {
	render: Template.bind({}),
	name: "Pie Chart",
	args: {
		type: "pie",
		options: {
			chart: {
				id: "pie-chart",
			},
			labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
			colors: ["#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
		},
		series: [44, 55, 13, 43, 22],
	},
};

export const DonutChart = {
	render: Template.bind({}),
	name: "Donut Chart",
	args: {
		type: "donut",
		options: {
			chart: {
				id: "donut-chart",
			},
			labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
			colors: ["#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
			pie: {
				donut: {
					labels: {
						show: true,
						name: "Team",
						value: "Value",
						total: {
							show: true,
						},
					},
				},
			},
		},
		series: [44, 55, 13, 43, 22],
	},
};

export const MultipleSeries = {
	render: Template.bind({}),
	name: "Multiple Series",
	args: {
		type: "line",
		options: {
			chart: {
				id: "multi-series-chart",
				toolbar: {
					show: true,
				},
			},
			xaxis: {
				categories: [
					"Jan",
					"Feb",
					"Mar",
					"Apr",
					"May",
					"Jun",
					"Jul",
					"Aug",
					"Sep",
				],
			},
			stroke: {
				curve: "smooth",
			},
			colors: ["#0ea5e9", "#10b981", "#f59e0b"],
		},
		series: [
			{
				name: "Series 1",
				data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
			},
			{
				name: "Series 2",
				data: [23, 42, 35, 27, 43, 22, 17, 31, 22],
			},
			{
				name: "Series 3",
				data: [13, 22, 25, 37, 33, 42, 27, 41, 32],
			},
		],
	},
};
