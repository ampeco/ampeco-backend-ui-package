import { FC, useEffect, useRef, useState } from "react";
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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const chartInstance = useRef<any>(null);
	const [isClient, setIsClient] = useState(false);

	// Only run on client side to avoid SSR issues
	useEffect(() => {
		setIsClient(true);
	}, []);

	useEffect(() => {
		// Only initialize chart on client side
		if (!isClient || !chartRef.current || typeof window === "undefined") return;

		// Dynamically import ApexCharts only on client side
		import("apexcharts").then((ApexChartsModule) => {
			const ApexCharts = ApexChartsModule.default;

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
		});

		return () => {
			if (chartInstance.current) {
				chartInstance.current.destroy();
				chartInstance.current = null;
			}
		};
	}, [isClient, options, series, height, width, type]);

	return (
		<div ref={chartRef} {...dataAttributes} className={className} {...rest} />
	);
};
