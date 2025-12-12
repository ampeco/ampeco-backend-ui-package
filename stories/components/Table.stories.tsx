import React from 'react';
import { Table } from "../../src";

const Template = (args) => <Table {...args} />;

export default {
  title: "Components/Table",
  component: Table,

  args: {
    headers: [
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "Department",
      "Status",
    ],

    rows: [
      ["Mike", "Smith", "mike@mail.com", "00353533", "Sales", "Active"],
      [
        "John",
        "Doe",
        "john@mail.com",
        "00353000",
        "Customer Support",
        "Pending",
      ],
    ],
  },

  argTypes: {
    stripped: {
      control: "boolean",
      description: "Alternates colors of rows and reduces their height",
    },

    headers: {
      description: "Array of strings representing text in the table header",
    },

    rows: {
      description: "2D array that contains text for each table row",
    },
  },
};

export const TableStory = {
  render: Template.bind({}),
  name: "Table",
  height: "400px",
};

