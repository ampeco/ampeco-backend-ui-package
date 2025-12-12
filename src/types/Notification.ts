import {ReactNode} from 'react';
import { Shape } from './Shape';

export type NotificationType = 'default' | 'success' | 'warning' | 'danger';

export interface NotificationConfig {
	type: NotificationType;
	message: ReactNode;
	timeout?: number;
	closable?: boolean;
	shape?: Shape
}

export interface NotificationRef {
	id: number;
	config: NotificationConfig;
	close: () => void;
}
