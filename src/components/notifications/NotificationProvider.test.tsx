import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, vi, it, beforeEach, afterEach } from 'vitest';
import { useContext, ReactNode } from 'react';
import { NotificationProvider, NotificationContext } from './NotificationProvider';
import { NotificationConfig } from '../../types/Notification';
import {act} from 'react';

describe('NotificationProvider component', () => {
	const mockMessage = 'This is a notification message';

	const renderWithContext = (ui: ReactNode) => {
		return render(<NotificationProvider>{ui}</NotificationProvider>);
	};

	beforeEach(() => {
		vi.clearAllMocks();
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('renders NotificationProvider component with children', () => {
		renderWithContext(<div>Child</div>);
		expect(screen.getByText('Child')).toBeInTheDocument();
	});

	it('adds and removes notifications correctly', () => {
		const TestComponent = () => {
			const { add } = useContext(NotificationContext);
			return (
				<button
					onClick={() =>
						add({ type: 'success', message: mockMessage } as NotificationConfig)
					}
				>
					Add Notification
				</button>
			);
		};

		renderWithContext(<TestComponent />);

		fireEvent.click(screen.getByText('Add Notification'));
		expect(screen.getByText(mockMessage)).toBeInTheDocument();

		// Fast-forward until all pending timers have been executed
		act(() => {
			vi.runAllTimers();
		});

		// Check that the notification has been removed
		expect(screen.queryByText(mockMessage)).not.toBeInTheDocument();
	});

	it('handles notification timeout correctly', () => {
		const TestComponent = () => {
			const { add } = useContext(NotificationContext);
			return (
				<button
					onClick={() =>
						add({ type: 'success', message: mockMessage, timeout: 1000 } as NotificationConfig)
					}
				>
					Add Notification
				</button>
			);
		};

		renderWithContext(<TestComponent />);

		fireEvent.click(screen.getByText('Add Notification'));
		expect(screen.getByText(mockMessage)).toBeInTheDocument();

		act(() => {
			vi.advanceTimersByTime(1000);
		});

		expect(screen.queryByText(mockMessage)).not.toBeInTheDocument();
	});

	it('allows manual close of notifications', () => {
		const TestComponent = () => {
			const { add } = useContext(NotificationContext);
			return (
				<button
					onClick={() =>
						add({
							type: 'success',
							message: mockMessage,
							closable: true
						} as NotificationConfig)
					}
				>
					Add Notification
				</button>
			);
		};

		renderWithContext(<TestComponent />);

		fireEvent.click(screen.getByText('Add Notification'));
		expect(screen.getByText(mockMessage)).toBeInTheDocument();

		fireEvent.click(screen.getByTestId('close-button'));

		expect(screen.queryByText(mockMessage)).not.toBeInTheDocument();
	});
});
