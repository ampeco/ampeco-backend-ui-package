import React, { useState, useEffect } from 'react';
import { Toggle } from "../../src";

export default {
	title: "Forms/Toggle",
	component: Toggle,
	argTypes: {
		value: { control: 'boolean' },
		disabled: { control: 'boolean' },
		isCompact: { control: 'boolean' }
	},
	args: {
		children: 'Toggle Label',
	},
};

const InteractiveTemplate = (args) => {
	const [checkState, setCheckState] = useState(args.value || false);

	useEffect(() => {
		setCheckState(args.value);
	}, [args.value]);

	const handleChange = (checked) => {
		setCheckState(checked);
		if (args.onChange) {
			args.onChange(checked);
		}
	};

	return (
		<Toggle {...args} value={checkState} onChange={handleChange}>
			{args.children}
		</Toggle>
	);
};

export const InteractiveToggle = InteractiveTemplate.bind({});
InteractiveToggle.args = {
	value: false,
	disabled: false,
	isCompact: true,
	children: 'Label',
};
