import { Extension } from "./Extension";
import { FileConstants } from "./FileCostants";

export class FilesConfig {
	maxAllowedSizeMB: number;
	maxAllowedFilesCount: number;
	allowedExtensions: Extension[];

	constructor(
		maxAllowedSizeMB = 16,
		maxAllowedFilesCount = 20,
		allowedExtensions: Extension[] = FileConstants.DEFAULT_ALLOWED_EXTENSIONS,
	) {
		this.maxAllowedSizeMB = maxAllowedSizeMB;
		this.maxAllowedFilesCount = maxAllowedFilesCount;
		this.allowedExtensions = allowedExtensions;
	}
}