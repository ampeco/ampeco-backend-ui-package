import BaseButton, { BaseButtonProps } from "../base-button/BaseButton";

export const Button = ({ ...props }: BaseButtonProps) => {
	return <BaseButton {...props} />;
};
