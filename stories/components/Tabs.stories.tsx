import React from "react";
import { Tab } from "../../src";
import { Tabs } from "../../src/components/tabs/Tabs";

const Template = (args) => (
	<Tabs {...args} defaultSelected="tab1">
		<Tab title="Tab 1 Title" id="tab1">
			Tab 1 Content
		</Tab>
		<Tab title="Tab 2 Title" id="tab2">
			Tab 2 Content
		</Tab>
		<Tab title="Tab 3 Title" id="tab3">
			Tab 3 Content
		</Tab>
	</Tabs>
);

export default {
	title: "Components/Tabs",
	component: Tabs,

	subcomponents: {
		Tab,
	},
};

export const TabsStory = {
	render: Template.bind({}),
	name: "Tabs",
};
