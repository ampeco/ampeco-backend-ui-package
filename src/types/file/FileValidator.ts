import { FileConstants } from "./FileCostants";
import { FilesConfig } from "./FilesConfig";
import { FileType } from "./FileType";

export class FileValidator {
	static checkFileAndReturnOnError(
		file: File,
		config: FilesConfig
	): string | undefined {
		if (!this.isFileWithAllowedExtension(file, config)) {
			return `The extension of ${file.name} is not in the allowed ones`;
		} else if (!this.isFileSizeBellowLimit(file, config)) {
			return `${file.name} does not meet the size limitations`;
		} else {
			return undefined;
		}
	}

	static isFileWithAllowedExtension(file: File, config: FilesConfig): boolean {
		const type = FileConstants.EXTENSION_TYPE_PAIRS.get(file.type as FileType);

		if (type) {
			return config.allowedExtensions.includes(type);
		}

		return false;
	}

	static isFileSizeBellowLimit(file: File, config: FilesConfig): boolean {
		return config.maxAllowedSizeMB > file.size / (1024 * 1024);
	}
}
