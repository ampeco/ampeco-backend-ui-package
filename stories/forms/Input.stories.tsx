import React from 'react';
import { Affix, Input as InputComponent } from "../../src";

const Template = (args) => (
  <InputComponent
    {...args}
    prefix={<Affix>{args.prefix}</Affix>}
    suffix={<Affix>{args.suffix}</Affix>}
  />
);

export default {
  title: "Forms/Input",
  component: InputComponent,

  args: {
    id: "input",
    value: undefined,
    disabled: false,
    readonly: false,
    required: false,
    error: false,
    clearable: false,
    prefix: "",
    suffix: "",
  },

  argTypes: {
    inputType: {
      control: "radio",
      options: ["text", "number", "password", "tel", "email"],
    },
    shape: {
      control: "radio",
      options: ["default", "rounded", "square"],
    },
    size: {
      control: "radio",
      options: ["small", "medium", "large"],
    },
  },
};

export const InputStory = {
  render: Template.bind({}),
  name: "Input",
};
