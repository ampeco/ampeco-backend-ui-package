import BaseButton, { BaseButtonProps } from '../base-button/BaseButton';

export const FabButton = (props: BaseButtonProps) => {
	return <BaseButton {...props} additionalClasses={['fab-button']} />;
};