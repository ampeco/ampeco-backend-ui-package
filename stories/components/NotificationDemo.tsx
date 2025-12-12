import React from "react";
import { Button, NotificationProvider } from "../../src";
import { useNotifications } from "../../src/components/notifications/useNotifications";
import { Shape } from "../../src/types/Shape";

export const NotificationDemo = () => {
	return (
		<NotificationProvider>
			<NotificationDemoContent />
		</NotificationProvider>
	);
};

export const NotificationDemoContent = () => {
	const notification = useNotifications();

	return (
		<div>
			<Button onClick={() => notification.default("Default notification")}>
				Open default notification
			</Button>
			<br />
			<br />
			<Button
				color="success"
				onClick={() => notification.success("Success notification")}
			>
				Open success notification
			</Button>
			<br />
			<br />
			<Button
				color="warning"
				onClick={() => notification.warning("Warning notification")}
			>
				Open warning notification
			</Button>
			<br />
			<br />
			<Button
				color="danger"
				onClick={() => notification.danger("Danger notification")}
			>
				Open danger notification
			</Button>
			<br />
			<br />
			<Button
				onClick={() =>
					notification.instant("Custom notification", "default", false, 5000)
				}
			>
				Open custom notification
			</Button>
			<br />
			<br />
			<Button
				onClick={() =>
					notification.instant(
						"Custom notification",
						"default",
						false,
						5000,
						Shape.ROUNDED
					)
				}
			>
				Open default rounded notification
			</Button>
			<br />
			<br />
			<Button
				onClick={() =>
					notification.instant(
						"Custom notification",
						"default",
						false,
						5000,
						Shape.SQUARE
					)
				}
			>
				Open default squared notification
			</Button>
			<br />
			<br />
			<Button
				onClick={() =>
					notification.instant(
						"Custom notification",
						"default",
						false,
						5000,
						Shape.DEFAULT
					)
				}
			>
				Open default default notification
			</Button>
		</div>
	);
};

export const notificationDemoSource = `
 const Root = () => {
  return <NotificationProvider
   closable={true} /* Default value for all notification */
   timeout={3000} /* Default value for all notification */
  >
   </App>
  </NotificationProvider>
 }

 const App = () => {
  const notification = useNotifications();

   return <div>
    <Button onClick={() => notification.default('Default notification')}>Open default notification</Button>
    <Button color="success" onClick={() => notification.success('Success notification')}>Open success notification</Button>
    <Button color="warning"  onClick={() => notification.warning('Warning notification')}>Open warning notification</Button>
    <Button color="danger"  onClick={() => notification.danger('Danger notification')}>Open danger notification</Button>
    <Button onClick={() => notification.instant('Custom notification', 'default', false, 5000)}>Open custom notification</Button>
   </div>
 }
`;
