import React, { ReactNode } from "react";
import { List } from "../../src";
import { PlusIcon } from "@heroicons/react/24/solid";

// @ts-ignore
import defaultPhoto from "../assets/defaultPhoto.png";

const Template = (args) => <List {...args} />;

type Item = {
	name: string;
	img: string;
};

export default {
	title: "Components/List",
	component: List,
	args: {
		heading: "List Heading",
		addIcon: <PlusIcon className="w-4 h-4" />,
		items: [
			{ id: 1, name: "Name 1", img: defaultPhoto },
			{ id: 2, name: "Name 2", img: defaultPhoto },
			{ id: 3, name: "Name 3", img: defaultPhoto },
		],
		itemTemplateRef: (item: Item) => {
			return (
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-start",
						gap: "16px",
						width: "90%",
					}}
				>
					<img src={item.img} alt={item.name} height={48} width={48} />
					<p>{item.name}</p>
				</div>
			);
		},
	},
	argTypes: {
		items: {
			description: "The list of items to be reordered.",
			control: { type: "array" },
		},
		itemTemplateRef: {
			description: "Set the template to be rendered for each item.",
			control: { type: "text" },
		},
	},
};

export const ListStory = {
	render: Template.bind({}),
	name: "List",
};
