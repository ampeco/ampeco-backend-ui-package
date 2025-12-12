import React from "react";
import { FileUpload } from "../../src";

import { Extension } from "../../src/types/file/Extension";

// @ts-ignore
import PDFThumbnail from "../assets/extensions/pdf.png";
// @ts-ignore
import PNGThumbnail from "../assets/extensions/png.png";
// @ts-ignore
import SVGThumbnail from "../assets/extensions/svg.png";

const Template = (args) => <FileUpload {...args} />;

export default {
	title: "Forms/FileUpload",
	component: File,

	args: {
		inputTitle: "Drag and drop or click anywhere in the box to upload",
		extensionsPrefix: "Allowed types:",
		maxFileSizePrefix: "Max files size:",
		uploadedFilesData: [
			{
				name: "file.pdf",
				size: 1048576,
				type: "application/pdf",
				thumbnailURL: PDFThumbnail,
			},
			{
				name: "file.png",
				size: 1048576,
				type: "image/png",
				thumbnailURL: PNGThumbnail,
			},
			{
				name: "file.svg",
				size: 1048576,
				type: "image/svg",
				thumbnailURL: SVGThumbnail,
			},
		],
		changed: (files: File[]) => {},
		deleted: (file: File) => {},
		error: (errorMessage: string) => {},
		config: {
			maxAllowedSizeMB: 8,
			maxAllowedFilesCount: 10,
			allowedExtensions: [Extension.PDF, Extension.PNG, Extension.SVG],
		},
		dataAttributes: {
			"data-testid": "test",
		},
	},

	argTypes: {
		inputTitle: {
			description: "Sets the main title of the component",
		},
		extensionsPrefix: {
			description: "Sets the text visible for allowed types",
		},
		maxFileSizePrefix: {
			description: "Sets the text for max file size prefix",
		},
		config: {
			description: "Sets the configuration of the component",
		},
		changed: {
			description:
				"Function which is called when uploaded files are being changed",
			control: { type: null },
		},
		error: {
			description: "Function which is called when an error occured",
			control: { type: null },
		},
	},
};

export const FileUploadStory = {
	render: Template.bind({}),
	name: "FileUpload",
};
