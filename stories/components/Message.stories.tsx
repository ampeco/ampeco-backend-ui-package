import React from 'react';
import { Message } from "../../src";
import defaultImageUrl from "../assets/no-matching-results.svg";

const Template = (args) => <Message {...args} />;

export default {
  title: "Components/Message",
  component: Message,

  args: {
    text: "No matching results",
    imgUrl: defaultImageUrl,
    altText: "Image alt text",
  },
};

export const MessageStory = {
  render: Template.bind({}),
  name: "Message",
};
