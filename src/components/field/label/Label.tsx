import { ReactNode } from 'react';
import DataAttributes from '../../../types/DataAttributes';
import classNames from 'classnames';

interface LabelProps extends DataAttributes {
	id?: string;
	required?: boolean;
	children?: ReactNode;
}

export const Label = ({ id, required, children, dataAttributes }: LabelProps) => {
	const labelClasses = classNames("form-label", {
		"form-label-required": required
	});

	return <label className={labelClasses} htmlFor={id} {...dataAttributes}>
		<span className="form-label-text">
			{children}
		</span>
	</label>;
};
