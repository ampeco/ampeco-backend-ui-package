import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Message } from './Message';
import defaultImageUrl from '../../assets/icons/no-matching-results.svg';

describe('Message Component', () => {
	it('renders without crashing', () => {
		render(<Message dataAttributes={{'data-testid': 'message-container'}} />);
		const messageContainer = screen.getByTestId('message-container');
		expect(messageContainer).toBeInTheDocument();
	});

	it('uses default image when imgUrl is not provided', () => {
		render(<Message />);
		const image = screen.getByRole('img');
		expect(image).toHaveAttribute('src', defaultImageUrl);
	});

	it('uses provided image when imgUrl is provided', () => {
		const testImgUrl = 'path/to/test/image.jpg';
		render(<Message imgUrl={testImgUrl} />);
		const image = screen.getByRole('img');
		expect(image).toHaveAttribute('src', testImgUrl);
	});

	it('uses default alt text when altText is not provided', () => {
		render(<Message />);
		const defaultAltText = 'No results image';
		const image = screen.getByRole('img');
		expect(image).toHaveAttribute('alt', defaultAltText);
	});

	it('uses provided alt text when altText is provided', () => {
		const testAltText = 'Test alt text';
		render(<Message altText={testAltText} />);
		const image = screen.getByRole('img');
		expect(image).toHaveAttribute('alt', testAltText);
	});

	it('renders provided text', () => {
		const testText = 'This is a test message';
		render(<Message text={testText} />);
		const textElement = screen.getByText(testText);
		expect(textElement).toBeInTheDocument();
	});

	it('does not render text paragraph when text prop is not provided', () => {
		render(<Message />);
		const messageText = screen.queryByTestId('message-text');
		expect(messageText).not.toBeInTheDocument();
	});

	it('does not render text paragraph when text prop is empty string', () => {
		render(<Message text="" />);
		const messageText = screen.queryByTestId('message-text');
		expect(messageText).not.toBeInTheDocument();
	});

	it('should apply data attributes to the message component', () => {
		const dataTestId = 'message-component';
		const dataCustom = 'custom-value';
		render(
		  <Message
			dataAttributes={{
				'data-testid': `${dataTestId}`,
				'data-custom': `${dataCustom}`
			}}
		 	 />
		);
	
		const messageElement = screen.getByTestId(dataTestId);
		expect(messageElement).toHaveAttribute('data-custom', dataCustom);
	  });
});
