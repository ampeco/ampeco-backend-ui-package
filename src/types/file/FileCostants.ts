import { Extension } from "./Extension";
import { FileType } from "./FileType";

export class FileConstants {
	static readonly DEFAULT_ALLOWED_EXTENSIONS: Extension[] = [
		Extension.GIF,
		Extension.JPEG,
		Extension.JPG,
		Extension.PNG,
		Extension.SVG,

		Extension.DOC,
		Extension.DOCX,

		Extension.TXT,
		Extension.PDF,
		Extension.CSV,

		Extension.XLS,
		Extension.XLSX,

		Extension.PPT,
		Extension.PPTX,
	];

	static readonly DEFAULT_IMAGE_ALLOWED_EXTENSIONS: Extension[] = [
		Extension.JPEG,
		Extension.PNG,
		Extension.SVG,
		Extension.JPG,
	];

	static readonly EXTENSION_TYPE_PAIRS = new Map<FileType, Extension>([
		[FileType.GIF, Extension.GIF],
		[FileType.JPEG, Extension.JPEG],
		[FileType.JPG, Extension.JPG],
		[FileType.PNG, Extension.PNG],
		[FileType.SVG, Extension.SVG],

		[FileType.DOC, Extension.DOC],
		[FileType.DOCX, Extension.DOCX],

		[FileType.TXT, Extension.TXT],
		[FileType.PDF, Extension.PDF],
		[FileType.CSV, Extension.CSV],

		[FileType.XLS, Extension.XLS],
		[FileType.XLSX, Extension.XLSX],

		[FileType.PPT, Extension.PPT],
		[FileType.PPTX, Extension.PPTX],
	]);

	private constructor() {}
}
