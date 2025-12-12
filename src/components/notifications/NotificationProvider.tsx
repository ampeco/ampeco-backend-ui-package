import {
	createContext,
	ReactNode,
	useCallback,
	useMemo,
	useRef,
	useState,
} from "react";
import { NotificationConfig, NotificationRef } from "../../types/Notification";
import { Notification } from "./Notification";

interface NotificationProviderProps {
	children?: ReactNode;
	closable?: boolean;
	timeout?: number;
}

interface NotificationContext {
	add: (config: NotificationConfig) => NotificationRef;
}

export const NotificationContext = createContext<NotificationContext>({
	// eslint-disable-next-line no-console
	// @ts-ignore
	add: () => console.log("No notification context provided"),
});

export const NotificationProvider = ({
	children,
	closable = true,
	timeout = 3000,
}: NotificationProviderProps) => {
	const [notifications, setNotifications] = useState<NotificationRef[]>([]);
	const nextId = useRef(0);

	const removeNotification = useCallback((id: number) => {
		setNotifications((notifications) =>
			notifications.filter((notification) => notification.id !== id)
		);
	}, []);

	const add = useCallback(
		(config: NotificationConfig) => {
			const id = nextId.current++;

			const timeoutId = setTimeout(() => {
				removeNotification(id);
			}, config.timeout ?? timeout);

			const newNotification = {
				id,
				config,
				close: () => {
					clearTimeout(timeoutId);
					removeNotification(id);
				},
			};

			setNotifications((notifications) => [...notifications, newNotification]);

			return newNotification;
		},
		[removeNotification, timeout]
	);

	const context = useMemo(
		() => ({
			add,
		}),
		[add]
	);

	return (
		<NotificationContext.Provider value={context}>
			{notifications.length > 0 && (
				<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto w-fit max-w-40 flex flex-col gap-4">
					{notifications.map((notification) => (
						<Notification
							key={notification.id}
							type={notification.config.type}
							closable={notification.config.closable ?? closable}
							onClose={notification.close}
							shape={notification.config.shape}
						>
							{notification.config.message}
						</Notification>
					))}
				</div>
			)}
			{children}
		</NotificationContext.Provider>
	);
};
