import React from 'react';
import { Button, SmartTable } from "../../src";
import { ValidatorsEnum } from '../../src/components/smart-table/types';

const Template = (args) => (
  <SmartTable
    {...args}
    onRowUpdate={(updatedRow, index, actionType) => console.log(updatedRow, index, actionType)}
  />
);

export default {
  title: "Components/SmartTable",
  component: SmartTable,

  args: {
    headers:
      [
        {
          key: 'name',
          label: 'First Name'
        },
        {
          key: 'lastName',
          label: 'Last Name'
        },
        {
          key: 'email',
          label: 'Email'
        },
        {
          key: 'phone',
          label: 'Phone'
        },
        {
          key: 'status',
          label: 'Status',
          inputType: 'select',
          inputOptions: [
            {
              label: 'Active',
              value: 'Active'
            },
            {
              label: 'Pending',
              value: 'Pending'
            }
          ]
        }
      ],
    rows: [
      {
        name: "Mike",
        lastName: "Smith",
        email: "mike@mail.com",
        phone: "00353533",
        status: "Active",
      },
      {
        name: "John",
        lastName: "Doe",
        email: "john@mail.com",
        phone: "00353533",
        status: "Pending",
      },
    ],
    actionsConfig: {
      position: "right",
      addLabel: "Add new",
      editLabel: "Save",
      deleteLabel: "Delete",
      cancelLabel: "Cancel",
      columnLabel: "Actions"
    },
    readonlyFields: ['phone'],
    formFieldConfigs: [
      {
        key: 'name',
        validators: [
          {
            validatorType: ValidatorsEnum.REQUIRED,
            errorMessage: 'Name is required',
          },
          {
            validatorType: ValidatorsEnum.MIN_LENGTH,
            errorMessage: 'Name must be at least 3 characters',
            param: 3,
          },
        ],
      },
      {
        key: 'email',
        validators: [
          {
            validatorType: ValidatorsEnum.REQUIRED,
            errorMessage: 'Email is required',
          },
          {
            validatorType: ValidatorsEnum.EMAIL,
            errorMessage: 'Email is invalid',
          },
        ],
      },
    ],
  },

  argTypes: {
    stripped: {
      control: "boolean",
      description: "Alternates colors of rows and reduces their height",
    },

    headers: {
      description: "Object that needs to have matching keyes with each row object and values can be strings or ReactNodes",
    },
    rows: {
      description: "Array of objects that represent table data. Keyes should match those provided in `headers` prop and where possible, provide rowId for each object, otherwise it will be dynamically added.",
    },
    canEdit: {
      description: "When true, table cells can be edited and new rows can be added"
    },
    addRowElement: {
      description: "React Element that adds new row on click"
    },
    addRowElementClass: {
      description: 'Class names of element that adds new row on click'
    },
    canSelect: {
      descirption: "When true, adds checkboxes for selecting single or multiple rows"
    },
    onRowUpdate: {
      description: "It's called with new row data and row index when editable cell is updated or new row added"
    },
    onSelectRows: {
      description: "It's called with an array of selected rows"
    }
  },
};

export const SmartTableStory = {
  render: Template.bind({}),
  name: "SmartTable",
  height: "400px",
};
