import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, afterEach, expect, vi } from 'vitest';
import { FileUpload } from './FileUpload';
import { FilesConfig } from '../../types/file/FilesConfig';
import { Extension } from '../../types/file/Extension';

const mockChanged = vi.fn();
const mockDeleted = vi.fn();
const mockError = vi.fn();

const mockConfig: FilesConfig = {
	allowedExtensions: [Extension.JPG, Extension.PNG, Extension.PDF],
	maxAllowedFilesCount: 10,
	maxAllowedSizeMB: 5
};

describe('FileUpload Component', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it('should render the component with default props', () => {
		render(<FileUpload 
			uploadedFilesData={[]} 
			config={mockConfig} 
			changed={mockChanged} 
			deleted={mockDeleted} 
			error={mockError} 
		/>);

		expect(screen.getByText('Drag and drop or click anywhere in the box to upload')).toBeInTheDocument();
		expect(screen.getByText('Allowed types: .jpg, .png, .pdf')).toBeInTheDocument();
		expect(screen.getByText('Max files size: 5MB')).toBeInTheDocument();
	});

	it('should handle file uploads correctly', () => {
		const { container } = render(<FileUpload 
			uploadedFilesData={[]} 
			config={mockConfig} 
			changed={mockChanged} 
			deleted={mockDeleted} 
			error={mockError} 
		/>);
        
		const input = container.querySelector('input[type="file"]');
		const file = new File(['dummy content'], 'example.png', { type: 'image/png' });

		Object.defineProperty(input, 'files', {
			value: [file],
			writable: false,
		});

		if (input) {
			fireEvent.change(input);
		}
		
		expect(mockChanged).toHaveBeenCalledWith([file]);
		expect(screen.getByText('example')).toBeInTheDocument(); // Assuming the name appears
	});

	it('should trigger error callback on invalid file type', () => {
		const invalidConfig: FilesConfig = {
			allowedExtensions: [Extension.JPG, Extension.PNG],
			maxAllowedFilesCount: 10,
			maxAllowedSizeMB: 5
		};

		render(<FileUpload 
			uploadedFilesData={[]} 
			config={invalidConfig} 
			changed={mockChanged} 
			deleted={mockDeleted} 
			error={mockError} 
		/>);

		const input = screen.getByTestId('file-input');
		const invalidFile = new File(['invalid content'], 'invalid.doc', { type: 'application/msword' });

		Object.defineProperty(input, 'files', {
			value: [invalidFile],
			writable: false,
		});

		fireEvent.change(input);
		waitFor(() => {
			expect(mockError).toHaveBeenCalled();
			expect(mockError).toHaveBeenCalledWith(expect.any(String)); // Validate error message
		});
	});

	it('should delete a file when delete button is clicked', () => {
		const existingFiles = [new File(['exists'], 'existing_file.png')];

		render(<FileUpload 
			uploadedFilesData={existingFiles} 
			config={mockConfig} 
			changed={mockChanged} 
			deleted={mockDeleted} 
			error={mockError} 
		/>);

		fireEvent.click(screen.getByTestId('delete-file-icon'));
		expect(mockDeleted).toHaveBeenCalledWith(existingFiles[0]);
		expect(mockChanged).toHaveBeenCalledWith([]); // Check if no files left
	});

	it('should handle file drop events', () => {
		render(<FileUpload 
			uploadedFilesData={[]} 
			config={mockConfig} 
			changed={mockChanged} 
			deleted={mockDeleted} 
			error={mockError} 
		/>);

		const dropArea = screen.getByText('Drag and drop or click anywhere in the box to upload');

		const file = new File(['dropped content'], 'dropped_file.png', { type: 'image/png' });

		fireEvent.drop(dropArea, {
			dataTransfer: {
				files: [file],
			},
		});

		expect(mockChanged).toHaveBeenCalledWith([file]);
	});
});