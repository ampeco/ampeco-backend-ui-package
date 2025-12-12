import React from 'react';
import { Loader } from "../../src";
import { LoaderSize } from '../../src/types/Size';
import { LoaderColor } from '../../src/types/LoaderColors';

const Template = (args) => <Loader {...args} />;

export default {
  title: "Components/Loader",
  component: Loader,

  args: {
    size: LoaderSize.MEDIUM,
    color: LoaderColor.PRIMARY
  },
  argTypes: {
    size: {
      options: ["xs", "sm", "m", "lg"],
      control: {
        type: "radio",
      },
    },
    color: {
      options: ["primary", "warning", "danger", "success"],
      control: {
        type: "radio",
      },
    },
  },
};

export const LoaderStory = {
  render: Template.bind({}),
  name: "Loader",
};
