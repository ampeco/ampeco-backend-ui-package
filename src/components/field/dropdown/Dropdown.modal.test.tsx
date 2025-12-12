import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Dropdown } from './Dropdown';

describe('Field Dropdown Modal Integration', () => {
	it('should not close dropdown when clicking on modal backdrop', () => {
		const onRequestOpenChange = vi.fn();
		
		// Create a mock modal backdrop element
		const backdrop = document.createElement('div');
		backdrop.className = 'dialog-backdrop';
		document.body.appendChild(backdrop);

		const { container } = render(
			<Dropdown
				isOpen={true}
				onRequestOpenChange={onRequestOpenChange}
				handle={<button>Toggle</button>}
			>
				<div>Dropdown content</div>
			</Dropdown>
		);

		// Simulate clicking on the modal backdrop
		fireEvent.mouseDown(backdrop);

		// The dropdown should NOT close when clicking on modal backdrop
		expect(onRequestOpenChange).not.toHaveBeenCalled();

		// Clean up
		document.body.removeChild(backdrop);
	});

	it('should close dropdown when clicking outside but not on modal backdrop', () => {
		const onRequestOpenChange = vi.fn();
		
		const { container } = render(
			<Dropdown
				isOpen={true}
				onRequestOpenChange={onRequestOpenChange}
				handle={<button>Toggle</button>}
			>
				<div>Dropdown content</div>
			</Dropdown>
		);

		// Simulate clicking outside the dropdown (not on modal backdrop)
		fireEvent.mouseDown(document.body);

		// The dropdown should close when clicking outside
		expect(onRequestOpenChange).toHaveBeenCalledWith(false, 'click');
	});

	it('should not close dropdown when clicking on drawer backdrop', () => {
		const onRequestOpenChange = vi.fn();
		
		// Create a mock drawer backdrop element
		const backdrop = document.createElement('div');
		backdrop.className = 'drawer-backdrop';
		document.body.appendChild(backdrop);

		const { container } = render(
			<Dropdown
				isOpen={true}
				onRequestOpenChange={onRequestOpenChange}
				handle={<button>Toggle</button>}
			>
				<div>Dropdown content</div>
			</Dropdown>
		);

		// Simulate clicking on the drawer backdrop
		fireEvent.mouseDown(backdrop);

		// The dropdown should NOT close when clicking on drawer backdrop
		expect(onRequestOpenChange).not.toHaveBeenCalled();

		// Clean up
		document.body.removeChild(backdrop);
	});

	it('should close dropdown when clicking inside modal content (not on backdrop)', () => {
		const onRequestOpenChange = vi.fn();
		
		// Create a mock modal structure with backdrop and content
		const backdrop = document.createElement('div');
		backdrop.className = 'dialog-backdrop';
		const content = document.createElement('div');
		content.className = 'dialog-content';
		backdrop.appendChild(content);
		document.body.appendChild(backdrop);

		const { container } = render(
			<Dropdown
				isOpen={true}
				onRequestOpenChange={onRequestOpenChange}
				handle={<button>Toggle</button>}
			>
				<div>Dropdown content</div>
			</Dropdown>
		);

		// Simulate clicking on the modal content (inside backdrop but not on backdrop itself)
		fireEvent.mouseDown(content);

		// The dropdown should close when clicking inside modal content
		expect(onRequestOpenChange).toHaveBeenCalledWith(false, 'click');

		// Clean up
		document.body.removeChild(backdrop);
	});

	it('should close dropdown when clicking on any element inside modal content', () => {
		const onRequestOpenChange = vi.fn();
		
		// Create a mock modal structure with backdrop and content
		const backdrop = document.createElement('div');
		backdrop.className = 'dialog-backdrop';
		const content = document.createElement('div');
		content.className = 'dialog-content';
		const button = document.createElement('button');
		button.textContent = 'Test Button';
		content.appendChild(button);
		backdrop.appendChild(content);
		document.body.appendChild(backdrop);

		const { container } = render(
			<Dropdown
				isOpen={true}
				onRequestOpenChange={onRequestOpenChange}
				handle={<button>Toggle</button>}
			>
				<div>Dropdown content</div>
			</Dropdown>
		);

		// Simulate clicking on a button inside the modal content
		fireEvent.mouseDown(button);

		// The dropdown should close when clicking on elements inside modal content
		expect(onRequestOpenChange).toHaveBeenCalledWith(false, 'click');

		// Clean up
		document.body.removeChild(backdrop);
	});
});
