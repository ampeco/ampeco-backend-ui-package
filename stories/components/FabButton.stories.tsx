import React from "react";
import { FabButton } from "../../src";
import { Size } from "../../src/types/Size";

const Template = (args) => <FabButton {...args}>+</FabButton>;

export default {
  title: "Components/FabButton",
  component: FabButton,

  args: {
    variant: "filled",
    size: Size.MEDIUM,
    disabled: false,
    loading: false,
  },

  argTypes: {
    variant: {
      control: "radio",
      options: ["filled", "outline", "link"],
    },
  },
};

export const FabButtonStory = {
  render: Template.bind({}),
  name: "FabButton",
};
