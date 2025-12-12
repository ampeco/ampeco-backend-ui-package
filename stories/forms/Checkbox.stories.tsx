import React from 'react';
import { Checkbox } from "../../src";

const Template = (args) => <Checkbox {...args} />;

export default {
  title: "Forms/Checkbox",
  component: Checkbox,

  argTypes: {
    value: {
      options: [undefined, true, "indeterminate", false],
      control: "select",
    },

    defaultValue: {
      options: [undefined, true, "indeterminate", false],
      control: "select",
    },
  },

  args: {
    onChange: undefined,
  },
};

export const Unchecked = {
  render: Template.bind({}),
  name: "Unchecked",

  args: {
    children: "Unchecked",
  },
};

export const Indeterminate = {
  render: Template.bind({}),
  name: "Indeterminate",

  args: {
    value: "indeterminate",
    children: "Indeterminate",
  },
};

export const Checked = {
  render: Template.bind({}),
  name: "Checked",

  args: {
    value: true,
    children: "Checked",
  },
};

export const Api = {
  render: Template.bind({}),
  name: "API",

  args: {
    value: true,
    children: "Checked",
  },
};
