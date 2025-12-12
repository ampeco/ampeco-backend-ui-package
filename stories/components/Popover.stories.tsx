import React from 'react';
import {
  Popover as PopoverComponent,
  PopoverTrigger,
  PopoverContent,
} from "../../src";

const Template = (args) => (
  <>
    <PopoverComponent {...args}>
      <PopoverTrigger>
        <button
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
          }}
        >
          Click me
        </button>
      </PopoverTrigger>
      <PopoverContent>
        Some Content
      </PopoverContent>
    </PopoverComponent>
  </>
);

export default {
  title: "Components/Popover",
  component: PopoverComponent,
	decorators: [
		(Story) => (
			<div style={{ height: '200px' }}>
				<Story />
			</div>
		),
	],
  argTypes: {
    preferredPosition: {
      control: "radio",
      options: ["top", "left", "right", "bottom"],
    },
    shape: {
      control: "radio",
      options: ["default", "rounded", "square"],
    },
  },
};

export const PopoverStory = {
  render: Template.bind({}),
  name: "Popover",
};
