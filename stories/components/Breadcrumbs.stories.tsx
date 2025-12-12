import React from 'react';
import { Breadcrumbs } from "../../src";

const Template = (args) => <Breadcrumbs {...args} />;

export default {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,

  args: {
    data: [
      {
        id: "home",
        text: "Home",
      },
      {
        id: "shop",
        text: "Shop",
        disabled: true,
      },
      {
        id: "shoes",
        text: "Shoes",
      },
      {
        id: "running-shoes",
        text: "Running Shoes",
      },
    ],
  },

  argTypes: {
    data: {
      description: "Array of objects with id and text properties",
    },
  },
};

export const BreadcrumbsStory = {
  render: Template.bind({}),
  name: "Breadcrumbs",
};
