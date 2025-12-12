import { renderHook } from '@testing-library/react';
import { describe, expect, vi, it, beforeEach } from 'vitest';
import { ReactNode } from 'react';
import { NotificationType } from '../../types/Notification';
import { NotificationContext } from './NotificationProvider';
import { useNotifications } from './useNotifications';
import {act} from 'react';

describe('useNotifications hook', () => {
	const mockAdd = vi.fn();

	const NotificationWrapper = ({ children }: { children: ReactNode }) => (
		<NotificationContext.Provider value={{ add: mockAdd }}>
			{children}
		</NotificationContext.Provider>
	);

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should add a notification instantly', () => {
		const { result } = renderHook(() => useNotifications(), { wrapper: NotificationWrapper });

		const message = 'Test notification';
		const type: NotificationType = 'success';
		const closable = true;
		const timeout = 5000;

		act(() => {
			result.current.instant(message, type, closable, timeout);
		});

		expect(mockAdd).toHaveBeenCalledWith({
			message,
			type,
			closable,
			timeout,
		});
	});

	it('should create instant shortcut for default type', () => {
		const { result } = renderHook(() => useNotifications(), { wrapper: NotificationWrapper });

		const message = 'Default notification';

		act(() => {
			result.current.default(message);
		});

		expect(mockAdd).toHaveBeenCalledWith({
			message,
			type: 'default'
		});
	});

	it('should create instant shortcut for success type', () => {
		const { result } = renderHook(() => useNotifications(), { wrapper: NotificationWrapper });

		const message = 'Success notification';

		act(() => {
			result.current.success(message);
		});

		expect(mockAdd).toHaveBeenCalledWith({
			message,
			type: 'success'
		});
	});

	it('should create instant shortcut for warning type', () => {
		const { result } = renderHook(() => useNotifications(), { wrapper: NotificationWrapper });

		const message = 'Warning notification';

		act(() => {
			result.current.warning(message);
		});

		expect(mockAdd).toHaveBeenCalledWith({
			message,
			type: 'warning'
		});
	});

	it('should create instant shortcut for danger type', () => {
		const { result } = renderHook(() => useNotifications(), { wrapper: NotificationWrapper });

		const message = 'Danger notification';

		act(() => {
			result.current.danger(message);
		});

		expect(mockAdd).toHaveBeenCalledWith({
			message,
			type: 'danger'
		});
	});
});
