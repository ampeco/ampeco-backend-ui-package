import classNames from "classnames";
import DataAttributes from "../../types/DataAttributes";
import { LoaderColor } from "../../types/LoaderColors";
import { LoaderSize } from "../../types/Size";
import styles from "./loader.module.css";

interface LoaderProps extends DataAttributes {
	size?: LoaderSize;
	color?: LoaderColor;
}

export const Loader = ({
	size = LoaderSize.MEDIUM,
	color = LoaderColor.PRIMARY,
	dataAttributes,
}: LoaderProps) => {
	return (
		<span
			className={classNames(
				"loader flex justify-center items-center border-solid border-current",
				styles.loader,
				size === LoaderSize.EXTRASMALL && "w-[22px] h-[22px] border-4",
				size === LoaderSize.SMALL && "w-[42px] h-[42px] border-8",
				size === LoaderSize.MEDIUM && "w-[98px] h-[98px] border-16",
				size === LoaderSize.LARGE && "w-[140px] h-[140px] border-22",
				color === LoaderColor.PRIMARY && "border-primary-500",
				color === LoaderColor.WARNING && "border-warning-500",
				color === LoaderColor.DANGER && "border-danger-500",
				color === LoaderColor.SUCCESS && "border-success-500"
			)}
			{...dataAttributes}
		/>
	);
};
