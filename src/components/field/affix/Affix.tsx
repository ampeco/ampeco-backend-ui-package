import { HTMLProps, ReactNode } from "react";
import classNames from "classnames";
import DataAttributes from "../../../types/DataAttributes";

interface AffixProps
	extends Omit<HTMLProps<HTMLDivElement>, "className" | "style">,
		DataAttributes {
	children?: ReactNode;
	className?: classNames.Argument;
	style?: "unit";
	tight?: boolean;
}

export const Affix = ({
	children,
	className,
	tight,
	style,
	dataAttributes,
	...props
}: AffixProps) => {
	const classes = classNames("flex items-center self-stretch", className, {
		[`affix-${style}`]: style,
	});

	return (
		<div className={classes} {...dataAttributes} {...props}>
			{children}
		</div>
	);
};
