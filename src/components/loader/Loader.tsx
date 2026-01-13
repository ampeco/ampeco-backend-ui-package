import classNames from "classnames";
import DataAttributes from "../../types/DataAttributes";
import "./loader.css";

interface LoaderProps extends DataAttributes {
	size?: "xs" | "sm" | "m" | "lg";
	color?: "primary" | "warning" | "danger" | "success" | "currentColor";
}

export const Loader = ({
	size = "m",
	color = "primary",
	dataAttributes,
}: LoaderProps) => {
	return (
		<span
			className={classNames(
				"loader flex justify-center items-center border-solid border-current",
				size === "xs" && "w-[22px] h-[22px] border-4",
				size === "sm" && "w-[42px] h-[42px] border-8",
				size === "m" && "w-[98px] h-[98px] border-16",
				size === "lg" && "w-[140px] h-[140px] border-22",
				color === "primary" && "border-primary-500",
				color === "warning" && "border-warning-500",
				color === "danger" && "border-danger-500",
				color === "success" && "border-success-500",
				color === "currentColor" && "border-current"
			)}
			{...dataAttributes}
		/>
	);
};
