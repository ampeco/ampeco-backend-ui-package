import React from 'react';
import { Alert } from "../../src";

const Template = (args) => <Alert {...args} />;

export default {
  title: "Components/Alert",
  component: Alert,

  args: {
    children: "Alert!",
  },

  argTypes: {
    closeable: {
      control: "boolean",
      description: "Displays close icon",
    },
  },
};

export const AlertStory = {
  render: Template.bind({}),
  name: "Alert",
};
