import React from 'react';
import { Radio } from "../../src";

const Template = (args) => <Radio {...args} />;

export default {
  title: "Forms/Radio",
  component: Radio,
  argTypes: {},

  args: {
    value: "radio",
  },
};

export const Unchecked = {
  render: Template.bind({}),
  name: "Unchecked",

  args: {
    value: "unchecked",
    children: "Unchecked",
    checked: false,
  },
};

export const Checked = {
  render: Template.bind({}),
  name: "Checked",

  args: {
    value: "checked",
    children: "Checked",
    checked: true,
  },
};

export const Disabled = {
  render: Template.bind({}),
  name: "Disabled",

  args: {
    value: "disabled",
    children: "Disabled",
    checked: true,
    disabled: true,
  },
};

export const RadioApi = {
  render: Template.bind({}),
  name: "Radio API",

  args: {
    children: "Radio button",
  },
};
