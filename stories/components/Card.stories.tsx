import React from "react";
import { Card } from "../../src";
import { Shape } from "../../src/types/Shape";
import { Chart } from "../../src/components/chart/Chart";
import { ApexOptions } from "apexcharts";

const Template = (args) => {
	const { footer, ...restArgs } = args;
	const chartArgs = {
		height: 50,
		type: "area" as NonNullable<ApexOptions["chart"]>["type"],
		options: {
			chart: {
				id: "area-chart",
				toolbar: {
					show: false,
				},
				legend: {
					show: false,
				},
				labels: {
					show: false,
				},
				zoom: {
					enabled: false,
				},
				parentHeightOffset: 18,
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
				labels: {
					show: false,
				},
				axisBorder: {
					show: false,
				},
				axisTicks: {
					show: false,
				},
			},
			yaxis: {
				labels: {
					show: false,
				},
			},
			colors: ["#0ea5e9"],
			stroke: {
				curve: "straight" as NonNullable<ApexOptions["stroke"]>["curve"],
				width: 2,
			},
			fill: {
				type: "solid",
				opacity: 0.2,
			},
			markers: {
				size: 5,
				strokeWidth: 2,
				strokeColors: ["#0ea5e9"],
				hover: {
					size: 5,
				},
			},
			dataLabels: {
				enabled: false,
			},
			grid: {
				show: false,
				padding: {
					left: -4,
					right: 6,
					top: -20,
					bottom: -12,
				},
			},
			tooltip: {
				enabled: true,
				intersect: true,
				shared: false,
				marker: {
					show: true,
				},

				custom: ({ series, seriesIndex, dataPointIndex, w }) => {
					return `<div class="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg p-2">
						<div class="text-sm font-bold">${series[seriesIndex][dataPointIndex]}</div>
					</div>`;
				},
			},
		},
		series: [
			{
				name: "Uses",
				data: [0, 0, 15, 20, 35, 0, 10, 15, 0],
			},
		],
	};

	return (
		<div className="h-96 flex items-center justify-center">
			<Card
				{...restArgs}
				footer={
					footer === "Chart" ? (
						<div className="-mx-6" style={{ marginBottom: "-37px" }}>
							<Chart {...chartArgs} type="area" />
						</div>
					) : (
						<div>Footer Content</div>
					)
				}
			>
				Card Content
			</Card>
		</div>
	);
};

export default {
	title: "Components/Card",
	component: Card,

	args: {
		showBody: true,
		showHeader: true,
		showFooter: true,
		showDivider: true,
		shape: Shape.DEFAULT,
		selected: false,
		disabled: false,
		footer: "Footer",
		header: "Header",
		actions: "Actions",
	},

	argTypes: {
		footer: {
			control: "select",
			options: ["Footer", "Chart"],
		},
	},
};

export const CardStory = {
	render: Template.bind({}),
	name: "Card",
};
