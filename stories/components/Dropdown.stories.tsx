import React from 'react';
import { Dropdown, Button } from "../../src";

const Template = (args) => <Dropdown {...args} />

export default {
  title: "Components/Dropdown",
  component: Dropdown,
	decorators: [
		(Story) => (
			<div style={{ height: '200px' }}>
				<Story />
			</div>
		),
	],
  args: {
    options: [
      {
        label: "Edit",
        onClick: () => console.log("Edit Clicked"),
      },
      {
        label: "Delete",
        onClick: () => console.log("Delete Clicked"),
      },
      {
        label: "Hidden item",
        onClick: () => console.log("Hidden item Clicked"),
        hidden: true,
      },
    ],

    renderToggle: ({isOpen}) => {return <Button>{isOpen ? "Hide" : "Show"} Dropdown menu</Button>},
  },

  argTypes: {
    options: {
      description: "Array of objects with label and onClick properties",
    },

    renderToggle: {
      description: "Function that returns an element that toggles the open state of the menu",
      control: "function",
    },
  },
};

export const DropdownStory = {
  render: Template.bind({}),
  name: "Dropdown",
  height: "400px",
};
