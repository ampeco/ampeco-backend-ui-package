import { ChangeEventHandler, FC, useEffect, useRef, useState } from "react";
import { PaperClipIcon, XMarkIcon } from "@heroicons/react/24/solid";

import { FilesConfig } from "../../types/file/FilesConfig";
import { ProcessedFile } from "../../types/file/ProcessedFile";
import { FileValidator } from "../../types/file/FileValidator";

import classNames from "classnames";
import DataAttributes from "../../types/DataAttributes";

/**
 * Props of the File Component:
 *
 * inputTitle: The main title of inside of the component
 * extensionsPrefix: The text shown before the allowed file types
 * maxFileSizePrefix: The text shown before the max upload file size.
 * uploadedFilesData: Initial files which should be visible when the component is rendered.
 * config: FileConfig which describes the rules which should be used for validation of the files.
 * changed: Callback function to be called when the files are being changed.
 * deleted: Callback function to be called when a file has been deleted.
 * error: Callback function to be called when some validation rule fails for the files.
 */
export interface FileUploadProps extends DataAttributes {
	inputTitle?: string;
	extensionsPrefix?: string;
	maxFileSizePrefix?: string;
	uploadedFilesData: File[];
	config: FilesConfig;
	changed: (files: File[]) => void;
	deleted: (file: File) => void;
	error: (errorMessage: boolean | string) => void;
}

export const FileUpload: FC<FileUploadProps> = ({
	inputTitle = "Drag and drop or click anywhere in the box to upload",
	extensionsPrefix = "Allowed types:",
	maxFileSizePrefix = "Max files size:",
	uploadedFilesData,
	config = new FilesConfig(),
	changed,
	deleted,
	error,
	dataAttributes,
}) => {
	const fileUploadRef = useRef<HTMLInputElement>(null);

	const [uploadedFiles, setUploadedFiles] = useState<File[]>(uploadedFilesData);
	const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([]);
	const [hovered, setHovered] = useState<boolean>(false);

	useEffect(() => {
		const newUploadedFiles: File[] = [...uploadedFiles];
		const newProcessedFiles: ProcessedFile[] = [];

		newUploadedFiles.map((uploadedFile) => {
			newProcessedFiles.push(thumbnailFromExtension(uploadedFile));
		});

		setProcessedFiles(newProcessedFiles);
		changed(newUploadedFiles);
	}, [uploadedFiles]);

	/**
	 * This function transforms a File object into a ProcessedFile object.
	 * @param file File object
	 * @returns ProcessedFile object
	 */
	const thumbnailFromExtension = (file: File): ProcessedFile => {
		const name = file.name.split(".")[0];
		const extension = file.name.split(".")[1];

		return {
			name: name,
			size: file.size,
			type: extension,
			thumbnailURL: `${extension}.png`,
		};
	};

	/**
	 * Event callback which is called when a file or files are being dropped into the component.
	 * @param event
	 * @return {void}
	 */
	const onFilesDrop = (event: any): void => {
		event.preventDefault();
		event.stopPropagation();

		const files: File[] = [...uploadedFiles];

		for (const file of event.dataTransfer.files) {
			const validate = validateFile(file);

			if (!validate) {
				error(validate);
				break;
			}

			files.push(file);
		}

		setUploadedFiles(files);
		setHovered(false);
	};

	/**
	 * Event callback which is called when the cursor is being onto the component while files are dragged.
	 * @param event
	 * @return {void}
	 */
	const onFilesDrag = (event: any): void => {
		event.preventDefault();
		event.stopPropagation();

		setHovered(true);
	};

	/**
	 * Event callback which is called when the cursor leaves the component while files are being dragged.
	 * @param event
	 * @return {void}
	 */
	const onFilesDragLeave = (event: any): void => {
		event.preventDefault();
		event.stopPropagation();

		setHovered(false);
	};

	/**
	 * Event callback which is called when the cursor is inside of the component while files are being dragged.
	 * @param event
	 * @return {void}
	 */
	const onFilesUpload: ChangeEventHandler<HTMLInputElement> = (
		event: any
	): void => {
		const files: File[] = [...uploadedFiles];

		for (const file of event.target.files) {
			const validate = validateFile(file);

			if (!validate) {
				error(validate);
				break;
			}

			files.push(file);
		}

		setUploadedFiles(files);
	};

	/**
	 * Function which is being called when the delete button of a single file from already uploaded and processed is clicked.
	 * @param index
	 * @return {void}
	 */
	const onFileDelete = (index: number): void => {
		const newUploadedFiles: File[] = [...uploadedFiles];
		const deletedFile = [...newUploadedFiles][index];
		newUploadedFiles.splice(index, 1);

		setUploadedFiles(newUploadedFiles);
		deleted(deletedFile);
	};

	/**
	 * Custom simple validation function to be used when a file needs to be processed
	 * @param file
	 * @returns {boolean | string}
	 */
	const validateFile = (file: File): boolean | string => {
		const error = FileValidator.checkFileAndReturnOnError(file, config);
		return error ? error : true;
	};

	const fileWrapperClasses = classNames("file-upload-wrapper", {
		hovered: hovered,
	});

	return (
		<div
			onDrop={onFilesDrop}
			onDragOver={onFilesDrag}
			onDragLeave={onFilesDragLeave}
			className={fileWrapperClasses}
			{...dataAttributes}
		>
			<div
				className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4 cursor-pointer"
				onClick={() => fileUploadRef.current?.click()}
			>
				<input
					onChange={(event) => onFilesUpload(event)}
					onClick={(event: any) => event?.stopPropagation()}
					ref={fileUploadRef}
					hidden
					multiple
					className="input-hidden"
					type="file"
					data-testid="file-input"
				/>
				<div className="flex flex-col items-center justify-center my-6">
					<div className="flex flex-col items-center justify-center my-2">
						<PaperClipIcon className="w-8 h-8" />
						<span className="font-bold text-lg mb-2 mt-4">{inputTitle}</span>
					</div>
					<div className="flex flex-col items-center my-2">
						<span className="text-secondary my-2">
							{extensionsPrefix} {config.allowedExtensions.join(", ")}
						</span>
						<span className="text-secondary my-2">
							{maxFileSizePrefix} {config.maxAllowedSizeMB}MB
						</span>
					</div>
				</div>
			</div>

			{processedFiles.length > 0 && (
				<div className="flex flex-row items-center gap-4">
					{processedFiles.map((processedFile, index) => (
						<div key={index} className="flex flex-col items-center relative">
							<img
								src={processedFile.thumbnailURL}
								alt={processedFile.name}
								className="w-20 h-auto"
							/>
							<XMarkIcon
								onClick={() => onFileDelete(index)}
								className="absolute top-0 right-0 w-4 h-4 cursor-pointer"
								data-testid="delete-file-icon"
							/>
							<span className="file-name">{processedFile.name}</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
