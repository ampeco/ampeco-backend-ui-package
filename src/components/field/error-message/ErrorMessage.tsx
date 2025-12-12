import { ReactNode } from "react";
import DataAttributes from "../../../types/DataAttributes";

interface ErrorMessageProps extends DataAttributes {
	children?: ReactNode;
}

export const ErrorMessage = ({
	children,
	dataAttributes,
}: ErrorMessageProps) => {
	return (
		<p className="text-danger-500 text-xs my-2" {...dataAttributes}>
			{children}
		</p>
	);
};
