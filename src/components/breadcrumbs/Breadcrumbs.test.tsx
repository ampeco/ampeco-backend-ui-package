import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Breadcrumbs } from './Breadcrumbs';
import { describe, vi, it, expect } from 'vitest';

describe('Breadcrumbs', () => {
	const data = [
		{ id: '1', text: 'Home' },
		{ id: '2', text: 'Products' },
		{ id: '3', text: 'Category' },
		{ id: '4', text: 'Product' },
	];

	it('renders breadcrumbs correctly', () => {
		render(<Breadcrumbs data={data} />);

		const breadcrumbs = screen.getByLabelText('Breadcrumb').children;
		
		expect(breadcrumbs).toHaveLength(data.length);

		data.forEach((item, index) => {
			expect(breadcrumbs[index]).toHaveTextContent(item.text);
		});
	});

	it('calls onItemSelected when a breadcrumb is clicked', () => {
		const onItemSelected = vi.fn();
		render(<Breadcrumbs data={data} onItemSelected={onItemSelected} />);

		const breadcrumb = screen.getByText('Category');
		
		fireEvent.click(breadcrumb);

		expect(onItemSelected).toHaveBeenCalledWith('3');
	});

	it('does not call onItemSelected when a disabled breadcrumb is clicked', () => {
		const onItemSelected = vi.fn();
		const dataWithDisabled = [
			...data,
			{ id: '5', text: 'Disabled', disabled: true },
		];
		render(
			<Breadcrumbs data={dataWithDisabled} onItemSelected={onItemSelected} />
		);

		const disabledBreadcrumb = screen.getByText('Disabled');
		fireEvent.click(disabledBreadcrumb);

		expect(onItemSelected).not.toHaveBeenCalled();
	});

	it('calls onItemSelected when a breadcrumb is clicked with keyboard', () => {
		const onItemSelected = vi.fn();
		render(<Breadcrumbs data={data} onItemSelected={onItemSelected} />);

		const breadcrumb = screen.getByText('Category');
		fireEvent.keyDown(breadcrumb, { key: 'Enter' });

		expect(onItemSelected).toHaveBeenCalledWith('3');
	});
});
