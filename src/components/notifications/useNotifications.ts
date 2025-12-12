import {ReactNode, useCallback, useContext} from 'react';
import {NotificationType} from '../../types/Notification';
import {NotificationContext} from './NotificationProvider';
import { Shape } from '../../types/Shape';

export const useNotifications = () => {
	const context = useContext(NotificationContext);

	const instant = useCallback((
		message: ReactNode,
		type: NotificationType = 'default',
		closable?: boolean,
		timeout?: number,
		shape?: Shape
	) => {
		return context.add({
			message,
			type,
			closable,
			timeout,
			shape
		});
	}, [context]);

	const createInstantShortcut = useCallback(
		(type: NotificationType) => (message: ReactNode, closable?: boolean, timeout?: number, shape?: Shape) => instant(message, type, closable, timeout, shape),
		[instant]);

	return {
		instant: instant,
		default: createInstantShortcut('default'),
		success: createInstantShortcut('success'),
		warning: createInstantShortcut('warning'),
		danger: createInstantShortcut('danger'),
	};
};
