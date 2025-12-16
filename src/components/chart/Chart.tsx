import { FC, useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import type { ApexOptions } from "apexcharts";
import DataAttributes from "../../types/DataAttributes";

interface ChartProps extends DataAttributes {
	options?: ApexOptions;
	series?: ApexOptions["series"];
	height?: string | number;
	width?: string | number;
	type?: NonNullable<ApexOptions["chart"]>["type"];
	className?: string;
}

export const Chart: FC<ChartProps> = ({
	options,
	series,
	height = "auto",
	width = "100%",
	type = "line",
	dataAttributes,
	className,
	...rest
}) => {
	const chartRef = useRef<HTMLDivElement>(null);
	const chartInstance = useRef<ApexCharts | null>(null);

	useEffect(() => {
		if (!chartRef.current) return;

		const chartOptions: ApexOptions = {
			...(options || {}),
			chart: {
				...(options?.chart || {}),
				type,
				height,
				width,
			},
			series: series || options?.series || [],
		};

		if (chartInstance.current) {
			chartInstance.current.updateOptions(chartOptions);
		} else {
			chartInstance.current = new ApexCharts(chartRef.current, chartOptions);
			chartInstance.current.render();
		}

		return () => {
			if (chartInstance.current) {
				chartInstance.current.destroy();
				chartInstance.current = null;
			}
		};
	}, [options, series, height, width, type]);

	return (
		<div ref={chartRef} {...dataAttributes} className={className} {...rest} />
	);
};
