import React from 'react';
import { Pagination } from "../../src";
import { Shape } from '../../src/types/Shape';

const Template = (args) => <Pagination {...args} />;

export default {
  title: "Components/Pagination",
  component: Pagination,

  args: {
    totalItems: 100,
    pageSize: 10,
    visiblePages: 4,
    shape: Shape.DEFAULT
  },

  argTypes: {
    pageSize: {
      description: "Number of items per page",
    },

    visiblePages: {
      description: "Number of visible pages",
    },
  },
};

export const PaginationStory = {
  render: Template.bind({}),
  name: "Pagination",
};
