import React from "react";
import { Button } from "../../src";
import { Size } from "../../src/types/Size";
import { Shape } from '../../src/types/Shape';

const Template = (args) => <Button {...args}>Button</Button>;

export default {
  title: "Components/Button",
  component: Button,

  args: {
    variant: "filled",
    size: Size.MEDIUM,
    disabled: false,
    loading: false,
	  shape: Shape.DEFAULT
  },

  argTypes: {
    variant: {
      control: "radio",
      options: ["filled", "outline", "link"],
    },
  },
};

export const ButtonStory = {
  render: Template.bind({}),
  name: "Button",
};
